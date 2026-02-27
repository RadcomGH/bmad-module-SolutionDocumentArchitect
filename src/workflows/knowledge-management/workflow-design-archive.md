---
name: "knowledge-management"
description: "Manage reference document knowledge in the sidecar (ingest, update, rebuild)"
version: "1.0.0"
---

# Workflow: Knowledge Management

## Purpose

Orchestrate reference document knowledge processing in the `_memory/reference-docs-sidecar`.

**Operations supported:**
1. **Initial Ingest** - First-time knowledge base creation
2. **Incremental Update** - Process new/changed documents
3. **Full Rebuild** - Delete and recreate entire knowledge base
4. **Validation** - Verify knowledge integrity

## When to Use

| Scenario | Operation | Command |
|----------|-----------|---------|
| First time setup | Initial Ingest | `--mode=init` |
| Daily maintenance | Incremental Update | `--mode=update` (default) |
| After bulk changes | Full Rebuild | `--mode=rebuild` |
| Check integrity | Validation | `--mode=validate` |

## Workflow Steps

### Mode: Initial Ingest (`--mode=init`)

**Step 1: Setup Sidecar Structure**
- Create `_memory/reference-docs-sidecar/` directory structure
- Copy `config.yaml` template
- Initialize `README.md`

**Step 2: First Scan**
- Scan all reference documents
- Generate initial indexes
- Create all summaries
- Build agent extracts
- Initialize metadata

**Step 3: Validation**
- Verify all expected files created
- Check document count matches source
- Validate JSON structure

---

### Mode: Incremental Update (`--mode=update`)

**Step 1: Check Prerequisites**
- Verify sidecar exists
- Load existing checksums
- Detect if rebuild needed (missing critical files)

**Step 2: Detect Changes**
- Scan source documents
- Compare checksums
- Identify new/modified/deleted documents

**Step 3: Process Changes**
- Extract metadata from changed documents
- Update indexes (merge)
- Regenerate affected summaries
- Update agent extracts

**Step 4: Finalize**
- Update checksums
- Log processing results
- Update README timestamp

---

### Mode: Full Rebuild (`--mode=rebuild`)

**Step 1: Confirmation**
- Display current sidecar stats
- Show what will be deleted
- Require explicit confirmation

**Step 2: Backup**
- Create timestamped backup
- Verify backup integrity

**Step 3: Clean**
- Delete all indexes, summaries, extracts
- Preserve config and README
- Reset metadata files

**Step 4: Rebuild**
- Invoke initial ingest process
- Process all documents from scratch
- Generate all artifacts

**Step 5: Verification**
- Compare document count
- Validate structures
- Log rebuild completion

---

### Mode: Validation (`--mode=validate`)

**Step 1: Structure Check**
- Verify directory structure intact
- Check all required directories exist

**Step 2: Content Check**
- Verify indexes well-formed
- Check summary files present
- Validate extract files

**Step 3: Consistency Check**
- Compare source document count to indexed count
- Verify checksums match current files
- Check for orphaned knowledge (source deleted)

**Step 4: Report**
- List any issues found
- Suggest corrective actions
- Exit with status code

---

## Step-by-Step Execution

### STEP 0: Welcome

**Agent:** System

```
Knowledge Management Workflow

Managing reference document knowledge in sidecar pattern.

Mode: {mode}
Source: bmad/reference-docs/
Sidecar: bmad/_memory/reference-docs-sidecar/

Press Enter to continue...
```

---

### STEP 1: Prerequisites Check

**Agent:** System

**Check:**
1. Source directory exists: `bmad/reference-docs/`
2. Source has markdown files (excluding archives)
3. Write access to `_memory/` directory

**For mode=update or validate:**
4. Sidecar exists: `_memory/reference-docs-sidecar/`
5. Critical files present: `config.yaml`, `indexes/doc-index.json`

**Output:**
```
✓ Source directory found (7 documents)
✓ Sidecar directory accessible
✓ Required files present
```

**If prerequisites fail:**
- For `mode=init`: Create sidecar structure
- For `mode=update`: Suggest running `mode=init`
- For `mode=rebuild`: Abort if source missing
- For `mode=validate`: Report missing components

---

### STEP 2: Process Documents

**Agent:** Depends on mode

#### For mode=init or mode=rebuild:

**Task:** `ingest-reference-documents` with `mode=full`

**Actions:**
1. Scan all documents in `reference-docs/`
2. Exclude `99-*` archive folders
3. Extract metadata from each document
4. Build master indexes
5. Generate heading hierarchies
6. Create category summaries
7. Build agent-specific extracts
8. Initialize checksums

**Progress:**
```
Scanning reference documents...
  ✓ 01-context-and-requirements (4 docs)
  ✓ 02-architecture-and-design (2 docs)
  ✓ 03-security-and-integrations (1 doc)

Processing documents...
  [████████████████████] 7/7 complete

Generating artifacts...
  ✓ Document indexes
  ✓ Heading indexes
  ✓ Category summaries
  ✓ Agent extracts
  ✓ Metadata files
```

#### For mode=update:

**Task:** `update-reference-knowledge`

**Actions:**
1. Load existing checksums
2. Scan source documents
3. Detect changes (new/modified/deleted)
4. Process changed documents only
5. Merge updates into indexes
6. Regenerate affected summaries
7. Update agent extracts
8. Update checksums

