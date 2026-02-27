# SDA Document Templates

This directory contains OpenDocument templates for converting solution documents to ODT (text documents) and ODP (presentations).

## Templates

### solution-document-template.odt
OpenDocument Text template for solution documents.
- Opens in: Microsoft Word, LibreOffice Writer, Google Docs
- Use for: Full solution documents, architecture docs, proposals

### solution-presentation-template.odp
OpenDocument Presentation template for solution presentations.
- Opens in: Microsoft PowerPoint, LibreOffice Impress, Google Slides
- Use for: Executive summaries, pitch decks, slide presentations

## Customizing Templates

Templates allow you to brand documents with your organization's styles, colors, fonts, and logos.

### Editing ODT Templates (Documents)

1. **Open the template** in LibreOffice Writer or Microsoft Word:
   ```bash
   # LibreOffice
   libreoffice solution-document-template.odt
   
   # Microsoft Word (macOS/Windows)
   open solution-document-template.odt
   ```

2. **Customize styles:**
   - **Heading styles** (Format → Styles → Heading 1, 2, 3...)
   - **Paragraph styles** (Format → Styles → Body Text)
   - **Table styles** (Format → Styles → Table)
   - **Colors** (Format → Styles → modify colors)
   - **Fonts** (Format → Styles → modify fonts)

3. **Add branding:**
   - Insert company logo in header/footer
   - Set company colors
   - Add watermarks if needed
   - Configure page margins and sizes

4. **Save as ODT:**
   - File → Save As → OpenDocument Text (.odt)
   - **Critical:** Must save as ODT, not DOCX
   - Place saved file in this templates directory

### Editing ODP Templates (Presentations)

1. **Open the template** in LibreOffice Impress or Microsoft PowerPoint:
   ```bash
   # LibreOffice
   libreoffice solution-presentation-template.odp
   
   # Microsoft PowerPoint (macOS/Windows)
   open solution-presentation-template.odp
   ```

2. **Customize slide layouts:**
   - **Master slides** (View → Slide Master)
   - **Title slide layout**
   - **Content slide layouts**
   - **Section divider layouts**
   - **Colors and fonts** (Format → Slide Design)

3. **Add branding:**
   - Insert company logo on master slides
   - Set company color scheme
   - Configure slide backgrounds
   - Add footer with company name/copyright

4. **Save as ODP:**
   - File → Save As → OpenDocument Presentation (.odp)
   - **Critical:** Must save as ODP, not PPTX
   - Place saved file in this templates directory

## How Templates Are Used

When SDA converts markdown to ODT/ODP:

1. **Styles from template are applied** to converted content
2. **Headings, paragraphs, lists** inherit template formatting
3. **Colors and fonts** match your template
4. **Headers/footers** appear on all pages
5. **Company branding** appears automatically

## Template Files

Currently, placeholder templates are provided. To create production templates:

1. Create a well-formatted document/presentation in LibreOffice or Word/PowerPoint
2. Apply all desired styles, colors, fonts, and branding
3. Save as ODT/ODP format
4. Copy to this directory with the exact filenames:
   - `solution-document-template.odt`
   - `solution-presentation-template.odp`

## Using Templates Without Customization

If no custom templates exist, pandoc uses its default styles. The conversion still works, but documents won't have your branding.

To skip templates entirely, agents can omit the `template` parameter when calling the conversion task.

## Testing Templates

After customizing templates, test them:

1. Create a simple markdown document
2. Run conversion task with your template
3. Open the resulting ODT/ODP file
4. Verify styles, colors, fonts, and branding appear correctly
5. Make adjustments to template as needed

## Best Practices

✅ **Use ODT/ODP formats** - Required for pandoc compatibility
✅ **Test before deploying** - Verify template works with real content
✅ **Keep it simple** - Overly complex templates may not convert well
✅ **Use standard styles** - Heading 1, Heading 2, Body Text, etc.
✅ **Version control** - Keep backup copies of working templates

❌ **Don't use DOCX/PPTX** - Pandoc requires ODT/ODP as reference templates
❌ **Don't over-style** - Complex formatting may not survive conversion
❌ **Don't embed macros** - Macros won't work in pandoc conversion

## Resources

- **Pandoc documentation:** https://pandoc.org/MANUAL.html#option--reference-doc
- **LibreOffice styles:** https://help.libreoffice.org/latest/en-US/text/swriter/guide/styles.html
- **ODT format spec:** https://en.wikipedia.org/wiki/OpenDocument

---

_SDA Module Template Guide - v1.0.0_
