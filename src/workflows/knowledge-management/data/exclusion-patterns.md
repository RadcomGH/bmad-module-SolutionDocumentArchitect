# Archive Folder Exclusion Patterns

**Rules for excluding archive and temporary folders from knowledge ingestion**

---

## Primary Exclusion Pattern

### Pattern: `99-*`

**Matches:**
- Any folder starting with `99-`
- At any level in the directory hierarchy

**Examples:**
```
✗ 99-archive/
✗ 99-old-versions/
✗ 99-deprecated/
✗ 99-backup/
✗ 99-temp/
```

---

## Why Exclude Archives?

### 1. Reduces Noise
Archived documents are typically:
- Outdated versions
- Deprecated content
- Superseded by newer documents

Including archives would:
- ✗ Pollute indexes with outdated info
- ✗ Create confusion about current vs old
- ✗ Reduce search relevance

### 2. Improves Performance
Excluding archives:
- ✓ Reduces document count
- ✓ Faster processing
- ✓ Smaller indexes
- ✓ Quicker searches

### 3. Prevents Outdated Information
Archives may contain:
- Old requirements (no longer valid)
- Deprecated architecture
- Superseded decisions
- Obsolete specifications

---

## Folder Naming Convention

### Recommended Pattern

```
reference-docs/
├── 01-context-and-requirements/    ✓ Included
├── 02-architecture-and-design/     ✓ Included
├── 03-security-and-integrations/   ✓ Included
├── 04-operations-and-risks/        ✓ Included
├── 99-archive/                     ✗ EXCLUDED
└── 99-deprecated/                  ✗ EXCLUDED
```

### Prefix Numbering System

**Current/Active Content:** `01-` through `98-`
- `01-` = Context and requirements
- `02-` = Architecture and design
- `03-` = Security and integrations
- `04-` = Operations and risks
- etc.

**Archived Content:** `99-`
- `99-archive` = General archive
- `99-old-versions` = Previous document versions
- `99-deprecated` = Deprecated content
- `99-backup` = Backup copies

---

## Implementation

### In config.yaml

```yaml
# Exclusion patterns (folders to skip during ingestion)
exclude_patterns:
  - "99-*"  # Archive folders
```

### In Find Commands

```bash
# Exclude 99-* folders when scanning
find reference-docs/ -name "*.md" -not -path "*/99-*/*" -type f
```

**Explanation:**
- `-name "*.md"` → Find markdown files
- `-not -path "*/99-*/*"` → Exclude paths matching `*/99-*/`
- `-type f` → Files only (not directories)

### In rsync

```bash
# Exclude when copying/syncing
rsync -av --exclude='99-*' reference-docs/ destination/
```

---

## Archive Folder Best Practices

### 1. Single Archive Location
**Good:**
```
reference-docs/
├── 01-context/
├── 02-architecture/
└── 99-archive/
    ├── old-context/
    └── old-architecture/
```

**Bad (multiple archive locations):**
```
reference-docs/
├── 01-context/
│   └── archive/          ← Won't be excluded!
└── 02-architecture/
    └── old/              ← Won't be excluded!
```

### 2. Move vs. Delete
When a document becomes outdated:

**Option A: Archive (Recommended)**
```bash
# Move to archive folder
mv reference-docs/02-architecture-and-design/old-design.md \
   reference-docs/99-archive/02-architecture-and-design/
```

**Option B: Delete**
```bash
# Permanent deletion
rm reference-docs/02-architecture-and-design/old-design.md
```

**Option C: Version Control**
```bash
# Use git history instead of archive folder
git rm reference-docs/02-architecture-and-design/old-design.md
```

### 3. Archive Organization
Maintain structure within archive:

```
99-archive/
├── 01-context-and-requirements/
│   ├── old-requirements-v1.md
│   └── deprecated-scope.md
├── 02-architecture-and-design/
│   ├── old-architecture-v1.md
│   └── deprecated-patterns.md
└── README.md  ← Explain what's archived
```

---

## Additional Exclusion Patterns

### Temporary Files

```yaml
exclude_patterns:
  - "99-*"      # Archive folders
  - "*.tmp"     # Temporary files
  - "*.bak"     # Backup files
  - "~*"        # Editor temp files
  - ".git"      # Version control
```

### Hidden Folders

```bash
# Exclude hidden folders (starting with .)
find reference-docs/ -name "*.md" -not -path "*/.*/*" -not -path "*/99-*/*"
```

---

## Testing Exclusion

### Verify What Will Be Processed

```bash
# List files that WILL be included
find bmad/reference-docs/ -name "*.md" -not -path "*/99-*/*" -type f

# Count included files
find bmad/reference-docs/ -name "*.md" -not -path "*/99-*/*" -type f | wc -l

# List files that WILL be excluded
find bmad/reference-docs/ -name "*.md" -path "*/99-*/*" -type f
```

### Expected Output

```
✓ Including:
  bmad/reference-docs/01-context-and-requirements/requirements.md
  bmad/reference-docs/02-architecture-and-design/architecture.md
  ...

✗ Excluding:
  bmad/reference-docs/99-archive/old-requirements.md
  bmad/reference-docs/99-deprecated/old-arch.md
  ...

Summary:
  Total files: 50
  Included: 42
  Excluded: 8 (archive folders)
```

---

## Migration Guide

### Moving Existing Archives

If you have archives not following the `99-` pattern:

**Step 1: Create archive folder**
```bash
mkdir -p bmad/reference-docs/99-archive
```

**Step 2: Move archives**
```bash
# Move old/archive folders
mv bmad/reference-docs/*/archive bmad/reference-docs/99-archive/
mv bmad/reference-docs/*/old bmad/reference-docs/99-archive/
```

**Step 3: Rebuild knowledge base**
```bash
Re-invoke workflow with mode=rebuild
```

**Step 4: Verify exclusion**
```bash
Re-invoke workflow with mode=validate
```

---

## Troubleshooting

### Issue: Archives Still Being Indexed

**Check 1: Verify folder naming**
```bash
ls -d bmad/reference-docs/*/
# Should see 99-archive, not just "archive"
```

**Check 2: Test find command**
```bash
find bmad/reference-docs/ -name "*.md" -not -path "*/99-*/*" | grep archive
# Should return NO results
```

**Check 3: Rebuild knowledge base**
```bash
Re-invoke workflow with mode=rebuild
```

### Issue: Need to Temporarily Include Archive

Modify config.yaml temporarily:
```yaml
exclude_patterns: []  # Empty list = no exclusions
```

Then run:
```bash
Re-invoke workflow with mode=update
```

Restore exclusions when done.

---

## Summary

**Pattern:** `99-*`  
**Scope:** All folder levels  
**Impact:** Excluded from scanning, indexing, summarization  
**Benefit:** Cleaner knowledge base with only current information  
**Best Practice:** Maintain organized archives in `99-archive/` folder

---

For related information, see:
- config.yaml
- sidecar-structure.md
- workflow-plan.md
