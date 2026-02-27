---
name: "update-reference-knowledge"
description: "Incrementally update reference document knowledge when new documents are added or modified"
category: "Knowledge Management"
---

# Task: Update Reference Knowledge

## Purpose

**Incrementally update** the reference documents knowledge base when documents are added, modified, or deleted. This is efficient for ongoing maintenance.

**Key Features:**
- Only processes changed/new documents
- Preserves existing knowledge for unchanged documents
- Fast execution (2-10 seconds typical)
- Safe for active workflows

**Use when:**
- New reference documents added
- Existing documents modified
- Documents removed from source
- Regular maintenance (scheduled or manual)

## Inputs

**Optional:**
- `force_scan`: Force full directory scan even if checksums match (default: false)
- `category_filter`: Only update specific category (e.g., `01-context-and-requirements`)
- `dry_run`: Show what would be updated without making changes (default: false)

## Prerequisites

**Required:**
- Sidecar exists: `{project-root}/bmad/_memory/reference-docs-sidecar/`
- Metadata exists: `metadata/source-checksums.json`
- Source documents: `{project-root}/bmad/reference-docs/`

## Process

### 1. Load Existing Checksums

Read `metadata/source-checksums.json`:

```json
{
  "reference-docs/01-context-and-requirements/Project HLD v1.9.md": {
    "checksum": "abc123def456...",
    "lastProcessed": "2026-02-10T14:30:00Z",
    "size": 145230,
    "lines": 1401
  },
  "reference-docs/02-architecture-and-design/HA Strategy.md": {
    "checksum": "789ghi012jkl...",
    "lastProcessed": "2026-02-10T14:30:00Z",
    "size": 89012,
    "lines": 856
  }
}
```

### 2. Scan Reference Documents

**Directory scan:**
```bash
# Find all markdown files, excluding archives
find bmad/reference-docs -name "*.md" -not -path "*/99-*" -type f
```

**For each document:**
1. Calculate current checksum
2. Compare with stored checksum
3. Categorize as: `new`, `modified`, `unchanged`, or `deleted`

**Detection Results:**
```
Scanning reference documents...

Status Summary:
  New documents: 2
  Modified documents: 1
  Unchanged documents: 4
  Deleted documents: 0

Documents to process: 3
```

### 3. Process Changed Documents

**For each new/modified document:**

#### 3a. Extract Metadata
```json
{
  "fileName": "Integration Requirements v3.md",
  "relativePath": "reference-docs/01-context-and-requirements/Integration Requirements v3.md",
  "slug": "integration-requirements-v3",
  "category": "01-context-and-requirements",
  "docType": "REQUIREMENTS",
  "status": "new",
  "checksum": "xyz789abc012...",
  "ingestedAt": "2026-02-11T15:30:00Z"
}
```

#### 3b. Update Document Index

**Merge** into `indexes/doc-index.json`:
- Add new documents
- Update metadata for modified documents
- Maintain sorting/grouping

#### 3c. Update Heading Index

**Extract headings** from changed documents:
```markdown
## Document: Integration Requirements v3 (NEW)
- # Overview
- # System Integrations
  - ## 2.1 Identity Provider Integration
  - ## 2.2 Network Monitoring Integration
- # Security Requirements
...
```

**Merge** into `indexes/heading-index.md`:
- Insert new document sections
- Update modified document sections
- Preserve unchanged document sections

#### 3d. Regenerate Category Summaries

**For affected categories only:**

If document in `01-context-and-requirements/` changed:
- Regenerate `summaries/01-context-and-requirements/summary.md`
- Leave other category summaries unchanged

**Updated summary:**
```markdown
# Context and Requirements - Summary

Generated: 2026-02-11T15:30:00Z
Documents: 8 (was 7)

## Overview
This section contains high-level designs, requirements, and integration needs...

## Recent Changes
- **NEW:** Integration Requirements v3 - Added IdP integration details
- **UPDATED:** Project HLD v1.9 - Security section expanded
```

#### 3e. Update Agent Extracts

**For each agent extract type:**

1. **Technical Scribe** - Add/update technical facts:
   ```markdown
   ## Integration Requirements v3
   - **IdP Protocol:** SAML 2.0 + OAuth 2.0
   - **Endpoints:** /auth/login, /auth/callback, /auth/logout
   - **Token Lifetime:** Access: 1h, Refresh: 24h
   ```

2. **Architect** - Add/update architectural patterns:
   ```markdown
   ## New Pattern: Federated Identity
   - **Source:** Integration Requirements v3
   - **Pattern:** Identity Federation via SAML + OAuth
   - **Rationale:** Leverage existing corporate IdP
   ```

3. **Security Sentinel** - Add/update security requirements:
   ```markdown
   ## IdP Integration Security (NEW)
   - **Authentication:** Multi-factor required
   - **Encryption:** TLS 1.3 for IdP communication
   - **Token Storage:** Encrypted at rest
   ```

### 4. Handle Deleted Documents

**If documents removed from source:**

1. **Remove from document index:**
   ```json
   // Delete entries matching deleted file paths
   ```

2. **Remove from heading index:**
   ```markdown
   // Delete sections for removed documents
   ```

3. **Flag in summaries:**
   ```markdown
   ## Recently Removed
   - ~~Old Integration Spec v1~~ - Superseded by v3
   ```

