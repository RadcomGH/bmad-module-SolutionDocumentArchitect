---
name: "ingest-reference-documents"
description: "Extract and index knowledge from reference documents into the sidecar knowledge base"
category: "Knowledge Management"
---

# Task: Ingest Reference Documents

## Purpose

Process reference documents from `bmad/reference-docs` and extract structured knowledge into the `_memory/reference-docs-sidecar` for agent consumption.

This task:
- Scans reference documents (excluding archives)
- Extracts headings, summaries, and key sections
- Creates document indexes and metadata
- Stores knowledge in the sidecar for fast agent access

## Inputs

**Required:**
- `mode`: Processing mode
  - `incremental` - Process only new/changed documents (default)
  - `full` - Rebuild entire knowledge base

**Optional:**
- `category_filter`: Limit to specific category (e.g., `01-context-and-requirements`)
- `force_reprocess`: Force reprocessing even if unchanged (default: false)

## Prerequisites

**Directory Structure:**
- Source: `{project-root}/bmad/reference-docs/`
- Sidecar: `{project-root}/bmad/_memory/reference-docs-sidecar/`

**Tools:**
- Pandoc (for document conversion if needed)
- File system access

## Process

### 1. Initialize Sidecar Structure

```bash
# Create sidecar directories if they don't exist
mkdir -p bmad/_memory/reference-docs-sidecar/{indexes,summaries,extracts,metadata}
mkdir -p bmad/_memory/reference-docs-sidecar/summaries/{01-context-and-requirements,02-architecture-and-design,03-security-and-integrations}
mkdir -p bmad/_memory/reference-docs-sidecar/extracts/{technical-scribe,architect,security-sentinel}
```

### 2. Scan Reference Documents

**Directory to scan:**
```
bmad/reference-docs/
├── 01-context-and-requirements/
├── 02-architecture-and-design/
├── 03-security-and-integrations/
└── 04-operations-and-risks/
```

**Exclusions:**
- `99-*` folders (archives)
- Non-markdown files (unless conversion task runs first)
- Temporary files (`.tmp`, `.bak`, `.DS_Store`)

**For each document:**
1. Calculate checksum (MD5/SHA256)
2. Compare with `metadata/source-checksums.json`
3. If changed or new:
   - Add to processing queue
   - Update checksum registry

### 3. Extract Document Metadata

For each document, extract:

```json
{
  "fileName": "Project HLD v1.9.md",
  "relativePath": "reference-docs/01-context-and-requirements/Project HLD v1.9.md",
  "slug": "project-hld-v1-9",
  "category": "01-context-and-requirements",
  "docType": "HLD",
  "style": "markdown-headings",
  "lines": 1401,
  "wordCount": 12500,
  "keySectionKeys": ["scope", "architecture", "security", "deployment"],
  "lastModified": "2026-02-11T10:30:00Z",
  "checksum": "abc123...",
  "version": "1.9",
  "ingestedAt": "2026-02-11T15:00:00Z"
}
```

### 4. Build Document Index

Aggregate all document metadata into master indexes:

**JSON Index** (`indexes/doc-index.json`):
```json
[
  { "fileName": "...", "relativePath": "...", ... },
  { "fileName": "...", "relativePath": "...", ... }
]
```

**Markdown Index** (`indexes/doc-index.md`):
```markdown
# Reference Documents Index

Last updated: {timestamp}

## 01 - Context and Requirements
- [Project HLD v1.9](../../reference-docs/01-context-and-requirements/Project HLD v1.9.md) - HLD, 1401 lines
- [Integration Requirements v2](../../reference-docs/01-context-and-requirements/Integration Requirements v2.md) - Requirements, 137 lines

## 02 - Architecture and Design
...
```

### 5. Extract Heading Hierarchy

Parse each document and extract heading structure:

