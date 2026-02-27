# Sidecar Structure Reference

**Expected directory structure for reference document knowledge sidecar**

---

## Complete Structure

```
_memory/reference-docs-sidecar/
├── config.yaml                           # Sidecar configuration
├── README.md                             # Sidecar documentation
│
├── indexes/                              # Document and heading indexes
│   ├── doc-index.json                    # Machine-readable document index
│   ├── doc-index.md                      # Human-readable document index
│   └── heading-index.md                  # Hierarchical heading index
│
├── summaries/                            # Category-level summaries
│   ├── 01-context-and-requirements/
│   │   └── summary.md                    # Category summary
│   ├── 02-architecture-and-design/
│   │   └── summary.md
│   ├── 03-security-and-integrations/
│   │   └── summary.md
│   └── 04-operations-and-risks/
│       └── summary.md
│
├── extracts/                             # Agent-specific knowledge
│   ├── technical-scribe/
│   │   ├── technical-facts.md            # Technical specifications
│   │   └── <other-extracts>.md           # Additional extracts
│   ├── architect/
│   │   ├── patterns-and-decisions.md     # Architectural content
│   │   └── <other-extracts>.md
│   └── security-sentinel/
│       ├── requirements.md               # Security requirements
│       └── <other-extracts>.md
│
└── metadata/                             # Processing metadata
    ├── source-checksums.json             # File checksums for change detection
    └── processing-log.jsonl              # Processing history (append-only log)
```

---

## File Descriptions

### Root Level

#### config.yaml
**Purpose:** Sidecar configuration settings  
**Format:** YAML  
**Required:** Yes  
**Contents:**
- Version information
- Source path reference
- Exclusion patterns (99-*)
- Category definitions
- Agent extract types
- Metadata settings

#### README.md
**Purpose:** Human-readable documentation  
**Format:** Markdown  
**Required:** Yes  
**Contents:**
- Overview of sidecar
- Directory structure explanation  
- Usage instructions
- Maintenance guidance
- Last updated timestamp

---

### indexes/

#### doc-index.json
**Purpose:** Machine-readable document index  
**Format:** JSON (array of objects)  
**Required:** Yes  
**Contents:** Array of document metadata objects:
```json
[
  {
    "path": "01-context-and-requirements/doc.md",
    "name": "doc.md",
    "category": "01-context-and-requirements",
    "title": "Document Title",
    "word_count": 1523,
    "last_modified": "2026-02-11",
    "checksum": "sha256:abc123...",
    "headings": ["H2 Heading 1", "H2 Heading 2"]
  }
]
```

#### doc-index.md
**Purpose:** Human-readable document index  
**Format:** Markdown  
**Required:** Yes  
**Contents:**
- Header with generation date and document count
- Documents organized by category
- Each entry: link, title, word count

#### heading-index.md
**Purpose:** Hierarchical index of all document headings  
**Format:** Markdown  
**Required:** Yes  
**Contents:**
- Organized by topic/theme
- Links to specific headings in documents
- Quick reference for finding specific content

---

### summaries/

**Purpose:** Category-level summaries of document groups  
**Structure:** One folder per category  
**Format:** Markdown  
**Required:** Yes (at least one per category)

#### {category}/summary.md
**Contents:**
- Generation date and document count
- Overview of category purpose
- List of documents in category with descriptions
- Key themes from aggregated content

---

### extracts/

**Purpose:** Agent-specific knowledge extracts  
**Structure:** One folder per agent type  
**Format:** Markdown  
**Required:** Yes (all three agent types)

#### technical-scribe/technical-facts.md
**Purpose:** Technical facts and specifications  
**Contents:**
- Technologies mentioned
- Technical specifications
- System components
- Configuration details

#### architect/patterns-and-decisions.md
**Purpose:** Architectural patterns and decisions  
**Contents:**
- Identified architectural patterns
- Design decisions and rationale
- System architecture overview
- Integration patterns

#### security-sentinel/requirements.md
**Purpose:** Security requirements and controls  
**Contents:**
- Security requirements
- Security controls
- Compliance requirements
- Threat considerations

---

### metadata/

