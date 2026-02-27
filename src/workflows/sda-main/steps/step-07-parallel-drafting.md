---
name: 'step-07-parallel-drafting'
description: 'Parallel drafting by Technical Scribe and Value Narrator with real-time cross-review (Phase 3)'
nextStepFile: './step-08-adversarial-review.md'
---

# Step 7: Parallel Drafting (Phase 3)

## STEP GOAL

Execute the dual-perspective drafting process where Technical Scribe and Value Narrator work simultaneously, with Solution Consultant coordinating and resolving creative tensions that arise.

---

## EXECUTION

### 1. Begin Drafting

"**Drafting begins now!** ✍️

{If Automatic mode}
Working through all sections... I'll update you on progress.

{If Interactive mode}
We'll pause after each major section for your review.

{If Watch mode}
Streaming the drafting process in real-time...

---

**Let's start with the foundation sections...**"

### 2. Drafting Phase 1 — Foundation

**SECTION: Executive Summary / Overview**

{If Customer Primary - Value Narrator leads}
"**Value Narrator drafting:** Executive Summary

'Let me craft an opening that hooks the reader and makes them care about this solution...

{Generate 2-3 paragraph executive summary}
- The Challenge: {problem_statement from subject definition}
- The Insight: {key_insight}
- The Solution: {subject_name} overview
- The Impact: {primary_beneficiaries and outcomes}

Done. Technical Scribe, your technical review?'"

{If R&D Primary - Technical Scribe leads}
"**Technical Scribe drafting:** Technical Overview

'Creating a precise technical summary that architects can scan quickly...

{Generate technical overview}
- System Classification: {type and category}
- Core Architecture: {high-level design}
- Key Components: {list from findings}
- Technical Capabilities: {performance, scale, integration}

Done. Value Narrator, does this communicate value?'"

**Cross-Review:**

"**{support_drafter} reviewing:**

'{Provide feedback on lead's draft}
- Accuracy check: {any technical corrections needed}
- Clarity check: {any communication improvements}
- Balance: {suggest additions for secondary audience}'

**Solution Consultant coordinating:**

{If significant disagreement}
'I'm seeing tension between {issue}. Let me help resolve this...'

{Present both views and either:}
- Ask user to decide
- Propose compromise
- Suggest section restructuring

{If minor issues}
'{lead_drafter}, incorporate {support_drafter}'s feedback on {specific point}.'

**Section complete:** ✅ Executive Summary"

{Update document file with completed section}

{If Interactive mode: Pause for user review}
"**Review checkpoint:** Executive Summary complete.

{Display section content}

**Your feedback:**
- **[A]** Approved, continue
- **[E]** Edit (what should change?)
- **[R]** Rewrite this section

**Your choice:**"

### 3. Drafting Phase 2 — Core Content

"**Moving to core content sections...**"

**FOR EACH MAIN SECTION in the approved outline:**

**SECTION: {section_name}**

{Determine which agent leads based on outline assignments}

"**{lead_agent} drafting:** {section_name}

'{Agent-specific voice and approach}

{Generate section content based on:}
- Approved outline structure
- Subject definition details
- Technical findings report
- Audience configuration
- Agent's perspective and style'

{Draft 3-8 paragraphs with appropriate formatting}

Done. {support_agent}, your review?"

**Cross-Review:**

"**{support_agent} reviewing:**

'{Provide perspective-specific feedback}

{If Technical Scribe reviewing Value Narrator:}
- Technical accuracy: {verify claims}
- Missing context: {suggest technical details needed}
- Oversimplification: {flag where nuance matters}

{If Value Narrator reviewing Technical Scribe:}
- Clarity: {identify jargon or unclear explanations}
- Value connection: {suggest impact statements}
- Audience mismatch: {flag overly technical language}

{Flag any contradictions with earlier sections}'"

**Solution Consultant Coordination:**

{If significant tension:}
"**Solution Consultant:** 'We have a disagreement here.

**Technical Scribe says:** '{technical constraint or accuracy concern}'