**Output** (`indexes/heading-index.md`):
```markdown
# Heading Index - Reference Documents

## Document: Project HLD v1.9
- # Executive Summary
- # 1. Scope and Objectives
  - ## 1.1 Project Scope
  - ## 1.2 Business Objectives
- # 2. Architecture Overview
  - ## 2.1 Logical Architecture
    - ### 2.1.1 Frontend Components
    - ### 2.1.2 Backend Services
  - ## 2.2 Physical Architecture
...
```

### 6. Generate Summaries by Category

For each category folder, create aggregated summaries:

**Output** (`summaries/01-context-and-requirements/summary.md`):
```markdown
# Context and Requirements - Summary

Generated: {timestamp}
Documents: 7

## Overview
This section contains high-level design documents, requirements specifications, and integration needs for the RADCOM ACE deployment.

## Key Documents
1. **Project AInsight HLD v1.9** - Primary architecture specification
2. **Integration Requirements v2** - External system integration needs
3. **DISH RADCOM ACE HLD v1.5** - Alternative deployment scenario

## Common Themes
- Multi-tenant SaaS architecture
- AWS cloud deployment
- Network probes and data collectors...
```

### 7. Extract Agent-Specific Knowledge

Create role-based extracts for common agent personas:

**Technical Scribe Extract** (`extracts/technical-scribe/technical-facts.md`):
- Component names and versions
- API endpoints and interfaces
- Configuration parameters
- Technical constraints

**Architect Extract** (`extracts/architect/patterns-and-decisions.md`):
- Architectural patterns identified
- Design decisions and rationale
- Trade-offs documented
- Technology choices

**Security Sentinel Extract** (`extracts/security-sentinel/requirements.md`):
- Security requirements
- Compliance standards
- Authentication/authorization
- Encryption requirements

### 8. Update Processing Log

Append to `metadata/processing-log.jsonl`:

```jsonl
{"timestamp":"2026-02-11T15:00:00Z","mode":"incremental","documentsProcessed":3,"documentsSkipped":4,"duration":"2.3s","errors":[]}
{"timestamp":"2026-02-11T16:30:00Z","mode":"full","documentsProcessed":7,"documentsSkipped":0,"duration":"8.1s","errors":[]}
```

## Outputs

**Generated Files:**
1. `indexes/doc-index.json` - Machine-readable document index
2. `indexes/doc-index.md` - Human-readable document index  
3. `indexes/heading-index.md` - Hierarchical heading structure
4. `summaries/{category}/summary.md` - Category-level summaries
5. `extracts/{agent-role}/*.md` - Role-specific knowledge
6. `metadata/source-checksums.json` - Change detection data
7. `metadata/processing-log.jsonl` - Processing history

## Validation

After processing:

1. **Verify indexes created:**
   ```bash
   ls -la bmad/_memory/reference-docs-sidecar/indexes/
   ```

2. **Check document count:**
   ```bash
   jq 'length' bmad/_memory/reference-docs-sidecar/indexes/doc-index.json
   ```

3. **Review processing log:**
   ```bash
   tail -5 bmad/_memory/reference-docs-sidecar/metadata/processing-log.jsonl
   ```

## Error Handling

**Common Issues:**

1. **Missing source documents:**
   - Check `bmad/reference-docs/` exists
   - Verify read permissions

2. **Sidecar directory not writable:**
   - Check write permissions on `_memory/` folder

3. **Malformed markdown:**
   - Log warning and continue
   - Flag for manual review

4. **Archives included (99- folders):**
   - Verify exclusion pattern in config.yaml
   - Check glob matching logic

## Integration

This task is invoked by:
- **Workflow:** `knowledge-management` → `ingest-step`
- **Workflow:** `sda-main` → Step 2 (if sidecar out of date)
- **Manual:** Run standalone for maintenance

## Performance

**Expected Duration:**
- Incremental (1-3 new docs): 2-5 seconds
- Full rebuild (50+ docs): 30-60 seconds
- Large corpus (500+ docs): 5-10 minutes

**Optimization:**
- Use incremental mode by default
- Parallel processing for full rebuilds
- Cache parsed markdown AST
