---
name: 'step-06-drafting-setup'
description: 'Setup for parallel drafting phase (Phase 3)'
nextStepFile: './step-07-parallel-drafting.md'
---

# Step 6: Drafting Setup (Phase 3)

## STEP GOAL

Prepare for the parallel drafting phase where Chronicler and Envoy work simultaneously on the document, with Catalyst providing real-time coordination and conflict resolution.

---

## EXECUTION

### 1. Phase Introduction

"**Phase 3: Drafting & Review** ✍️

This is where SDA's dual-perspective approach shines. Here's what happens:

**The Drafting Team:**
- 🕊️ **{lead_drafter}** writes the primary narrative
- 📜 **{support_drafter}** adds complementary sections
- 💡 **Catalyst** coordinates and resolves tensions

**The Process:**
1. **Parallel Drafting** — Both agents work simultaneously on their sections
2. **Real-Time Cross-Review** — Agents review each other's content as it's created
3. **Creative Tension** — Productive debate strengthens the document
4. **Adversarial Audit** — Review Board stress-tests everything

**This takes 20-45 minutes.** You can watch the process unfold or return when drafting is complete.

**How would you like to proceed?**

- **[A]** Automatic mode (draft everything, show me the result)
- **[I]** Interactive mode (pause at key decision points)
- **[W]** Watch mode (stream updates as agents work)

**Your choice:**"

**Capture drafting_mode: [Automatic | Interactive | Watch]**

### 2. Drafting Parameters

"**Let me configure the drafting parameters...**

**Based on your earlier choices:**
- **Primary Audience:** {primary_audience}
- **Lead Drafter:** {lead_drafter}
- **Support Drafter:** {support_drafter}
- **Secondary Importance:** {secondary_importance}
- **Outline Sections:** {count sections from approved outline}

**Drafting Strategy:**

{If Customer Primary}
→ Envoy leads: Write compelling narrative sections
→ Chronicler supports: Add technical detail blocks
→ Style: Expandable <details> tags for technical depth

{If R&D Primary}
→ Chronicler leads: Write technical specification sections  
→ Envoy supports: Add value highlight callouts
→ Style: Callout boxes for business value

**Document Formatting:**
- Markdown with enhanced styling
- Visual hierarchy (headings, lists, callouts)
- {Expandable sections | Highlight boxes} for secondary content
- Code blocks and diagrams where appropriate

**Quality Gates:**
- Factual accuracy (Chronicler validates)
- Clarity and impact (Envoy validates)
- Logical consistency (Catalyst validates)

**These parameters look good?**

- **[Y]** Yes, begin drafting
- **[E]** Edit parameters
- **[?]** Explain something"

### 3. Section Assignment

"**Assigning sections to agents...**

{Parse approved outline and assign each section}

**{lead_drafter} will draft:**
{List primary sections}

**{support_drafter} will draft:**
{List supporting sections}

**Catalyst will coordinate:**
- Section transitions and flow
- Cross-references between sections
- Conflict resolution between agents
- Integration checkpoints

**Section assignment complete.** ✅"

### 4. Drafting Order

"**Establishing drafting order...**

**Phase 1: Foundation** (Draft first)
- Executive Summary / Overview
- Problem / Challenge sections
- Core value propositions

**Phase 2: Core Content** (Draft second)
- Main solution description
- Technical architecture / Key capabilities
- Implementation or outcomes sections

**Phase 3: Supporting Content** (Draft third)
- Deep-dive technical sections
- Use cases and examples
- Integration and deployment guides

**Phase 4: Closure** (Draft last)
- Getting Started / Next Steps
- Appendices and references

**This order ensures:**
✅ Core message is solid before details
✅ Agents can reference earlier sections
✅ Document flows naturally

**Drafting order established.** ✅"

### 5. Initialize Document

"**Initializing document structure...**

Creating: `{output_folder}/solution-descriptions/{subject_name}_description.md`

**Document Header:**
```markdown
# {subject_name}

> {subject_description}

**Status:** Draft in Progress
**Created:** {current_date}
**Primary Audience:** {primary_audience}
**Document Type:** Solution Description

---
```

**Document skeleton created with approved outline structure.**

**Ready to begin parallel drafting!**"

**Create initial document file with frontmatter and outline skeleton.**

**Update workflow state:**
```yaml
drafting_phase: 'initialized'
document_path: '{output_path}'
sections_completed: []
```

### 6. Pre-Drafting Briefing

"**Quick briefing before we start...**

**What you'll see:**
{If Automatic mode}
- Periodic progress updates
- Notifications when sections complete
- Final review prompt when done

{If Interactive mode}
- Pause after each major section
- Approval or feedback requests
- Decision points for direction

{If Watch mode}
- Real-time updates as agents draft
- Visible debate and cross-review
- Section-by-section progress stream

**If tensions arise:**
When Chronicler and Envoy disagree (e.g., "We can't promise that performance" vs "Customers need concrete numbers"), Catalyst will:
1. Present both perspectives
2. Ask you to weigh in OR
3. Find a compromise formulation

**This is normal and productive** — it's how we catch overstatements and undersells.

**Any questions before we begin?**"

**Answer questions or continue.**

### 7. Present Menu

**Ready to Start Drafting ✍️**

**Select an Option:**
- **[D]** Begin drafting now
- **[M]** Change drafting mode
- **[VO]** View outline one more time
- **[P]** Pause / take a break (save progress)
- **[X]** Exit workflow

---

## SUCCESS METRICS

✅ Drafting mode selected (Auto/Interactive/Watch)
✅ Drafting parameters configured
✅ Sections assigned to appropriate agents
✅ Drafting order established
✅ Document initialized with skeleton
✅ User ready to proceed

---

## TRANSITIONS

**Next Step:** step-07-parallel-drafting.md (Phase 3 - The main event!)

---

_Step 6 of SDA Main Workflow — Phase 3: Drafting Setup_
