---
name: "rebuild-reference-knowledge"
description: "Delete all reference document knowledge and rebuild from scratch"
category: "Knowledge Management"
---

# Task: Rebuild Reference Knowledge

## Purpose

**Completely delete and rebuild** the reference documents knowledge base in the sidecar. This is a destructive operation that:

1. Removes all existing knowledge artifacts
2. Clears checksums and processing history
3. Rescans all reference documents (excluding archives)
4. Rebuilds indexes, summaries, and extracts

**Use when:**
- Knowledge structure has changed (new extract types, index formats)
- Corruption or inconsistency detected
- Major refactoring of source documents
- After bulk document reorganization

## Inputs

**Optional:**
- `backup_existing`: Create timestamped backup before deletion (default: true)
- `confirm`: Require explicit confirmation (default: true)

## Prerequisites

**Required:**
- Sidecar directory: `{project-root}/bmad/_memory/reference-docs-sidecar/`
- Source documents: `{project-root}/bmad/reference-docs/`

## Process

### 1. Confirmation Prompt

```
⚠️  WARNING: Rebuild Reference Knowledge Base

This will DELETE all existing knowledge artifacts and rebuild from scratch.

Current sidecar contains:
  - 7 documents indexed
  - 156 headings cataloged
  - 3 agent extract types
  - 4 category summaries

Source documents:
  - 7 markdown files in reference-docs/
  - Excludes: 99-* (archive folders)

Estimated rebuild time: ~15 seconds

Type 'REBUILD' to confirm, or Ctrl+C to cancel:
```

**If backup_existing=true:**
```
Creating backup at: _memory/reference-docs-sidecar-backup-20260211-150000/
Backup complete (2.3 MB)
```

### 2. Delete Existing Knowledge

**Remove all sidecar content:**

```bash
# Delete indexes
rm -rf bmad/_memory/reference-docs-sidecar/indexes/*

# Delete summaries
rm -rf bmad/_memory/reference-docs-sidecar/summaries/*

# Delete extracts
rm -rf bmad/_memory/reference-docs-sidecar/extracts/*

# Delete metadata (preserve config.yaml and README.md)
rm -f bmad/_memory/reference-docs-sidecar/metadata/processing-log.jsonl
rm -f bmad/_memory/reference-docs-sidecar/metadata/source-checksums.json
```

**Log deletion:**
```json
{
  "action": "delete",
  "timestamp": "2026-02-11T15:00:00Z",
  "itemsDeleted": {
    "indexes": 3,
    "summaries": 4,
    "extracts": 9,
    "metadata": 2
  },
  "backupCreated": "_memory/reference-docs-sidecar-backup-20260211-150000/"
}
```

### 3. Recreate Sidecar Structure

```bash
# Recreate empty directories
mkdir -p bmad/_memory/reference-docs-sidecar/indexes
mkdir -p bmad/_memory/reference-docs-sidecar/summaries/{01-context-and-requirements,02-architecture-and-design,03-security-and-integrations,04-operations-and-risks}
mkdir -p bmad/_memory/reference-docs-sidecar/extracts/{technical-scribe,architect,security-sentinel}
mkdir -p bmad/_memory/reference-docs-sidecar/metadata

# Create empty metadata files
echo '[]' > bmad/_memory/reference-docs-sidecar/metadata/source-checksums.json
touch bmad/_memory/reference-docs-sidecar/metadata/processing-log.jsonl
```

### 4. Invoke Full Ingestion

**Call** `ingest-reference-documents` with `mode=full`:

```bash
# Internally calls:
# ingest-reference-documents --mode=full --force-reprocess=true
```

**This will:**
- Scan all reference document folders
- Extract metadata from every document
- Build complete indexes
- Generate all summaries
- Create agent extracts
- Update metadata

### 5. Verification

**Check rebuild success:**

```bash
# Verify indexes exist
ls -lh bmad/_memory/reference-docs-sidecar/indexes/
# Expected: doc-index.json, doc-index.md, heading-index.md

# Count documents
jq 'length' bmad/_memory/reference-docs-sidecar/indexes/doc-index.json
# Expected: Number of markdown files in reference-docs (excluding 99-*)

# Check summaries
ls -R bmad/_memory/reference-docs-sidecar/summaries/
# Expected: summary.md in each category folder

# Check extracts
ls -R bmad/_memory/reference-docs-sidecar/extracts/
# Expected: Knowledge files for each agent role

# Review processing log
tail -1 bmad/_memory/reference-docs-sidecar/metadata/processing-log.jsonl | jq
# Expected: Recent "full" mode entry with no errors
```

### 6. Update Sidecar Timestamp

Update `README.md` with rebuild timestamp:

```markdown
Last updated: 2026-02-11 15:00:00 UTC (full rebuild)
```

## Outputs

**Rebuilt Artifacts:**
- All indexes regenerated
- All summaries regenerated
- All agent extracts regenerated
- Fresh metadata (checksums, processing log)

**Backup** (if enabled):
- Timestamped backup directory: `_memory/reference-docs-sidecar-backup-{timestamp}/`

## Error Handling

**Rollback on Failure:**

If rebuild fails midway:

1. Restore from backup (if created):
   ```bash
   rm -rf bmad/_memory/reference-docs-sidecar
   mv bmad/_memory/reference-docs-sidecar-backup-{timestamp} bmad/_memory/reference-docs-sidecar
   ```

2. Log error:
   ```json
   {
     "action": "rebuild-failed",
     "timestamp": "2026-02-11T15:05:23Z",
     "error": "Failed during ingestion: ...",
     "rollback": "restored from backup-20260211-150000"
   }
   ```

**Common Issues:**

1. **Insufficient disk space:**
   - Check available space before rebuild
   - Backup may fail if not enough space

2. **Locked files:**
   - Close any applications reading sidecar files
   - Check for stale file handles

3. **Permission errors:**
   - Verify write access to `_memory/` directory

4. **Source documents corrupted:**
   - Validate markdown syntax
   - Check for binary files in source

## Safety Features

**Built-in protections:**

1. **Confirmation required** - Prevents accidental deletion
2. **Automatic backup** - Preserves existing knowledge before deletion
3. **Rollback support** - Quick restore from backup on failure
4. **Progress logging** - Track rebuild stages for debugging

## Integration

**Invoked by:**
- Manual execution (emergency maintenance)
- Scheduled maintenance (optional)
- After major document reorganization
- When knowledge structure changes

**Not recommended during:**
- Active agent workflows
- Solution document generation in progress
- CI/CD pipeline runs

## Performance

**Expected Duration:**
- Small corpus (<20 docs): 10-20 seconds
- Medium corpus (20-100 docs): 30-90 seconds
- Large corpus (100+ docs): 2-5 minutes

**Includes:**
- Backup creation time
- Deletion overhead
- Full ingestion duration

## Example Usage

**Command Line:**
```bash
cd bmad/_memory/reference-docs-sidecar
../../_bmad/core/tasks/rebuild-reference-knowledge.sh
```

**Programmatic:**
```python
# In agent code
from bmad.tasks import rebuild_reference_knowledge

result = rebuild_reference_knowledge(
    backup_existing=True,
    confirm=False  # Skip prompt if automated
)
```

**Output:**
```
✅ Rebuild Complete

Duration: 15.2 seconds
Documents processed: 7
Indexes created: 3
Summaries generated: 4
Extracts created: 9
Backup location: _memory/reference-docs-sidecar-backup-20260211-150000/
```
