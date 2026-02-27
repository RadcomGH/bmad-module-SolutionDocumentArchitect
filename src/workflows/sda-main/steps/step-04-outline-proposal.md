---
name: 'step-04-outline-proposal'
description: 'Create integrated outline from dual perspectives (Phase 2)'
nextStepFile: './step-05-outline-approval.md'
---

# Step 4: Outline Proposal (Phase 2)

## STEP GOAL

Generate an integrated table of contents that serves both audiences. Value Narrator proposes the "Narrative Arc" (value story), Technical Scribe proposes the "Technical Skeleton" (system structure), then merge both into a unified outline.

---

## EXECUTION

### 1. Phase Introduction

"**Phase 2: Outline Creation** 📋

Before drafting the full document, we need agreement on structure. This prevents wasted effort and ensures both perspectives are properly integrated.

**The Process:**
1. Value Narrator proposes the narrative arc (the story)
2. Technical Scribe proposes the technical skeleton (the structure)
3. We merge both into one integrated outline
4. You approve (or refine) the plan

Let's begin..."

### 2. Value Narrator's Narrative Arc

"**Switching to Value Narrator** 🕊️ — Your business value translator.

'Hello! Based on the subject definition and audience configuration, here's the narrative arc I propose:

---

## Value Narrator's Narrative Arc

**Document Purpose:** {derived from subject and primary_audience}

**Storytelling Structure:**

{If Customer Primary}
**1. The Challenge** — What problem exists today?
**2. The Insight** — What makes our approach different?
**3. The Solution** — How does {subject_name} work? (high-level)
**4. The Outcomes** — What results can you expect?
**5. The Path Forward** — How to get started / next steps

{If R&D Primary}
**1. Executive Summary** — Value proposition in 2 paragraphs
**2. Business Context** — Why this matters strategically
**3. Key Benefits** — Quantified value (performance, cost, time)
**4. Use Cases** — Real-world application scenarios
**5. ROI Considerations** — TCO, competitive advantages

---

**Key Value Propositions to Emphasize:**
{List 3-5 value points from subject definition}

**Narrative Tone:** {Solution Designer | Pragmatic | Educational} based on {subject_state}

This arc ensures readers understand WHY this solution matters before diving into HOW it works.'

**Value Narrator's proposal captured.**"

### 3. Technical Scribe's Technical Skeleton

"**Switching to Technical Scribe** 📜 — Your technical architect.

'Now for the technical skeleton. Here's the structural framework I propose:

---

## Technical Scribe's Technical Skeleton

**Document Purpose:** Technical specification for {subject_name}

**Architectural Structure:**

{If R&D Primary}
**1. System Overview** — High-level architecture diagram
**2. Core Components** — {List key components from findings}
**3. Component Interactions** — Data flow, APIs, protocols
**4. Implementation Details** — {Language/framework specific}
**5. Configuration & Deployment** — Setup, scaling, operations
**6. Security & Compliance** — Auth, encryption, audit trails
**7. Performance Characteristics** — Benchmarks, limits, trade-offs
**8. Integration Patterns** — How to integrate with {subject}

{If Customer Primary}
**Technical Depth Sections (expandable):**
- Architecture Overview
- Key Components & Their Roles
- Integration Points & APIs
- Security Model
- Performance & Scale

---

**Technical Accuracy Requirements:**
{List critical technical elements from findings report}

**Terminology Standards:**
{Note any specific technical terms that must be used precisely}

This skeleton ensures technical reviewers can validate correctness and feasibility.'

**Technical Scribe's proposal captured.**"

### 4. Integrated Outline Generation

"**Now let's merge both perspectives into one integrated outline...**

**Thinking through the integration:**
- Which sections flow naturally together?
- Where does technical depth enhance the narrative?
- How do we avoid duplication while serving both audiences?

---

## Integrated Outline: {subject_name}

{If Customer Primary}
**1. Executive Summary**
   - The Challenge (Value Narrator)
   - The Solution (Value Narrator + Technical Scribe high-level)
   - Key Benefits (Value Narrator)

**2. Solution Overview**
   - How {subject} Works (Value Narrator narrative)
   - 📜 **Technical Detail:** Architecture Overview (Technical Scribe - expandable)

**3. Core Capabilities**
   {For each major capability}
   - Capability Description (Value Narrator)
   - 📜 **Technical Detail:** Implementation (Technical Scribe - expandable)

**4. Value & Outcomes**
   - Business Impact (Value Narrator)
   - Use Cases (Value Narrator + Technical Scribe examples)
   - 📜 **Technical Detail:** Performance Characteristics (Technical Scribe)