#### source-checksums.json
**Purpose:** File checksums for change detection  
**Format:** JSON (object with path→checksum mapping)  
**Required:** Yes  
**Contents:**
```json
{
  "01-context-and-requirements/doc1.md": "sha256:abc123...",
  "02-architecture-and-design/doc2.md": "sha256:def456..."
}
```

**Used for:**
- Detecting modified files during update
- Identifying new files (not in checksums)
- Identifying deleted files (in checksums but not in source)

#### processing-log.jsonl
**Purpose:** Append-only processing history  
**Format:** JSON Lines (one JSON object per line)  
**Required:** Yes  
**Contents:** Log entries with:
```jsonl
{"timestamp":"2026-02-11T10:30:00Z","action":"init","status":"started","message":"..."}
{"timestamp":"2026-02-11T10:30:30Z","action":"init","status":"completed","documents_processed":7,"errors":0,"duration_seconds":30,"message":"..."}
```

**Actions:** init, update, rebuild, validate  
**Statuses:** started, processing, completed, failed

---

## Directory Creation Order

When initializing sidecar:

1. **Root directory** - `_memory/reference-docs-sidecar/`
2. **Main folders** - indexes/, summaries/, extracts/, metadata/
3. **Extract subfolders** - technical-scribe/, architect/, security-sentinel/
4. **Category summary folders** - Created dynamically based on source structure

---

## File Creation Order

When performing initial ingestion:

1. **config.yaml** - Configuration first
2. **README.md** - Documentation
3. **Process source documents** - Scan and extract metadata
4. **doc-index.json** - Build document index
5. **doc-index.md** - Generate human-readable index  
6. **heading-index.md** - Build heading hierarchy
7. **Category summaries** - Generate for each category
8. **Agent extracts** - Build knowledge extracts
9. **source-checksums.json** - Store checksums
10. **processing-log.jsonl** - Initialize with first entry

---

## Size Expectations

| Component | Small (<20) | Medium (20-100) | Large (100+) |
|-----------|-------------|-----------------|--------------|
| **Total size** | <5 MB | 5-50 MB | 50-500 MB |
| **doc-index.json** | <50 KB | 50-500 KB | 0.5-5 MB |
| **Summaries** | 4-10 files | 5-20 files | 10-50 files |
| **Extracts** | 3-10 files | 5-20 files | 10-50 files |
| **Checksums** | <10 KB | 10-100 KB | 100 KB-1 MB |

---

## Validation Checks

### Structure Check
- ✓ Root directory exists
- ✓ All four main folders exist (indexes, summaries, extracts, metadata)
- ✓ All three extract folders exist (technical-scribe, architect, security-sentinel)
- ✓ config.yaml and README.md present

### Content Check
- ✓ doc-index.json is valid JSON
- ✓ doc-index.md exists
- ✓ heading-index.md exists
- ✓ At least one summary per category
- ✓ At least one extract file per agent type
- ✓ source-checksums.json is valid JSON
- ✓ processing-log.jsonl exists

### Consistency Check
- ✓ Document count in index matches source
- ✓ Checksums match current source files
- ✓ No orphaned entries (deleted source files)
- ✓ No unindexed files (new source files)

---

## Maintenance Notes

### What to Backup
- Entire sidecar directory during rebuild
- Individual backups typically not needed (can be regenerated)

### What Can Be Deleted
- Individual extract files (will be regenerated)
- Summary files (will be regenerated)
- Heading index (will be regenerated)

### What Should NEVER Be Deleted Manually
- config.yaml (contains settings)
- source-checksums.json (needed for change detection)
- processing-log.jsonl (historical record)

---

## Performance Impact

**Disk I/O:**
- Read-heavy during validation
- Write-heavy during init/rebuild
- Moderate during update

**Memory Usage:**
- Document index loaded into memory
- Checksum map loaded into memory
- Typical: <100 MB RAM for medium-sized corpus

**CPU Usage:**
- Checksum calculation (CPU-intensive)
- JSON parsing (moderate)
- File scanning (I/O-bound)

---

For implementation details, see:
- workflow-plan.md
- Step files in steps-init/, steps-update/, etc.
