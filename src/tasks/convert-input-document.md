---
name: "convert-input-document"
description: "Convert Microsoft Office and other binary documents to markdown for agent processing"
category: "Document Processing"
---

# Task: Convert Input Document

## Purpose

Convert existing documents (DOCX, PPTX, PDF, RTF, etc.) to markdown format so SDA agents can read and process them as part of the knowledge base.

**Common Input Types:**
- **DOCX** (Microsoft Word) → Markdown
- **PPTX** (Microsoft PowerPoint) → Markdown  
- **PDF** → Markdown (text extraction)
- **RTF** (Rich Text Format) → Markdown
- **ODT/ODP** (OpenDocument) → Markdown

## Inputs

**Required:**
- `source_file`: Path to source document (docx, pptx, pdf, rtf, etc.)

**Optional:**
- `output_path`: Custom output path (defaults to same directory with .md extension)
- `extract_images`: Extract embedded images to subfolder (default: true)
- `preserve_structure`: Maintain document structure (headings, lists) (default: true)

## Prerequisites

Verify pandoc is installed:

```bash
pandoc --version
```

**If not installed:**

**Recommended Options:**

1. **GitHub releases**: https://github.com/jgm/pandoc/releases/
   - Install platform-specific package (Windows .msi, macOS .pkg, Linux .deb/.rpm)

2. **Conda** (up-to-date):
   ```bash
   conda install pandoc
   # or: conda install -c conda-forge pandoc
   ```

**Alternative - Package Managers:** (may be outdated)
- macOS: `brew install pandoc` 
- Ubuntu/Debian: `sudo apt install pandoc`
- Windows: `choco install pandoc`

## File Type Detection

**Auto-detect file type by extension:**
```bash
case "${source_file##*.}" in
  docx|doc) format="docx" ;;
  pptx|ppt) format="pptx" ;;
  pdf) format="pdf" ;;
  rtf) format="rtf" ;;
  odt) format="odt" ;;
  odp) format="odp" ;;
  *) echo "Unsupported format" ; exit 1 ;;
esac
```

## Execution

### For DOCX Files (Word Documents)

**Command:**
```bash
pandoc "{source_file}" -t markdown -o "{output_path}" --extract-media="{media_dir}"
```

**Example:**
```bash
pandoc "Technical Specification v2.1.docx" \
  -t markdown \
  -o "Technical Specification v2.1.md" \
  --extract-media="./Technical Specification v2.1_media"
```

**Output:**
- Main markdown file with converted text
- Media folder with extracted images
- Links to images preserved in markdown

### For PPTX Files (PowerPoint Presentations)

**Command:**
```bash
pandoc "{source_file}" -t markdown -o "{output_path}" --extract-media="{media_dir}"
```

**Result:**
- Each slide becomes a section (`##`)
- Bullet points preserved
- Images extracted to media folder
- Speaker notes included (if present)

**Example conversion:**
```markdown
## Slide Title

- Bullet point 1
- Bullet point 2
  - Sub-bullet

![Image description](media/image1.png)

## Next Slide

...
```

### For PDF Files

**Command:**
```bash
pandoc "{source_file}" -t markdown -o "{output_path}"
```

**Notes:**
- Text extraction only (no images in most cases)
- Formatting may require manual cleanup
- Complex layouts may not convert perfectly
- Scanned PDFs won't work (need OCR)

### For RTF Files

**Command:**
```bash
pandoc "{source_file}" -t markdown -o "{output_path}"
```

**Notes:**
- Good formatting preservation
- Tables and lists convert well
- Limited image support

## Advanced Options

### High-Quality Word Conversion
```bash
pandoc input.docx \
  -t markdown \
  -o output.md \
  --extract-media=media \
  --wrap=none \
  --markdown-headings=atx
```

### PowerPoint with Better Structure
```bash
pandoc input.pptx \
  -t markdown \
  -o output.md \
  --extract-media=media \
  --slide-level=2
```

### Batch Processing Directory
```bash
for file in *.docx *.pptx; do
  if [[ -f "$file" ]]; then
    base="${file%.*}"
    pandoc "$file" -t markdown -o "${base}.md" --extract-media="${base}_media"
  fi
done
```

## Post-Processing

After conversion, may need cleanup:

### Fix Image Paths
Convert relative paths to absolute if needed:
```bash
sed -i 's|media/|./path/to/media/|g' output.md
```

