# Reference Document Knowledge Management - Quick Reference

## Sidecar Pattern Overview

The reference document knowledge base uses the **sidecar pattern** to decouple knowledge extraction from workflows:

```
bmad/
├── reference-docs/              ← Source documents
│   ├── 01-context-and-requirements/
│   ├── 02-architecture-and-design/
│   ├── 03-security-and-integrations/
│   └── 99-archive/             ← EXCLUDED from ingestion
│
└── _memory/
    └── reference-docs-sidecar/  ← Extracted knowledge
        ├── indexes/             ← Document and heading indexes
        ├── summaries/           ← Category-level summaries
        ├── extracts/            ← Agent-specific knowledge
        └── metadata/            ← Checksums and processing logs
```

---

## Common Operations

### 1. Initial Setup (First Time)

> **Note:** The command `bmad workflow run knowledge-management` does not exist. Please use the documented scripts or tasks (such as `./tasks/process-reference-docs.sh`) for reference document knowledge management operations.

**What it does:**
- Creates sidecar directory structure
- Scans all reference documents (excludes `99-*`)
- Generates indexes, summaries, and extracts
- Duration: ~30 seconds for typical corpus

---

### 2. Daily Updates (After Adding/Modifying Docs)

```bash
cd bmad
bmad workflow run knowledge-management --mode=update
```

**What it does:**
- Detects new/modified/deleted documents
- Updates only changed content
- Preserves existing knowledge
- Duration: ~5 seconds for 1-3 changes

---

### 3. Full Rebuild (After Major Reorganization)

```bash
cd bmad
bmad workflow run knowledge-management --mode=rebuild
```

**What it does:**
- Creates backup of existing knowledge
- Deletes all knowledge artifacts
- Rebuilds from scratch
- Duration: ~60 seconds for typical corpus

**⚠️ Use sparingly** - incremental updates are faster and safer

---

### 4. Validation (Check Integrity)

```bash
cd bmad
bmad workflow run knowledge-management --mode=validate
```

**What it does:**
- Verifies directory structure
- Checks file integrity
- Compares source vs indexed counts
- Reports inconsistencies
- Duration: ~3 seconds

---

## Converting Office Documents

**Before ingesting, convert Office docs to markdown:**

```bash
cd bmad
./tasks/process-reference-docs.sh
```

**Then update knowledge:**

```bash
bmad workflow run knowledge-management --mode=update
```

---

## Accessing Knowledge in Workflows

**From workflow steps:**

1. **Check if sidecar exists:**
   ```bash
   if [ -d "_memory/reference-docs-sidecar" ]; then
     # Use pre-indexed knowledge
   fi
   ```

2. **Read document index:**
   ```bash
   # JSON (machine-readable)
   cat _memory/reference-docs-sidecar/indexes/doc-index.json
   
   # Markdown (human-readable)
   cat _memory/reference-docs-sidecar/indexes/doc-index.md
   ```

3. **Access agent extracts:**
   ```bash
   # Technical facts
   cat _memory/reference-docs-sidecar/extracts/technical-scribe/technical-facts.md
   
   # Architectural patterns
   cat _memory/reference-docs-sidecar/extracts/architect/patterns-and-decisions.md
   ```

4. **Read category summaries:**
   ```bash
   cat _memory/reference-docs-sidecar/summaries/01-context-and-requirements/summary.md
   ```

---

## Archive Folder Exclusion

**Folders matching `99-*` are automatically excluded:**

```
reference-docs/
├── 01-context-and-requirements/  ✅ Ingested
├── 02-architecture-and-design/   ✅ Ingested
└── 99-archive/                   ❌ EXCLUDED
    └── 99-old-versions/          ❌ EXCLUDED
```

**Why exclude archives?**
- Reduces noise in knowledge base
- Improves search relevance
- Faster processing
- Prevents outdated information

---

## Workflow Integration

**SDA Main Workflow** (`sda-main`):
- **Step 2:** Checks sidecar, offers to update if stale
- Uses pre-indexed knowledge for technical findings
- Duration: Instant if knowledge current, ~5s if needs update

**Solution Investigation Workflow** (`solution-investigation`):
- **Step 2:** Loads reference knowledge for context gathering
- Accesses summaries and extracts

---

## Troubleshooting

### Problem: Sidecar missing or empty

**Solution:**
```bash
bmad workflow run knowledge-management --mode=init
```

---

### Problem: Knowledge out of date

**Solution:**
```bash
bmad workflow run knowledge-management --mode=update
```

---

### Problem: Corrupted indexes

**Solution:**
```bash
bmad workflow run knowledge-management --mode=rebuild --backup=true
```

---

### Problem: Archives being ingested

**Check exclusion pattern:**
```bash
cat _memory/reference-docs-sidecar/config.yaml | grep exclude_patterns
```

**Should see:**
```yaml
exclude_patterns:
  - "99-*"
```

---

## File Locations Reference

| Purpose | Location | Type |
|---------|----------|------|
| Source documents | `bmad/reference-docs/` | Markdown files |
| Document index (JSON) | `_memory/reference-docs-sidecar/indexes/doc-index.json` | JSON |
| Document index (MD) | `_memory/reference-docs-sidecar/indexes/doc-index.md` | Markdown |
| Heading index | `_memory/reference-docs-sidecar/indexes/heading-index.md` | Markdown |
| Category summary | `_memory/reference-docs-sidecar/summaries/{category}/summary.md` | Markdown |
| Technical facts | `_memory/reference-docs-sidecar/extracts/technical-scribe/technical-facts.md` | Markdown |
| Architectural patterns | `_memory/reference-docs-sidecar/extracts/architect/patterns-and-decisions.md` | Markdown |
| Security requirements | `_memory/reference-docs-sidecar/extracts/security-sentinel/requirements.md` | Markdown |
| Checksums | `_memory/reference-docs-sidecar/metadata/source-checksums.json` | JSON |
| Processing log | `_memory/reference-docs-sidecar/metadata/processing-log.jsonl` | JSONL |

---

## Best Practices

1. **Run incremental updates frequently** (daily or after doc changes)
2. **Validate weekly** to catch corruption early
3. **Rebuild only when necessary** (structure changes, corruption)
4. **Keep archives in 99-folders** to exclude automatically
5. **Convert Office docs first**, then ingest knowledge
6. **Check sidecar before workflows** to ensure current knowledge

---

## Performance Benchmarks

| Operation | Small (<20) | Medium (20-100) | Large (100+) |
|-----------|-------------|-----------------|--------------|
| **Init** | 10-20s | 30-90s | 2-5min |
| **Update** | 2-5s | 5-15s | 15-30s |
| **Rebuild** | 15-30s | 45-120s | 3-7min |
| **Validate** | 1-3s | 3-10s | 10-30s |

---

For detailed documentation, see:
- Sidecar README: `_memory/reference-docs-sidecar/README.md`
- Workflow: `src/workflows/knowledge-management/workflow.md`
- Tasks: `src/tasks/ingest-reference-documents.md`, `update-reference-knowledge.md`, `rebuild-reference-knowledge.md`
