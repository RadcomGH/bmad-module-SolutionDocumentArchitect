---
name: 'step-01-load-document'
description: 'Load document and configure review parameters'
nextStepFile: './step-02-adversarial-review.md'
---

# Step 1: Load Document

## STEP GOAL

Load the document to be reviewed and configure review parameters.

---

## EXECUTION

### 1. Welcome

"**Welcome to Review-Only Mode!** 🔍

I'm here to provide rigorous adversarial review of your solution document. Think of this as a stress test before your document faces real scrutiny from customers and R&D teams.

The Review Board (Client-Advocate + Product-Guard) will challenge your document from opposing perspectives to catch blind spots.

Ready?"

### 2. Document Source

"**Where is the document you want reviewed?**

Options:
1. **File path** — Provide absolute or relative path to document
2. **Paste content** — Paste the document content directly
3. **Workspace search** — I'll search for solution documents

Which option?"

**Handle input:**

**IF File Path:**
- Attempt to read file at path
- Verify file exists and is readable
- Load document content

**IF Paste Content:**
- "Please paste the document content below (can be multiple messages):"
- Accept document content
- Confirm: "Got it. {X} words loaded."

**IF Workspace Search:**
- Search `{output_folder}/solution-descriptions/` for .md files
- List available documents with dates
- User selects from list
- Load selected document

### 3. Document Analysis

Quick analysis:

"**Document loaded:** {title/filename}

**Quick Analysis:**
- Length: {word count} words / {page estimate} pages
- Structure: {sections found}
- Technical depth: {initial assessment}
- Business value content: {initial assessment}
"

### 4. Review Focus

"**What should the Review Board focus on?**

Options:
1. **Full Review** → Both customer clarity AND technical accuracy (recommended)
2. **Customer Focus** → Client-Advocate only (clarity, understanding, value)
3. **Technical Focus** → Product-Guard only (accuracy, feasibility, roadmap)
4. **Targeted** → Specific sections or concerns

Select review focus:"

**Capture review_focus setting.**

### 5. Severity Threshold

"**How critical should we be?**

- **Rigorous** → Flag every issue, no matter how small (recommended for high-stakes documents)
- **Balanced** → Focus on medium-to-critical issues (recommended for most documents)
- **Critical Only** → Only showstopper issues that must be fixed

Select threshold:"

**Capture severity_threshold setting.**

### 6. Review Context

"**Any context I should know?**

- Audience for this document? (internal R&D, customer-facing, executive, etc.)
- Stakes? (RFP response, internal doc, marketing material, etc.)
- Specific concerns you have?

Share context or type 'none':"

**Capture context if provided.**

### 7. Configuration Summary

"**Review Configuration:**

- **Document:** {filename}
- **Length:** {words} words
- **Review Focus:** {full/customer/technical/targeted}
- **Severity:** {rigorous/balanced/critical-only}
- **Context:** {context or 'general review'}

**Review Board Activated:**
- ✅ Client-Advocate (Professional Skeptic) {if customer focus included}
- ✅ Product-Guard (R&D Defender) {if technical focus included}

Ready to begin adversarial review?"

### 8. Present Menu

**Select an Option:**
- **[C]** Continue to Review
- **[A]** Adjust configuration
- **[X]** Cancel

**Handle input:**
- IF C: Load `{nextStepFile}`
- IF A: Return to review focus or severity threshold
- IF X: "Review cancelled. No report generated."
- ELSE: Clarify and redisplay menu

---

## SUCCESS METRICS

✅ Document loaded successfully
✅ Review parameters configured
✅ User understands what review will cover
✅ Ready to proceed to adversarial review

---

_Step 1 of Review-Only Mode Workflow_