# Document Format Conversion

SDA handles both **INPUT** and **OUTPUT** document conversion to maximize compatibility and accessibility.

## Input Conversion (📥 Reading Existing Documents)

Convert existing Microsoft Office and other binary documents TO markdown so agents can read them.

**Purpose:** Make existing documentation readable by SDA agents
**Common Sources:** Reference docs, specifications, legacy documentation
**Process:** DOCX/PPTX/PDF → Markdown → Agent processing

## Output Conversion (📤 Publishing Solution Documents)

Convert solution documents FROM markdown to stakeholder-friendly formats.

**Purpose:** Deliver final documents in formats stakeholders prefer  
**Target Formats:** ODT (Word-compatible), ODP (PowerPoint-compatible)
**Process:** Agent-created markdown → ODT/ODP → Stakeholder delivery

---

## INPUT Conversion: Reading Existing Documents

### Why Input Conversion?

SDA exports solution documents in multiple formats for maximum compatibility and usability:

- **Markdown (.md)** - Always generated, source of truth
- **OpenDocument Text (.odt)** - Opens in Word, LibreOffice Writer, Google Docs
- **OpenDocument Presentation (.odp)** - Opens in PowerPoint, Impress, Google Slides

## Why OpenDocument Formats?

### Universal Compatibility
ODT and ODP files open natively in:
- **Microsoft Office** (Word, PowerPoint)
- **LibreOffice** (Writer, Impress)
- **Google Workspace** (Docs, Slides)
- **Apache OpenOffice**
- Most modern office suites

Recipients can view and edit without conversion.

### Open Standards
- **ISO/IEC 26300** international standard
- **Non-proprietary** format specification
- **Future-proof** with long-term support
- **Interoperable** across platforms

### Superior Pandoc Support
- Pandoc excels at markdown → ODT/ODP conversion
- Better formatting preservation than direct DOCX/PPTX
- Reliable handling of complex structures (tables, lists, headings)
- Style inheritance works correctly

### Single-Step Conversion
- Direct conversion: markdown → ODT/ODP
- No intermediate formats needed
- Simpler pipeline, fewer failure points
- Faster execution

### Fully Editable
- Recipients can edit in their preferred tool
- No "view-only" or compatibility issues
- Track changes works normally
- Comments and collaboration supported

## ODT (OpenDocument Text)

**Purpose:** Full solution documents, architecture docs, proposals, specifications

**Opens in:**
- Microsoft Word (2007 SP2+)
- LibreOffice Writer
- Google Docs
- Pages (macOS)

**Best for:**
- Detailed technical documentation
- Enterprise proposals
- RFP responses
- Architecture decision records

**Conversion Quality:**
- Excellent heading hierarchy preservation
- Tables maintain formatting and alignment
- Lists (ordered and unordered) convert reliably
- Code blocks with syntax highlighting
- Images embedded properly
- Links preserved

## ODP (OpenDocument Presentation)

**Purpose:** Executive summaries, pitch decks, presentations, slide-based overviews

**Opens in:**
- Microsoft PowerPoint (2007 SP2+)
- LibreOffice Impress
- Google Slides
- Keynote (macOS)

**Best for:**
- Executive briefings
- Sales presentations
- Conference talks
- Board-level summaries

**Markdown to Slide Structure:**

Pandoc creates slides from markdown headings:

```markdown
# Section Title
(Creates section divider slide)

## Slide Title
(Creates new content slide)

### Slide Subtitle
(Adds subtitle to current slide)

- Bullet point 1
- Bullet point 2
  - Nested bullet
(Creates bulleted content on slide)

---
(Force new slide break)
```

**Conversion Quality:**
- Clean slide layouts from headings
- Bullet points formatted correctly
- Images scaled and positioned on slides
- Tables converted to slide tables
- Speaker notes from special syntax

## Conversion Process

### How It Works

1. **User completes solution document** (markdown)
2. **User selects output formats** in step-03 (audience configuration)
3. **Workflow saves markdown** as primary artifact
4. **Conversion task executes:**
   - For ODT: `pandoc input.md -o output.odt --reference-doc=template.odt`
   - For ODP: `pandoc input.md -o output.odp --reference-doc=template.odp`