**Progress:**
```
Checking for changes...
  New documents: 2
  Modified documents: 1
  Unchanged documents: 4

Processing updates...
  [████████████████████] 3/3 complete

Updating artifacts...
  ✓ Document indexes (merged)
  ✓ Summaries (2 categories updated)
  ✓ Agent extracts (updated)
```

#### For mode=validate:

**Task:** Validation checks (no processing)

**Actions:**
1. Verify directory structure
2. Check file presence and integrity
3. Compare source vs indexed document counts
4. Validate JSON syntax
5. Check for inconsistencies

**Progress:**
```
Validating knowledge base...
  ✓ Directory structure intact
  ✓ All required files present
  ✓ JSON files well-formed
  ✓ Source document count matches index (7)
  ✓ No orphaned knowledge detected
  ✓ Checksums consistent

Status: ✅ VALID
```

---

### STEP 3: Verification

**Agent:** System

**Check processing results:**

1. **Document count:**
   ```bash
   jq 'length' bmad/_memory/reference-docs-sidecar/indexes/doc-index.json
   ```

2. **Processing log:**
   ```bash
   tail -1 bmad/_memory/reference-docs-sidecar/metadata/processing-log.jsonl
   ```

3. **Errors:**
   ```bash
   # Check for any processing errors
   jq '.errors' from processing log
   ```

**Output:**
```
✅ Verification Complete

Documents indexed: 7
Categories: 4
Agent extracts: 3
Processing errors: 0
Duration: 5.2 seconds
```

**If verification fails:**
- Report specific issues
- Suggest corrective action
- Exit with error status

---

### STEP 4: Completion

**Agent:** System

**Final Report:**

```
🎉 Knowledge Management Complete

Operation: {mode}
Status: Success
Duration: 5.2 seconds

Summary:
  - Documents processed: 7
  - Knowledge artifacts: 15
  - Sidecar location: bmad/_memory/reference-docs-sidecar/

Next Steps:
  - Run workflows that depend on this knowledge
  - Schedule regular updates (cron/watch)
  - Review generated summaries and extracts

Documentation: See _memory/reference-docs-sidecar/README.md
```

---

## Workflow Inputs

**Command Line:**
```bash
# Initial setup
bmad workflow run knowledge-management --mode=init

# Regular updates
bmad workflow run knowledge-management --mode=update

# Full rebuild
bmad workflow run knowledge-management --mode=rebuild --backup=true --confirm=false

# Validation only
bmad workflow run knowledge-management --mode=validate
```

**Parameters:**
- `mode`: Operation mode (init, update, rebuild, validate)
- `backup`: Create backup before rebuild (default: true)
- `confirm`: Require confirmation for destructive operations (default: true)
- `dry_run`: Preview changes without applying (default: false)
- `category_filter`: Limit to specific category (optional)

---

## Integration Points

**Invoked by:**
- **User:** Manual execution via CLI
- **Pre-hook:** Before `sda-main` workflow (check if stale)
- **Pre-hook:** Before `solution-investigation` workflow
- **Scheduler:** Cron job for periodic updates
- **File Watcher:** On reference-docs/ changes (optional)

**Invokes:**
- **Task:** `ingest-reference-documents`
- **Task:** `update-reference-knowledge`
- **Task:** `rebuild-reference-knowledge` (conceptually - calls ingest with cleanup)

---

## Error Handling

**Graceful degradation:**

1. **Source directory missing:**
   - Error: Cannot proceed
   - Action: Abort workflow
   - Message: "reference-docs/ directory not found"

2. **Sidecar corrupted:**
   - Error: Critical files missing/malformed
   - Action: Suggest `mode=rebuild`
   - Message: "Sidecar integrity check failed"

3. **Partial processing failure:**
   - Error: Some documents failed to process
   - Action: Continue with successful documents
   - Message: "3/7 documents processed, 4 errors (see log)"

4. **Permission errors:**
   - Error: Cannot write to _memory/
   - Action: Abort workflow
   - Message: "Insufficient permissions"

---

## Performance

**Expected Duration by Mode:**

| Mode | Small (<20 docs) | Medium (20-100) | Large (100+) |
|------|------------------|-----------------|--------------|
| **init** | 10-20s | 30-90s | 2-5min |
| **update** | 2-5s | 5-15s | 15-30s |
| **rebuild** | 15-30s | 45-120s | 3-7min |
| **validate** | 1-3s | 3-10s | 10-30s |

---

## Output Artifacts

**Generated by this workflow:**
- `_memory/reference-docs-sidecar/indexes/doc-index.json`
- `_memory/reference-docs-sidecar/indexes/doc-index.md`
- `_memory/reference-docs-sidecar/indexes/heading-index.md`
- `_memory/reference-docs-sidecar/summaries/{category}/summary.md`
- `_memory/reference-docs-sidecar/extracts/{agent-role}/*.md`
- `_memory/reference-docs-sidecar/metadata/processing-log.jsonl`
- `_memory/reference-docs-sidecar/metadata/source-checksums.json`

---

## Best Practices

**Regular Maintenance:**
1. Run `mode=update` daily or after document changes
2. Run `mode=validate` weekly to check integrity
3. Run `mode=rebuild` after major reorganizations

**Performance Optimization:**
4. Use incremental updates for routine maintenance
5. Schedule full rebuilds during off-hours
6. Enable file watching for real-time updates

**Safety:**
7. Always backup before rebuild
8. Test validation before important workflows
9. Keep processing logs for troubleshooting