**5. Technical Foundation**
   - 📜 Components & Architecture (Technical Scribe)
   - 📜 Integration & APIs (Technical Scribe)
   - 📜 Security Model (Technical Scribe)

**6. Getting Started**
   - Implementation Path (Value Narrator + Technical Scribe)
   - Next Steps (Value Narrator)

{If R&D Primary}
**1. Overview**
   - Technical Summary (Technical Scribe)
   - 🕊️ **Business Context:** Why This Matters (Value Narrator callout)
   - Architecture Diagram (Technical Scribe)

**2. System Architecture**
   - Core Components (Technical Scribe)
   - Component Interactions (Technical Scribe)
   - 🕊️ **Value Highlight:** Key Benefits (Value Narrator callout)

**3. Component Deep-Dive**
   {For each major component}
   - Technical Specification (Technical Scribe)
   - Implementation Details (Technical Scribe)
   - 🕊️ **Use Case:** Where This Shines (Value Narrator callout)

**4. Implementation Guide**
   - Configuration (Technical Scribe)
   - Deployment (Technical Scribe)
   - Integration Patterns (Technical Scribe)

**5. Operations & Performance**
   - Performance Characteristics (Technical Scribe)
   - Scaling Considerations (Technical Scribe)
   - 🕊️ **ROI Impact:** Cost & Efficiency Gains (Value Narrator)

**6. Security & Compliance**
   - Security Model (Technical Scribe)
   - Compliance Considerations (Technical Scribe)

**7. Appendices**
   - 🕊️ Executive Summary (Value Narrator - 1 page)
   - API Reference (Technical Scribe)
   - Configuration Examples (Technical Scribe)

---

**Outline Notes:**
- 📜 = Technical Scribe-led section (technical depth)
- 🕊️ = Value Narrator-led section (business value)
- Expandable = Can be <details> block for Customer Primary docs
- Callout = Highlighted box for R&D Primary docs

**Estimated Length:** {6-12 | 12-20 | 20-30} pages depending on {secondary_importance}"

### 5. Present Integrated Outline

"**Here's the integrated outline that serves both audiences.**

{Display the outline generated above}

**This outline:**
✅ Serves {primary_audience} as the primary reader
✅ Provides {secondary_importance} level content for {secondary_audience}
✅ Integrates both narrative arc and technical skeleton
✅ Specifies which agent drafts which section

**Review this outline.**"

### 6. Save Proposed Outline

**Chief Editor:**

"**Saving proposed outline for review...**

Output: `{output_folder}/solution-descriptions/{subject_name}_outline.md`

**Outline Structure:**
- Audience focus: {primary_audience} primary, {secondary_audience} {secondary_importance}
- Section count: {count}
- Estimated length: {6-12 | 12-20 | 20-30} pages
- Agent assignments documented
- Narrative arc and technical skeleton integrated

*This outline will guide the drafting phase and ensure both agents collaborate effectively.*"

**Create file:** `{output_folder}/solution-descriptions/{subject_name}_outline.md`

**Content:**
```markdown
# Outline Proposal: {subject_name}

## Audience Configuration
- **Primary Audience:** {primary_audience}
- **Secondary Audience:** {secondary_audience} ({secondary_importance})
- **Estimated Length:** {6-12 | 12-20 | 20-30} pages

## Integrated Outline

{Display the outline with:}
- Section numbers and titles
- Content descriptions
- Agent assignments (VN/TS)
- Audience served per section

## Value Narrator's Narrative Arc
{Copy Value Narrator's proposed arc}

## Technical Scribe's Technical Skeleton
{Copy Technical Scribe's proposed skeleton}

## Integration Notes
{How the two perspectives were integrated}
{Any adjustments made to balance both viewpoints}

---
*Generated: {timestamp}*
*Workflow: SDA Main — Step 04: Outline Proposal*
```

### 7. Present Menu

**Select an Option:**
- **[A]** Approve outline → Continue to Phase 3 (Drafting)
- **[R]** Refine outline (what should change?)
- **[AS]** Add section (what's missing?)
- **[RS]** Remove section (what's unnecessary?)
- **[RG]** Regenerate outline (try different approach)
- **[X]** Exit workflow

---

## SUCCESS METRICS

✅ Value Narrator's narrative arc proposed
✅ Technical Scribe's technical skeleton proposed
✅ Integrated outline generated
✅ Both perspectives properly represented
✅ Sections assigned to appropriate agents
✅ User ready to review outline

---

## TRANSITIONS

**Next Step:** step-05-outline-approval.md (Phase 2 continued)

---

_Step 4 of SDA Main Workflow — Phase 2: Outline Proposal_
