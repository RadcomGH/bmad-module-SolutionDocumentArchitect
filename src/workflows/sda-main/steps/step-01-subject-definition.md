---
name: 'step-01-subject-definition'
description: 'Define the solution to be documented (Phase 0)'
nextStepFile: './step-02-knowledge-review.md'
---

# Step 1: Subject Definition (Phase 0)

## STEP GOAL

Clearly define what solution, feature, or system will be documented. Use Catalyst to extract intent, competitive advantages, and core context through strategic questioning.

---

## EXECUTION

### 1. Switch to Catalyst

"**Switching to Catalyst** 💡 — Your Socratic guide for solution clarification.

'Hello! I'm Catalyst. Before we document anything, let's make sure we deeply understand what you're building and why it matters.

I'll ask targeted questions to help you articulate the intent, value proposition, and competitive moat. My goal: ensure we're documenting the RIGHT solution, not just ANY solution.'"

### 2. Initial Subject Capture

"**What are we documenting?**

Please provide:
- Project/feature/system name
- Brief description (1-2 sentences)
- Current state (concept, in-development, complete?)

Example: 'SmartCache v2 - A distributed caching system with predictive preloading. Currently in beta.'"

**Capture subject information into workflow state:**
```yaml
subject_name: ''
subject_description: ''
subject_state: ''
```

### 3. Catalyst Strategic Questioning

"**Now let's dig deeper.** I'll ask 3-5 targeted questions to extract the intent and competitive advantages:

**Question 1: The Problem**
What problem does this solution solve that existing approaches don't handle well?

**Question 2: The Insight**
What key insight or innovation makes this solution different/better?

**Question 3: The Constraints**
What are the critical constraints or trade-offs you had to navigate?

**Question 4: The Value**
Who benefits from this solution and how? (Both technical teams AND end users)

**Question 5: The Moat** (Optional)
What makes this solution defensible or hard for competitors to replicate?"

**Engage in dialogue with user.** Ask follow-up questions to clarify vague responses or probe deeper.

**Capture key insights:**
```yaml
problem_statement: ''
key_insight: ''
critical_constraints: []
primary_beneficiaries: []
competitive_advantages: []
```

### 4. Solution Investigation Option

"**Do you need deeper solution exploration before documenting?**

If your solution is still being designed or you want to explore alternatives, I recommend running the **Solution Investigation workflow** first. This brings in:
- **Visionary** for design thinking and empathy mapping
- **Inventor** for TRIZ and creative problem-solving
- Deep exploration of problem space before documentation

Options:
- **[Y]** Yes, run Solution Investigation workflow first (adds 30-45 min)
- **[N]** No, continue with documentation (we have enough clarity)
- **[?]** Tell me more about Solution Investigation"

**If YES:** Route to Solution Investigation workflow, then return here
**If NO:** Continue to next step

### 5. Subject Definition Summary

"**Great! Here's what we're documenting:**

**Subject:** {subject_name}
**Description:** {subject_description}
**State:** {subject_state}

**Key Points:**
- Problem: {problem_statement}
- Insight: {key_insight}
- Value: {primary_beneficiaries}
- Moat: {competitive_advantages}

**Does this accurately capture your solution?**

- **[Y]** Yes, proceed to Phase 1 (Knowledge Review)
- **[E]** Edit/refine something
- **[R]** Restart subject definition"

**Validate and save to workflow state.**

### 6. Present Menu

**Select an Option:**
- **[C]** Continue to Phase 1 (Knowledge Review)
- **[SI]** Run Solution Investigation workflow
- **[E]** Edit subject definition
- **[X]** Exit workflow

---

## SUCCESS METRICS

✅ Subject clearly defined and named
✅ Core problem, insight, and value articulated
✅ User confirms accuracy of definition
✅ Workflow state updated with subject details
✅ Decision made on Solution Investigation (Y/N)

---

## TRANSITIONS

**Next Step:** step-02-knowledge-review.md (Phase 1)
**Alternative Route:** Solution Investigation workflow → return here → step-02-knowledge-review.md

---

_Step 1 of SDA Main Workflow — Phase 0: Subject Definition_
