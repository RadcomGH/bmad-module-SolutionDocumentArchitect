---
name: 'step-05-outline-approval'
description: 'Review, refine, and approve the integrated outline (Phase 2)'
nextStepFile: './step-06-drafting-setup.md'
---

# Step 5: Outline Approval (Phase 2)

## STEP GOAL

Get user approval on the integrated outline before proceeding to drafting. Allow refinements and iterations until the structure is solid.

---

## EXECUTION

### 1. Outline Review Prompt

"**Let's finalize the outline before drafting.**

Take a moment to review the integrated outline. Consider:

**Completeness:**
- Does it cover everything important about {subject_name}?
- Are any critical aspects missing?

**Flow:**
- Does the structure make logical sense?
- Will readers progress naturally through the content?

**Balance:**
- Is the {primary_audience} perspective properly emphasized?
- Does {secondary_audience} get appropriate coverage?

**Clarity:**
- Are section titles clear and descriptive?
- Do you know what content belongs in each section?

**What do you think?**"

### 2. Handle User Response

**Listen for:**
- Approval signals: "looks good", "approved", "let's go", "yes"
- Refinement requests: "can we add", "move X before Y", "remove section Z"
- Confusion: "what goes in section X?", "why is Y here?"
- Regeneration: "try a different approach", "this doesn't work"

**Route appropriately:**

#### If APPROVED:
→ Go to Section 6 (Finalize and Continue)

#### If REFINEMENT REQUESTED:
→ Go to Section 3 (Refinement)

#### If CONFUSED:
→ Go to Section 4 (Clarification)

#### If REGENERATION:
→ Go to Section 5 (Regenerate)

### 3. Outline Refinement

"**Let's refine the outline.**

**What would you like to change?**

Common refinements:
- **Add section:** "Add a 'Migration Guide' section"
- **Remove section:** "Remove the compliance section"
- **Move section:** "Move 'Getting Started' before 'Technical Foundation'"
- **Rename section:** "Change 'Core Capabilities' to 'Key Features'"
- **Split section:** "Split 'Implementation' into 'Setup' and 'Configuration'"
- **Merge sections:** "Combine 'Security' and 'Compliance'"

**Describe the change(s):**"

**Process user requests:**
- Parse the requested changes
- Update the outline accordingly
- Show the updated outline
- Ask: "Does this look better?"

**Loop until satisfied or user chooses to:**
- **[A]** Approve current version
- **[C]** Continue refining
- **[RG]** Regenerate completely

### 4. Section Clarification

"**Which section would you like clarified?**

I can explain:
- What content will go in that section
- Why it's placed where it is
- Which agent will draft it
- How it connects to other sections

**Enter section name or number:**"

**Provide detailed explanation based on section.**

**Example:**
"**Section 3.2: Technical Detail - Implementation**

This section will contain:
- Specific code patterns or pseudocode
- Architecture diagrams showing component relationships
- Technology stack details (languages, frameworks, libraries)
- Data flow and processing pipeline explanation

**Why here:** It provides technical depth for the capability described in Section 3 without interrupting the main narrative flow.

**Who drafts:** Chronicler leads this section, ensuring technical accuracy.

**Connection:** This expands on concepts introduced in the parent section '3. Core Capabilities'.

**Any other sections to clarify?**"

**Loop until clear, then:**
- **[A]** Approve outline
- **[R]** Refine outline
- **[C]** Clarify another section

### 5. Regenerate Outline

"**Let's try a different approach.**

What's not working with the current outline?
- Wrong emphasis or balance?
- Flow doesn't make sense?
- Missing the mark on audience needs?
- Too long/short?
- Different structure needed?

**Tell me what to change in the regeneration:**"

**Capture feedback, then:**

"**Regenerating with new approach...**

{Apply user feedback to generation logic}

**New Integrated Outline:**

{Generate fresh outline incorporating feedback}

**Is this better?**"

**Return to Section 2 (Handle User Response)**

### 6. Finalize and Continue

"**Outline Approved! ✅**

**Final Outline for {subject_name}:**

{Display approved outline}

---

**Saving outline...**

Output: `{output_folder}/solution-descriptions/{subject_name}_outline.md`

---

**Next up: Phase 3 - Drafting & Review**

This is where the magic happens:
- {lead_drafter} drafts the main sections
- {support_drafter} adds complementary content
- Agents engage in real-time review and debate
- Client-Advocate and Product-Guard provide adversarial audit

Estimated time: {20-45 minutes} depending on document length.

**Ready to begin drafting?**"

**Update workflow state:**
```yaml
outline_approved: true
outline_content: '{full outline text}'
```

### 7. Present Menu

**Phase 2: Complete ✅**

**Select an Option:**
- **[C]** Continue to Phase 3 (Drafting)
- **[VO]** View saved outline file
- **[E]** Edit outline one more time
- **[X]** Exit workflow (save progress)

---

## SUCCESS METRICS

✅ User reviews integrated outline
✅ Refinements made as needed
✅ User approves final outline
✅ Outline saved to output folder
✅ Workflow state updated
✅ Ready to begin drafting phase

---

## TRANSITIONS

**Next Step:** step-06-drafting-setup.md (Phase 3)

---

_Step 5 of SDA Main Workflow — Phase 2: Outline Approval_
