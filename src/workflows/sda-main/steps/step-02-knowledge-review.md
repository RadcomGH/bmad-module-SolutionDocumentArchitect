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

### 1. Switch to Chronicler

"**Switching to Chronicler** 📜 — Your technical integrity guardian.

'I'm Chronicler. My job is to scan your workspace and extract the technical reality that exists in code, specifications, and notes. I'll create a findings report so we're documenting what actually exists, not what we wish existed.

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

### 3. Execute Workspace Scan

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

### 4. Findings Report

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

### 5. Knowledge Validation

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

### 6. Save Findings Report

"**Saving Technical Findings Report...**

Output: `{output_folder}/solution-descriptions/{subject_name}_findings.md`

This report will guide our documentation to stay grounded in technical reality."

**Create findings report file with scan results.**

### 7. Present Menu

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