**Value Narrator says:** '{customer need or clarity concern}'

**The issue:** {describe the conflict}

**Options:**
1. {Compromise formulation}
2. {Split into main text + detail section}
3. {User decides the priority}

**What should we do?**'

{Handle resolution}

{If minor issues:}
"**Solution Consultant:** '{lead_agent}, please update based on {support_agent}'s point about {specific issue}.'

**Section complete:** ✅ {section_name}"

{Update document file}

{If Interactive mode: Pause for review every 2-3 sections}

### 4. Drafting Phase 3 — Supporting Content

"**Adding supporting content and depth...**"

{Process technical deep-dives, use cases, implementation guides}

{If Customer Primary:}
**Format technical sections as expandable:**
```markdown
<details>
<summary>📜 <b>Technical Detail:</b> {section_name}</summary>

{Technical Scribe's technical content}

</details>
```

{If R&D Primary:}
**Format business sections as callouts:**
```markdown
> 🕊️ **VALUE HIGHLIGHT:** {section_name}
>
> {Value Narrator's business value content}
```

{Follow same pattern: draft → cross-review → coordinate → complete}

### 5. Drafting Phase 4 — Closure

"**Wrapping up with closure sections...**"

**SECTION: Getting Started / Next Steps / Path Forward**

"**{lead_drafter} drafting:** Getting Started

'{Create actionable next steps that serve primary audience}

{If Customer Primary}
- How to evaluate {subject_name}
- How to request a demo or pilot
- Resources for learning more
- Contact information

{If R&D Primary}
- How to access/install
- Configuration quick start
- Integration checklist
- Support resources

Done.'"

"**{support_drafter} reviewing:** Adding {secondary perspective}...

**Section complete:** ✅ Getting Started"

{Update document file}

### 6. Drafting Complete

"**All sections drafted!** ✅

**Drafting Statistics:**
- Total sections: {count}
- Pages (estimated): {calculate}
- {lead_drafter} sections: {count}
- {support_drafter} sections: {count}
- Tensions resolved: {count}
- Collaborative refinements: {count}

**Document Status:** Draft complete, ready for Review Board

**Quick quality check:**
✅ All outline sections covered
✅ Both perspectives integrated
✅ Cross-references validated
✅ Formatting applied
✅ No contradictions between sections

**Saving complete draft...**

Output: `{output_folder}/solution-descriptions/{subject_name}_description_DRAFT.md`"

**Update workflow state:**
```yaml
drafting_phase: 'complete'
sections_completed: [all sections list]
ready_for_review: true
```

### 7. Present Menu

**Phase 3: Drafting Complete ✅**

**Select an Option:**
- **[C]** Continue to Adversarial Review (Review Board audit)
- **[RD]** Read full draft
- **[ES]** Edit specific section
- **[S]** Save and pause (resume later)
- **[X]** Exit workflow

---

## SUCCESS METRICS

✅ All outline sections drafted
✅ Lead and support drafters collaborated
✅ Cross-review performed on all sections
✅ Creative tensions resolved productively
✅ Both perspectives integrated
✅ Document formatted appropriately
✅ Complete draft saved

---

## TRANSITIONS

**Next Step:** step-08-adversarial-review.md (Phase 3 - Review Board)

---

## IMPLEMENTATION NOTES

**Drafting Logic:**
- Process outline sections in order (foundation → core → supporting → closure)
- Assign each section to lead or support drafter based on outline
- After each section: draft → cross-review → coordinate → update file
- Track tensions and resolutions for learning
- Pause for Interactive mode at configured checkpoints

**Creative Tension Examples:**
- "We can't promise sub-millisecond latency" (Technical Scribe) vs "Customers need concrete performance numbers" (Value Narrator)
- "This explanation is too technical for business readers" (Value Narrator) vs "We can't oversimplify the architecture" (Technical Scribe)
- Resolution: Compromise formulations, layered content, or user decision

---

_Step 7 of SDA Main Workflow — Phase 3: Parallel Drafting_
