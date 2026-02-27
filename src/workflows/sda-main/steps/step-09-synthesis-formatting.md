---
name: 'step-09-synthesis-formatting'
description: 'Final synthesis, formatting, and polish (Phase 4)'
nextStepFile: './step-10-completion.md'
---

# Step 9: Synthesis & Formatting (Phase 4)

## STEP GOAL

Unify the dual-perspective document into a polished final product. Apply visual hierarchy, ensure consistent voice, add finishing touches, and prepare for delivery.

---

## EXECUTION

### 1. Phase Introduction

"**Phase 4: Synthesis & Formatting** 🧵

We have a complete, reviewed document with integrated perspectives. Now it's time for the master touch — unifying everything into a polished final product.

**Switching to Chief Editor** 🧵 — Your synthesis and formatting master.

'Hello! I'm Chief Editor, and this is where I shine. I've been watching Technical Scribe and Value Narrator collaborate, and I've seen the Review Board strengthen the document.

Now I'll:
- Ensure seamless flow between sections
- Apply professional visual hierarchy
- Unify the voice while preserving distinct perspectives
- Add polish and finishing touches
- Create the final publishable document

Let's make this beautiful.'"

### 2. Flow Analysis

"**Analyzing document flow...**

'I'm reading through the entire document to check:'

**Section Transitions:**
{Check each section transition}
- Does section X flow naturally into section Y?
- Are transitions smooth or jarring?
- Do we need bridging sentences?

**Cross-References:**
{Verify internal references}
- Links between sections accurate?
- Forward references make sense?
- Backward references don't create circular logic?

**Narrative Coherence:**
- Does the story arc hold together?
- Are main themes reinforced throughout?
- Do conclusions connect back to opening?

**Voice Consistency:**
- Tone appropriate for {primary_audience}?
- Terminology consistent (no term drift)?
- Level of formality consistent?

{Identify 3-5 flow improvements}

**Flow analysis complete.** ✅"

### 3. Visual Hierarchy

"**Applying visual hierarchy and formatting...**

'Making this document scannable and beautiful:'

**Heading Structure:**
{Analyze and fix heading levels}
- H1: Document title
- H2: Major sections
- H3: Subsections
- H4: Detailed topics
- Ensuring logical hierarchy (no H4 under H2)

**Visual Elements:**

{If Customer Primary}
**Expandable Sections:**
```markdown
<details>
<summary>📜 <b>Technical Detail:</b> {topic}</summary>

{Technical content}

</details>
```

**Callout Boxes:**
```markdown
> 💡 **Key Insight:** {insight}

> ⚠️ **Important:** {warning}

> ✅ **Benefit:** {benefit}
```

{If R&D Primary}
**Value Highlights:**
```markdown
> 🕊️ **VALUE HIGHLIGHT:** {topic}
> {Business impact}
```

**Technical Callouts:**
```markdown
> 📜 **TECHNICAL NOTE:** {note}

> ⚡ **PERFORMANCE:** {metrics}
```

**Lists and Tables:**
- Convert dense paragraphs to bullet lists where appropriate
- Create comparison tables for feature matrices
- Use numbered lists for procedures/sequences

**Code Blocks:**
- Proper language syntax highlighting
- Consistent indentation
- Inline comments where helpful

**Visual formatting applied.** ✅"

### 4. Consistency Pass

"**Ensuring consistency throughout...**

**Terminology:**
{Create terminology map and enforce}
- {subject_name}: Always capitalized? Trademarked?
- Technical terms: First use defined?
- Acronyms: Expanded on first use?
- Product names: Correct capitalization and versioning?

**Style Consistency:**
- Date formats: {standardize}
- Number formats: {standardize}
- Code examples: {consistent style}
- Links: {consistent format}

**Agent Attribution:**
{If using attribution labels}
- 📜 **TECH:** for Technical Scribe sections
- 📜 **TECH:** for Technical Scribe sections
- 🕊️ **VALUE:** for Value Narrator sections
- Consistent label format and placement

**Consistency pass complete.** ✅"

### 5. Enhancement Pass

"**Adding polish and enhancements...**

**Document Enhancements:**

**1. Table of Contents:**
{Generate from heading structure}
```markdown
## Table of Contents
- [Executive Summary](#executive-summary)
- [Solution Overview](#solution-overview)
  - [Core Capabilities](#core-capabilities)
  - [Technical Architecture](#technical-architecture)
- [Getting Started](#getting-started)
```