4. **Archive extracts** (don't delete immediately):
   ```bash
   mv extracts/technical-scribe/old-integration-spec-v1.md \
      extracts/technical-scribe/.archived/old-integration-spec-v1-removed-20260211.md
   ```

### 5. Update Checksums

**Write updated checksums** to `metadata/source-checksums.json`:

```json
{
  // Existing unchanged entries...
  
  // Updated/new entries
  "reference-docs/01-context-and-requirements/Integration Requirements v3.md": {
    "checksum": "xyz789abc012...",
    "lastProcessed": "2026-02-11T15:30:00Z",
    "size": 45678,
    "lines": 342,
    "status": "new"
  },
  "reference-docs/01-context-and-requirements/Project HLD v1.9.md": {
    "checksum": "newchecksum456...",
    "lastProcessed": "2026-02-11T15:30:00Z",
    "size": 152341,
    "lines": 1456,
    "status": "modified",
    "previousChecksum": "abc123def456..."
  }
  
  // Note: Deleted document entries are removed
}
```

### 6. Log Update

**Append to** `metadata/processing-log.jsonl`:

```jsonl
{"timestamp":"2026-02-11T15:30:00Z","mode":"incremental","documentsNew":2,"documentsModified":1,"documentsUnchanged":4,"documentsDeleted":0,"duration":"3.2s","errors":[]}
```

### 7. Dry Run Mode

**If dry_run=true:**

Do NOT modify any files. Instead, report:

```
DRY RUN - No changes will be made

Would process 3 documents:

NEW:
  - reference-docs/01-context-and-requirements/Integration Requirements v3.md
  - reference-docs/02-architecture-and-design/Disaster Recovery Plan.md

MODIFIED:
  - reference-docs/01-context-and-requirements/Project HLD v1.9.md
    Changed: 156 lines added, 23 lines removed

REGENERATE:
  - indexes/doc-index.json (add 2 entries, update 1 entry)
  - indexes/heading-index.md (add 2 sections, update 1 section)
  - summaries/01-context-and-requirements/summary.md
  - summaries/02-architecture-and-design/summary.md
  - extracts/technical-scribe/technical-facts.md
  - extracts/architect/patterns-and-decisions.md
  - extracts/security-sentinel/requirements.md

Estimated processing time: 3-5 seconds
```

## Outputs

**Updated Files:**
- `indexes/doc-index.json` - Updated with new/changed documents
- `indexes/doc-index.md` - Updated with new/changed documents
- `indexes/heading-index.md` - Merged heading structures
- `summaries/{affected-categories}/summary.md` - Regenerated for changed categories
- `extracts/{role}/*.md` - Updated with new knowledge
- `metadata/source-checksums.json` - Current checksums
- `metadata/processing-log.jsonl` - Append-only update log

**Preserved Files:**
- All artifacts for unchanged documents remain untouched

## Validation

**After update:**

```bash
# Check for errors in log
tail -1 bmad/_memory/reference-docs-sidecar/metadata/processing-log.jsonl | jq '.errors'
# Expected: []

# Verify document count increased
jq 'length' bmad/_memory/reference-docs-sidecar/indexes/doc-index.json
# Expected: Previous count + new documents

# Check updated category summary
cat bmad/_memory/reference-docs-sidecar/summaries/01-context-and-requirements/summary.md | head -20
# Expected: Updated "Generated" timestamp and document count
```

## Error Handling

**Partial update failure:**

If processing fails for a specific document:

1. Log error but continue with other documents:
   ```jsonl
   {"timestamp":"...","mode":"incremental","documentsProcessed":2,"documentsFailed":1,"errors":[{"file":"Integration Requirements v3.md","error":"Malformed markdown heading on line 45"}]}
   ```

2. Do not update checksum for failed document
3. Will retry on next update

**Critical failure:**

If sidecar structure corrupted:
- Stop processing
- Log error
- Recommend running `rebuild-reference-knowledge`

## Performance

**Expected Duration:**
- 1-3 changed documents: 2-5 seconds
- 4-10 changed documents: 5-15 seconds
- 10+ changed documents: 15-30 seconds

**Optimization:**
- Skip unchanged documents (checksum match)
- Only regenerate affected category summaries
- Parallel processing of independent documents

## Integration

**Automatically invoked by:**
- **Pre-workflow hook:** `sda-main` Step 2 (check if sidecar stale)
- **Pre-workflow hook:** `solution-investigation` Step 2
- **File watcher:** (optional) Trigger on reference-docs/ changes
- **Scheduled job:** (optional) Nightly/hourly updates

**Manual invocation:**
```bash
cd bmad/_memory/reference-docs-sidecar
../../_bmad/core/tasks/update-reference-knowledge.sh
```

## Example Usage

**Standard update:**
```bash
# From bmad directory
./tasks/update-reference-knowledge.sh
```

**Dry run (preview):**
```bash
./tasks/update-reference-knowledge.sh --dry-run
```

**Force full scan:**
```bash
./tasks/update-reference-knowledge.sh --force-scan
```

**Update single category:**
```bash
./tasks/update-reference-knowledge.sh --category=01-context-and-requirements
```

**Output:**
```
✅ Update Complete

Duration: 3.2 seconds
Documents scanned: 7
Documents new: 2
Documents modified: 1
Documents unchanged: 4
Summaries regenerated: 2
Extracts updated: 3
```

## Comparison with Rebuild

| Aspect | Update (Incremental) | Rebuild (Full) |
|--------|---------------------|----------------|
| **Speed** | 2-10 seconds | 15-60 seconds |
| **Safety** | Safe during workflows | Disruptive |
| **Use Case** | Ongoing maintenance | Major refactoring |
| **Preserves History** | Yes | No (fresh start) |
| **When to Use** | Daily/regular updates | Corruption recovery |