5. **Output files saved** alongside markdown in output folder

### Template Application

**With custom template:**
```bash
pandoc solution.md -o solution.odt --reference-doc=company-template.odt
```
- Applies company branding (colors, fonts, logos)
- Uses custom styles for headings, body text
- Headers/footers appear automatically

**Without custom template:**
```bash
pandoc solution.md -o solution.odt
```
- Uses pandoc default styles
- Clean, professional appearance
- Still fully functional and editable

### Prerequisites

**Required:** pandoc
- Check: `pandoc --version`
- Install: See README prerequisites section

**Optional:** Custom templates (ODT/ODP files)
- Edit in LibreOffice or Microsoft Office
- Save as ODT/ODP format (not DOCX/PPTX)
- Place in `{installed_path}/templates/` directory

## Workflow Integration

### Step-03: Format Selection

After audience configuration, user selects output formats:

```
Select output formats:
[M] Markdown only (default)
[D] Markdown + ODT document
[P] Markdown + ODP presentation
[B] All formats (markdown + ODT + ODP)
```

Choice stored in workflow state:
```yaml
output_formats: [markdown, odt, odp]
```

### Step-10: Conversion Execution

After final document synthesis:

1. Save markdown file (always)
2. Check `output_formats` from workflow state
3. For each requested format:
   - Execute conversion task
   - Display progress
   - Save output file
4. Show all generated files to user

## Best Practices

### When to Use Each Format

**Markdown (.md):**
- Source of truth (always generated)
- Version control and diffs
- Technical reviews
- Internal documentation

**ODT (.odt):**
- External stakeholder delivery
- Formal proposals and RFPs
- Documents requiring editing by recipients
- Enterprise documentation packages

**ODP (.odp):**
- Executive presentations
- Board briefings
- Sales pitch decks
- Conference presentations
- High-level overviews

### Template Customization

**Document Templates (ODT):**
- Company logo in header
- Corporate color scheme
- Standard fonts (sans-serif for headings, serif for body)
- Page margins and sizes
- Footer with copyright/confidentiality notice

**Presentation Templates (ODP):**
- Branded master slides
- Title slide with logo
- Content slides with consistent layout
- Section divider slides
- Footer with company name and slide numbers

### Markdown Considerations for Slides

When writing markdown for ODP conversion:

✅ **Do:**
- Use `##` (H2) for each slide title
- Keep bullet points concise (3-7 words)
- Limit slide content (5-7 bullets max)
- Use `---` to force slide breaks
- Include images for visual interest

❌ **Avoid:**
- Long paragraphs (switch to ODT for prose)
- Deep nesting (>2 levels of bullets)
- Complex tables (simplify or use ODT)
- Excessive text per slide

## Troubleshooting

### Pandoc Not Found
**Error:** `Command not found: pandoc`

**Solution:**

**Recommended Options:**

1. **GitHub releases**: https://github.com/jgm/pandoc/releases/
   - Choose installer for your platform (Windows .msi, macOS .pkg, Linux .deb/.rpm)
   - Always has latest features and bug fixes

2. **Conda** (up-to-date):
   ```bash
   conda install pandoc
   # or from conda-forge: conda install -c conda-forge pandoc
   ```

3. **Alternative package managers** (may be outdated):
   - macOS: `brew install pandoc`
   - Ubuntu/Debian: `sudo apt install pandoc`
   - Windows: `choco install pandoc`

4. Verify: `pandoc --version`
5. Restart terminal/VS Code

### Conversion Fails
**Error:** Pandoc reports syntax error

**Solution:**
1. Check markdown syntax (valid headings, lists, tables)
2. Verify file path is correct
3. Try conversion without template first
4. Check pandoc error message for specific issue

### Template Not Applied
**Error:** Output doesn't show custom branding

**Solution:**
1. Verify template file exists at configured path
2. Check template is ODT/ODP format (not DOCX/PPTX)
3. Test template in LibreOffice/Word to verify it opens
4. Check `src/config.yaml` template paths are correct

### Poor Slide Layout
**Error:** ODP slides look cluttered or broken

**Solution:**
1. Simplify markdown structure (use `##` for slides)
2. Reduce content per slide
3. Use horizontal rules (`---`) to control breaks
4. Test with simpler content first