### Clean Up Formatting
- Remove excessive blank lines
- Fix table formatting
- Adjust heading levels if needed

### Validate Markdown
Check that markdown is valid:
```bash
pandoc output.md -t html -o /dev/null  # Test parsing
```

## Error Handling

**If pandoc not found:**
```bash
if ! command -v pandoc &> /dev/null; then
  echo "Pandoc not found. Install with:"
  echo "  macOS: brew install pandoc"
  echo "  Ubuntu: sudo apt install pandoc"
  echo "  Windows: choco install pandoc"
  exit 1
fi
```

**If conversion fails:**
```bash
if ! pandoc "$source_file" -t markdown -o "$output_path"; then
  echo "Conversion failed. Possible causes:"
  echo "- File is corrupted or password-protected"
  echo "- Unsupported file format variant"
  echo "- Insufficient permissions"
  echo "Original file: $source_file"
  exit 1
fi
```

**If file is password-protected:**
- DOCX/PPTX: Pandoc cannot handle password-protected files
- PDF: May need to unlock first
- Provide error message asking user to unlock file

## Integration with SDA Workflows

### Automatic Conversion in Knowledge Review

When step-02-knowledge-review encounters unreadable files:

1. **Detect binary files** in reference-docs, project folders
2. **Check if .md version exists** alongside binary file
3. **If not, convert automatically** using this task
4. **Process converted markdown** for technical findings
5. **Cache conversion** (don't reconvert unless source is newer)

### Usage Example in Workflow

```markdown
**Technical Scribe:**

"Found unreadable document: Technical_Spec_v2.1.docx

Converting to markdown for analysis...

Execute task: convert-input-document
- source_file: "reference-docs/Technical_Spec_v2.1.docx"
- output_path: "reference-docs/Technical_Spec_v2.1.md"  
- extract_images: true

✅ Converted successfully
📄 Created: Technical_Spec_v2.1.md (45 KB)
🖼️ Extracted: 12 images to Technical_Spec_v2.1_media/

Now analyzing converted content..."
```

## Output

**On Success:**
```yaml
status: "success"
input_file: "{original_file_path}"
output_file: "{markdown_file_path}"
media_folder: "{media_folder_path}"  # if images extracted
file_size_kb: {size}
conversion_type: "docx" | "pptx" | "pdf" | "rtf"
images_extracted: {count}
```

**On Failure:**
```yaml
status: "error"
input_file: "{original_file_path}"
error_type: "pandoc_missing" | "conversion_failed" | "file_locked" | "unsupported_format"
error_message: "{detailed_error}"
suggested_action: "{troubleshooting_tip}"
```

## Supported Formats

**✅ Excellent Support:**
- DOCX (Microsoft Word 2007+)
- PPTX (Microsoft PowerPoint 2007+)
- ODT (OpenDocument Text)
- ODP (OpenDocument Presentation)
- RTF (Rich Text Format)

**⚠️ Good Support:**
- PDF (text extraction, layout may be imperfect)
- DOC (older Word, requires LibreOffice)
- PPT (older PowerPoint, requires LibreOffice)

**❌ Not Supported:**
- Password-protected files
- Heavily graphical PDFs
- Scanned documents (need OCR)
- Proprietary formats without pandoc support

## Best Practices

### File Organization
```
reference-docs/
├── original-documents/
│   ├── Technical_Spec_v2.1.docx
│   └── Architecture_Overview.pptx
├── converted/
│   ├── Technical_Spec_v2.1.md
│   ├── Technical_Spec_v2.1_media/
│   ├── Architecture_Overview.md
│   └── Architecture_Overview_media/
└── README.md  # Conversion log
```

### Batch Conversion Script
For processing multiple files:

```bash
#!/bin/bash
# Convert all Office documents in reference-docs

find reference-docs -name "*.docx" -o -name "*.pptx" -o -name "*.pdf" | while read file; do
  base="${file%.*}"
  if [[ ! -f "${base}.md" ]] || [[ "$file" -nt "${base}.md" ]]; then
    echo "Converting: $file"
    pandoc "$file" -t markdown -o "${base}.md" --extract-media="${base}_media"
  else
    echo "Skipping (already converted): $file"
  fi
done
```

### Version Control
- Add `*.md` files to version control
- Optionally ignore `*_media/` folders if images are large
- Keep original files for reference

---

_Task created for SDA module v1.0.0 - Input Document Conversion_