---
name: 'step-02-knowledge-review'
description: 'Scan workspace for relevant technical content (Phase 1)'
nextStepFile: './step-03-audience-configuration.md'
---

# Step 2: Knowledge Review (Phase 1)

## STEP GOAL

Discover and summarize existing technical knowledge in the workspace (code, specs, notes) that's relevant to the solution being documented.

---

## EXECUTION

### 1. Switch to Technical Scribe

"**Switching to Technical Scribe** 📜 — Your technical integrity guardian.

'I'm Technical Scribe. My job is to scan your workspace and extract the technical reality that exists in code, specifications, and notes. I'll create a findings report so we're documenting what actually exists, not what we wish existed.

This prevents documentation from drifting into fantasy.'"

### 2. Workspace Scan Setup

"**Let's scan your workspace for relevant content.**

I'll search for:
- Technical specifications and architecture docs
- Code signatures and implementation details  
- API definitions and interfaces
- Previous solution descriptions
- Configuration files and schemas

**Search scope:** `{project-root}/` (recursive)

**Based on your subject: '{subject_name}'**

What keywords or patterns should I prioritize in my search?

Examples:
- Technology names: 'redis', 'kafka', 'elasticsearch'
- Feature names: 'smartcache', 'preload', 'prediction'
- Component names: 'CacheManager', 'PreloadEngine'

**Enter keywords (comma-separated), or [S] to use defaults:**"

**Capture user keywords or use defaults from subject_name.**

### 3. Document Conversion Check

"**Checking for documents that need conversion...**

Before scanning, I'll convert any unreadable documents to markdown so I can analyze them.

Looking for: DOCX, PPTX, PDF, RTF files in workspace..."

**Execute file_search:**
- Pattern: `**/*.{docx,pptx,pdf,rtf,doc,ppt,odt,odp}`
- Search workspace for binary documents

**For each binary document found:**

"**Found:** `{document_path}`

Checking if converted version exists: `{document_path_without_ext}.md`..."

**If .md version does NOT exist or is older than source:**

"Converting `{document_name}` to markdown for analysis...

**Execute task: convert-input-document**
- source_file: `{document_path}`
- output_path: `{document_path_without_ext}.md`
- extract_images: true

**Result:**
- ✅ Converted: `{document_name}.md` ({file_size} KB)
- 🖼️ Images: {image_count} extracted to `{document_name}_media/`
- 📊 Now available for technical analysis"

**If .md version exists and is current:**

"✅ **Already converted:** `{document_name}.md` (up to date)"

**If conversion fails:**

"⚠️ **Conversion failed:** `{document_name}`

**Error:** {error_message}

**Troubleshooting:**
- Verify pandoc is installed: `pandoc --version`
- Check if file is password-protected
- See task documentation: convert-input-document.md

**Impact:** This document will be skipped in analysis. You can convert it manually later."

**Summary after checking all documents:**

"**Document Conversion Summary:**
- ✅ Converted: {converted_count} documents
- ✅ Already current: {current_count} documents  
- ⚠️ Failed: {failed_count} documents
- 📄 Total markdown files ready: {total_md_count}

All available documents are now in readable format for analysis."

### 4. Execute Workspace Scan

"**Scanning workspace...**

Using `grep_search` to find relevant content..."

**Execute grep_search with user keywords:**
- Search pattern: {keywords}
- Include patterns: \*.md, \*.ts, \*.py, \*.js, \*.java, \*.go, \*.rs, \*.yaml, \*.json
- Max results: 50

**Execute file_search for common doc patterns:**
- spec\*, architecture\*, design\*, api\*, readme\*, \*{subject_name}\*

**Present scan progress:**
"Found {N} files mentioning your keywords..."

### 5. Findings Report

"**Technical Findings Report**

I've analyzed {N} relevant files from your workspace. Here's what I found:

**Existing Documentation:**
{List any specs, architecture docs, READMEs found}

**Code Signatures:**
{List relevant classes, functions, APIs discovered}

**Technical Components:**
{Summarize key technical elements}

**Gaps Identified:**
{Note what's NOT documented that should be}

**Key Files for Reference:**
{Top 5-10 most relevant file paths}

---

**Assessment:** [Comprehensive | Adequate | Sparse | Minimal]

**Recommendation:**
{Suggest if we have enough technical grounding, or if user should provide more context}

---

**Review this report. Are we capturing the right technical reality?**

- **[Y]** Yes, this is accurate
- **[M]** Missing something (what should I look for?)
- **[C]** Code/files aren't in this workspace (I'll provide context manually)"

**Engage in dialogue to refine findings.**

### 6. Knowledge Validation

"**Is this technical reality accurate and complete?**

Questions to consider:
- Are we missing new features not yet in docs?
- Are there v2 API transitions I should know about?
- Any deprecated components I should avoid referencing?
- Critical constraints or dependencies not captured?

**Anything to add or correct?**"

**Capture user corrections and additions.**

**Update workflow state:**
```yaml
knowledge_validated: true
technical_findings: '{summary}'
key_reference_files: []
```

### 7. Save Findings Report

"**Saving Technical Findings Report...**

Output: `{output_folder}/solution-descriptions/{subject_name}_findings.md`

This report will guide our documentation to stay grounded in technical reality."

**Create findings report file with scan results.**

### 8. Present Menu

**Phase 1: Knowledge Review Complete ✅**

**Select an Option:**
- **[C]** Continue to Audience Configuration
- **[RS]** Re-run scan with different keywords
- **[VF]** View findings report
- **[X]** Exit workflow

---

## SUCCESS METRICS

✅ Workspace scanned for relevant content
✅ Technical findings summarized
✅ User validates accuracy and completeness
✅ Knowledge gaps identified
✅ Findings report saved
✅ workflow_state.knowledge_validated = true

---

## TRANSITIONS

**Next Step:** step-03-audience-configuration.md (Phase 1 continued)

---

_Step 2 of SDA Main Workflow — Phase 1: Knowledge Review_
