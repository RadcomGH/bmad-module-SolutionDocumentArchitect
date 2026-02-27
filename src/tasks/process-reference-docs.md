---
name: "process-reference-docs"
description: "Batch convert all Microsoft Office documents in reference-docs folder"
category: "Document Processing"
---

# Task: Process Reference Documents

## Purpose

Batch convert all Microsoft Office and binary documents in the `reference-docs/` directory to markdown format for SDA agent processing.

**After conversion, run knowledge ingestion:**
- Converted markdown files are stored alongside originals
- Knowledge extraction happens via `ingest-reference-documents` task
- Extracted knowledge stored in `_memory/reference-docs-sidecar/`

**Use Cases:**
- Initial workspace setup (convert existing documentation)
- Periodic updates (sync new documents)
- Pre-workflow preparation (ensure all docs are readable)

**Exclusions:**
- Archive folders (`99-*`) are skipped
- Already-converted files (if .md exists and is newer than source)

## Execution

### Directory Structure

**Recommended organization:**
```
{project-root}/reference-docs/
├── 01-context-and-requirements/
│   ├── Requirements_v2.1.docx
│   ├── Requirements_v2.1.md       # ← Auto-generated
└── └── Requirements_v2.1_media/   # ← Auto-generated
├── 02-architecture-and-design/
│   ├── Architecture_Overview.pptx
│   ├── Architecture_Overview.md    # ← Auto-generated
└── └── Architecture_Overview_media/ # ← Auto-generated
├── 03-legacy-documentation/
└── README.md
```

### Batch Conversion Script

**Find and convert all supported binary documents:**

```bash
#!/bin/bash
# Process Reference Documents - Batch Conversion

echo "🔍 Scanning reference-docs for binary documents..."

# Exclusion pattern for archive folders
EXCLUDE_PATTERN="*/99-*"

# Find all supported binary formats (excluding archives)
find reference-docs -type f \( \
  -name "*.docx" -o \
  -name "*.pptx" -o \
  -name "*.doc" -o \
  -name "*.ppt" -o \
  -name "*.pdf" -o \
  -name "*.rtf" -o \
  -name "*.odt" -o \
  -name "*.odp" \
\) ! -path "$EXCLUDE_PATTERN" | while read -r file; do

  # Get base name without extension
  base="${file%.*}"
  markdown_file="${base}.md"
  
  echo "📄 Processing: $file"
  
  # Check if conversion is needed
  if [[ ! -f "$markdown_file" ]] || [[ "$file" -nt "$markdown_file" ]]; then
    echo "  🔄 Converting to markdown..."
    
    # Execute conversion task
    if pandoc "$file" -t markdown -o "$markdown_file" --extract-media="${base}_media"; then
      echo "  ✅ Success: $markdown_file"
      
      # Log conversion
      echo "$(date): Converted $file → $markdown_file" >> reference-docs/.conversion-log
    else
      echo "  ❌ Failed: $file"
      echo "$(date): FAILED $file (error: $?)" >> reference-docs/.conversion-log
    fi
  else
    echo "  ✅ Already current: $markdown_file"
  fi
  
  echo ""
done

echo "✅ Reference document processing complete!"
echo "📋 See reference-docs/.conversion-log for details"
echo ""
echo "💡 Next step: Run knowledge ingestion to update sidecar"
echo "   Command: bmad workflow run knowledge-management --mode=update"
```

### Selective Conversion

**Convert specific file types only:**

```bash
# Convert only Word documents
find reference-docs -name "*.docx" -exec pandoc {} -t markdown -o {}.md \;

# Convert only PowerPoint presentations  
find reference-docs -name "*.pptx" -exec pandoc {} -t markdown -o {}.md \;

# Convert with media extraction
find reference-docs -name "*.docx" | while read file; do
  base="${file%.*}"
  pandoc "$file" -t markdown -o "${base}.md" --extract-media="${base}_media"
done
```

### Integration with SDA Workflows

**Before running SDA Main workflow:**

```markdown
Execute task: process-reference-docs
```

This ensures all reference documents are available in markdown format for:
- Step-02 Knowledge Review (Technical Scribe can analyze all docs)
- Agent knowledge base access throughout workflow
- Cross-referencing during document creation

### Conversion Status Tracking

**Create `.conversion-log` file:**

```
2026-02-11 10:32:14: Converted Requirements_v2.1.docx → Requirements_v2.1.md
2026-02-11 10:32:18: Converted Architecture_Overview.pptx → Architecture_Overview.md  
2026-02-11 10:32:22: FAILED Legacy_Spec.pdf (password-protected)
2026-02-11 10:32:25: Skipped API_Docs.md (already markdown)
```

**Create `.gitignore` entries if needed:**

```gitignore
# Ignore large media folders if desired
reference-docs/**/*_media/

# Keep conversion log
!reference-docs/.conversion-log
```

## Error Handling

### Common Issues

**Password-protected files:**
```
❌ Failed: Secure_Document.docx
Solution: Manually unlock file, then re-run conversion
```

**Corrupted files:**
```
❌ Failed: Broken_Presentation.pptx  
Solution: Try opening in Office, repair if needed
```

**Missing pandoc:**
```
❌ Command not found: pandoc
Solution: Install pandoc (see README Prerequisites)
```

**Permission errors:**
```
❌ Permission denied: /restricted/file.docx
Solution: Check file permissions, run with appropriate access
```

### Recovery Actions

**Failed conversions:**
1. Check `.conversion-log` for error details
2. Manually verify source file integrity
3. Try conversion with different pandoc options
4. Document files that cannot be converted
5. Inform users which reference docs are unavailable

**Partial success:**
- Continue with successfully converted documents
- Note missing docs in workflow findings
- Suggest manual alternatives for failed conversions

## Output

**Success Response:**
```yaml
status: "success"
processed_files: {count}
converted: {count}
skipped: {count}  # already current
failed: {count}
conversion_log: "reference-docs/.conversion-log"
```

**Summary Report:**
```markdown
## Reference Document Processing Complete

📊 **Statistics:**
- **Processed:** 15 binary documents
- **Converted:** 12 new/updated markdown files
- **Already current:** 2 files
- **Failed:** 1 file (password-protected)

📁 **Available for Analysis:**
- Requirements_v2.1.md (124 KB, 8 images)
- Architecture_Overview.md (89 KB, 15 diagrams)  
- Legacy_API_Spec.md (45 KB, 3 tables)
- [... full list ...]

⚠️ **Conversion Issues:**
- Secure_Document.docx - Password-protected (manual unlock required)

✅ **Ready for SDA Workflows**
All available reference documents are now in agent-readable format.
```

## Best Practices

### File Organization
- Keep originals and converted files in same directory
- Use consistent naming: `Document.docx` → `Document.md`
- Group related images: `Document_media/`
- Maintain README.md with document descriptions

### Version Control
- Commit converted markdown files
- Consider ignoring large media folders  
- Track conversion log for audit trail
- Update .gitignore appropriately

### Workflow Integration
- Run before major SDA workflows
- Schedule periodic updates for active projects
- Integrate with CI/CD if reference docs change frequently
- Notify team when new docs are available

### Quality Control
- Spot-check converted markdown for accuracy
- Verify images are properly extracted
- Test complex tables and formatting
- Document any manual cleanup needed

---

_Task created for SDA module v1.0.0 - Reference Document Processing_