**2. Visual Breaks:**
- Horizontal rules between major sections: `---`
- Emoji/icons for visual scanning
- Whitespace for breathing room

**3. Metadata Header:**
```markdown
---
title: {subject_name}
type: Solution Description
audience: {primary_audience}
version: 1.0
date: {current_date}
status: Final
---
```

**4. Navigation Aids:**
- Links back to TOC from sections
- 'Next Section' hints at end of major sections
- Related section cross-references

**5. Call-to-Action:**
{Ensure strong ending}
- Clear next steps
- Contact information or resources
- Invitation to engage

**Enhancements applied.** ✅"

### 6. Quality Validation

"**Running final quality checks...**

**Validation Checklist:**

✅ **Completeness:**
- All outline sections present?
- No [TBD] or placeholder text?
- All references resolved?
- All links functional?

✅ **Accuracy:**
- Technical claims verified against {findings_report}?
- Version numbers current?
- Examples tested/valid?
- Statistics and metrics sourced?
- Review Board reader-test findings addressed?

✅ **Readability:**
- Appropriate length for audience? ({estimated_pages} pages)
- Scannable with headings and lists?
- Technical depth matches {secondary_importance}?
- Complex concepts explained clearly?

✅ **Polish:**
- No typos or grammar issues?
- Consistent formatting throughout?
- Professional appearance?
- Print/PDF-ready?

{Run through checklist, flag any issues}

{If issues found}
'Found {count} items to fix... correcting...'
{Apply fixes}

**Quality validation complete.** ✅

**Document Status:** Professional and publication-ready"

### 7. Final Synthesis

"**Creating final synthesized document...**

'I've unified the dual perspectives into one cohesive narrative. The document now:

✨ **Flows seamlessly** — Each section leads naturally to the next
📐 **Looks professional** — Visual hierarchy guides the reader
🎯 **Serves both audiences** — {primary_audience} leads, {secondary_audience} supported
🛡️ **Stands up to scrutiny** — Adversarial review hardened it
🧵 **Feels unified** — One voice, multiple perspectives

**Final Statistics:**
- Total pages (estimated): {calculate}
- Word count: {calculate}
- Sections: {count}
- Technical depth sections: {count}
- Value highlight sections: {count}
- Code examples: {count}
- Diagrams/tables: {count}

This document is ready for the world.'

**Saving final document...**

Output: `{output_folder}/solution-descriptions/{subject_name}_description.md`

**Final document saved.** ✅"

**Update workflow state:**
```yaml
synthesis_complete: true
final_document_path: '{path}'
final_word_count: {count}
final_page_count: {estimate}
```

### 8. Before/After Comparison

"**Want to see how far we've come?**

**The Journey:**

**Phase 0:** Started with just a subject definition
**Phase 1:** Gathered {count} relevant technical sources
**Phase 2:** Created integrated outline with {count} sections
**Phase 3:** Drafted {count} sections with dual perspectives
**Review Board:** Caught and fixed {count} issues
**Phase 4:** Synthesized and polished to final form

**The Result:**
A {estimated_pages}-page solution document that:
- ✅ Satisfies {primary_audience} as primary reader
- ✅ Serves {secondary_audience} with {secondary_importance} level depth
- ✅ Integrates technical accuracy AND business value
- ✅ Has been stress-tested by adversarial review
- ✅ Looks professional and polished

**From idea to publication-ready in {workflow_duration}.**"

### 9. Present Menu

**Phase 4: Synthesis Complete ✅**

**Select an Option:**
- **[C]** Continue to Completion (review final document)
- **[VD]** View final document
- **[EX]** Export to different format (PDF, HTML, etc.)
- **[ES]** Edit specific section (minor tweaks)
- **[S]** Share (copy path for sharing)
- **[X]** Exit workflow

---

## SUCCESS METRICS

✅ Document flow analyzed and improved
✅ Visual hierarchy applied
✅ Consistency enforced throughout
✅ Polish and enhancements added
✅ Quality validation passed
✅ Final synthesis complete
✅ Publication-ready document created

---

## TRANSITIONS

**Next Step:** step-10-completion.md (Final review and wrap-up)

---

_Step 9 of SDA Main Workflow — Phase 4: Synthesis & Formatting_
