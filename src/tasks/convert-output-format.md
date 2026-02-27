---
name: "convert-output-format"
description: "Convert markdown document to ODT/ODP format using pandoc"
category: "Document Conversion"
---

# Task: Convert Output Format

## Purpose

Convert solution documents from markdown to OpenDocument formats (ODT/ODP) using pandoc.

**Output Files:**
- **ODT** (OpenDocument Text) - Opens in Microsoft Word, LibreOffice Writer, Google Docs
- **ODP** (OpenDocument Presentation) - Opens in Microsoft PowerPoint, LibreOffice Impress, Google Slides

## Inputs

**Required:**
- `source_md`: Path to source markdown file
- `output_format`: Format to generate ('odt' or 'odp')

**Optional:**
- `template`: Path to ODT/ODP reference template (uses pandoc defaults if not provided)
- `output_path`: Custom output path (defaults to same directory as source with new extension)

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

## Execution

### For ODT Output (Document)

**Command:**
```bash
pandoc "{source_md}" -o "{output_path}" --reference-doc="{template}"
```

**Without template:**
```bash
pandoc "{source_md}" -o "{output_path}"
```

**Example:**
```bash
pandoc /path/to/solution_description.md \
  -o /path/to/solution_description.odt \
  --reference-doc=/path/to/template.odt
```

### For ODP Output (Presentation)

**Command:**
```bash
pandoc "{source_md}" -o "{output_path}" --reference-doc="{template}"
```

**Without template:**
```bash
pandoc "{source_md}" -o "{output_path}"
```

**Example:**
```bash
pandoc /path/to/solution_description.md \
  -o /path/to/solution_description.odp \
  --reference-doc=/path/to/template.odp
```

### Markdown to ODP Slide Structure

Pandoc creates presentation slides from markdown structure:

- `#` (H1) → Section title slide
- `##` (H2) → Content slide title
- `###` (H3) → Slide subtitle
- Bullet points → Slide content
- Images → Embedded in slides
- Tables → Formatted table slides
- Horizontal rules (`---`) → Force new slide

## Error Handling

**If pandoc not found:**
1. Display installation instructions for user's platform
2. Provide download link: https://pandoc.org/installing.html
3. Return error status with instructions

**If source file missing:**
1. Verify source_md path is correct
2. Check file exists and is readable
3. Return error with file path

**If template missing:**
1. Log warning: "Template not found, using pandoc defaults"
2. Proceed without --reference-doc flag
3. Continue conversion

**If conversion fails:**
1. Capture pandoc error output
2. Display error message to user
3. Return markdown path as fallback
4. Suggest checking markdown syntax

## Output

**On Success:**
Returns object with:
```yaml
status: "success"
output_file: "{path_to_output_file}"
format: "odt" | "odp"
file_size_mb: {size}
template_used: true | false
```

**On Failure:**
Returns object with:
```yaml
status: "error"
error_message: "{pandoc_error_output}"
fallback_file: "{source_md_path}"
suggested_action: "{troubleshooting_tip}"
```

## Post-Processing

After successful conversion:
1. Verify output file was created
2. Check file size is reasonable (> 0 bytes)
3. Log conversion statistics
4. Return output file path

## Usage Example

```markdown
Execute task: convert-output-format
- source_md: "{output_folder}/solution-descriptions/cloud-migration_description.md"
- output_format: "odt"
- template: "{installed_path}/templates/solution-document-template.odt"
```

**Result:**
- Creates: `cloud-migration_description.odt`
- Opens in: Microsoft Word, LibreOffice Writer, Google Docs
- Fully editable with preserved formatting

---

## Notes

**Why OpenDocument Formats?**
- Universal compatibility (Microsoft Office, LibreOffice, Google Workspace)
- ISO/IEC 26300 open standard
- Excellent pandoc conversion quality
- Single-step conversion (no intermediates)
- Fully editable by recipients

**Template Customization:**
Edit templates in LibreOffice or Microsoft Office:
1. Open `template.odt` or `template.odp`
2. Modify styles, colors, fonts, logos, layouts
3. Save as ODT/ODP format (not DOCX/PPTX)
4. Place in `{installed_path}/templates/` directory
5. Template applies automatically on next conversion

---

_Task created for SDA module v1.0.0_