### File Won't Open
**Error:** Recipient can't open ODT/ODP file

**Solution:**
1. Verify recipient has compatible software (Word 2007 SP2+, LibreOffice, Google Docs/Slides)
2. Check file size isn't corrupted (>0 bytes)
3. Try opening in different application
4. Re-convert as fallback

## Technical Details

### File Sizes
Typical output sizes:
- **Markdown:** 50-200 KB (text only)
- **ODT:** 500 KB - 5 MB (with styles and embedded images)
- **ODP:** 1-10 MB (depends on slide count and images)

### Conversion Speed
- Small documents (<10 pages): < 1 second
- Medium documents (10-50 pages): 1-5 seconds
- Large documents (>50 pages): 5-15 seconds

### Supported Markdown Elements

**✅ Fully Supported:**
- Headings (H1-H6)
- Paragraphs
- Lists (ordered, unordered, nested)
- Bold, italic, code
- Links
- Images
- Tables
- Code blocks
- Blockquotes
- Horizontal rules

**⚠️ Partial Support:**
- Syntax highlighting (depends on template)
- Complex tables (may need manual adjustment)
- Custom HTML (stripped by pandoc)

**❌ Not Supported:**
- Embedded videos (use links instead)
- Interactive elements
- Custom CSS/styling

## Resources

- **Pandoc Manual:** https://pandoc.org/MANUAL.html
- **OpenDocument Format:** https://www.oasis-open.org/committees/office/
- **LibreOffice Documentation:** https://help.libreoffice.org/
- **Template Customization:** See `{installed_path}/templates/README.md`

## Workflow Integration

### Input Conversion in Knowledge Review (Step-02)

**Automatic Document Conversion:**

When Technical Scribe scans the workspace during knowledge review:

1. **File Discovery**: Searches for binary documents (DOCX, PPTX, PDF, etc.)
2. **Conversion Check**: Verifies if markdown version exists and is current
3. **Auto-Convert**: Converts outdated or missing markdown versions
4. **Image Extraction**: Saves images to `{document}_media/` folders
5. **Integration**: Includes converted content in technical findings
6. **Caching**: Skips conversion if markdown is newer than source

**User Experience:**
```
Technical Scribe: "Found unreadable document: Architecture_v2.docx
Converting to markdown for analysis...
✅ Converted successfully: Architecture_v2.md (156 KB)
🖼️ Extracted 8 diagrams to Architecture_v2_media/
Now analyzing converted content..."
```

### Output Conversion in Completion (Step-10)

**Multi-Format Publishing:**

After document synthesis, Chief Editor:

1. **Format Check**: Reviews user's format selections from step-03
2. **Pandoc Conversion**: Converts markdown to ODT/ODP as requested  
3. **Template Application**: Uses branded templates if available
4. **File Management**: Saves all formats to output folder
5. **User Feedback**: Shows generated files with sizes and slide counts

**User Experience:**
```
Chief Editor: "Converting to requested formats...
✅ ODT Document: solution_description.odt (4.2 MB)
✅ ODP Presentation: solution_description.odp (15 slides, 2.8 MB)

📁 All formats saved to: {output_folder}/solution-descriptions/
💡 Tip: ODT and ODP files open natively in Microsoft Office"
```

### Manual Conversion Tasks

**Input Conversion Task:**
```markdown
Execute task: convert-input-document
- source_file: "reference-docs/Legacy_Spec_v1.docx"
- extract_images: true
```

**Output Conversion Task:**
```markdown
Execute task: convert-output-format  
- source_md: "solution_description.md"
- output_format: "odt"
- template: "company-template.odt"
```

### Best Practices for Document Management

**Input Documents:**
- Keep originals (DOCX/PPTX) for editing
- Version control converted markdown files
- Organize images in `{document}_media/` folders
- Convert before major workflow runs
- Batch convert using provided scripts

**Output Documents:**
- Always generate markdown (source of truth)
- Select formats based on audience needs
- Use branded templates for professional appearance
- Test template conversion before important deliveries
- Include format-specific usage instructions

---

_SDA Knowledge Base - Document Conversion v1.0.0_
