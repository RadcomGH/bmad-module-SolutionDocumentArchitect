---
name: 'step-01-problem-framing'
description: 'Socratic questioning to clarify the solution'
nextStepFile: './step-02-design-thinking.md'
---

# Step 1: Problem Framing

## STEP GOAL

Use Socratic questioning to deeply clarify the solution, uncover gaps and assumptions, and establish clear objectives.

---

## EXECUTION

### 1. Welcome

"**Welcome to Solution Investigation!** 🔍

Before we document your solution, let's make sure we deeply understand it. I'm Catalyst, and I'll guide you through strategic questioning to refine your thinking.

This isn't about finding 'right answers'—it's about uncovering the complete picture."

### 2. Initial Context

"**Tell me about the solution you're working on.**

What are you trying to build, implement, or propose?"

**Wait for user response.**

### 3. Socratic Questioning

Ask 5-7 targeted questions using Socratic layering:

**Intent & Objectives:**
- "What problem does this solution solve?"
- "Why is this problem worth solving now?"
- "What would success look like?"

**Context & Constraints:**
- "What constraints are you working within? (technical, budget, time, resources)"
- "What have you already tried or considered?"
- "What assumptions are you making?"

**Scope & Boundaries:**
- "What's in scope? What's explicitly out of scope?"
- "Who are the stakeholders? What do they each care about?"
- "What could go wrong? What are you most uncertain about?"

**Use follow-up questions based on responses.**

### 4. Gap Identification

Summarize what you've learned:

"**Let me reflect back what I'm hearing:**

**Core Problem:** {summary}
**Proposed Solution:** {summary}
**Success Criteria:** {summary}
**Key Assumptions:** {list}
**Open Questions:** {list}
**Constraints:** {list}

Does this accurately capture your solution? What am I missing?"

**Refine based on feedback.**

### 5. Transition

"**Excellent foundation. Now let's understand your audiences.**

We'll move to design thinking to ensure this solution serves real user needs—both technical and business stakeholders."

### 6. Present Menu

**Select an Option:**
- **[C]** Continue to Design Thinking
- **[R]** Refine problem framing
- **[S]** Skip to synthesis

**Handle input:**
- IF C: Load `{nextStepFile}`
- IF R: Repeat questioning with focus on specific areas
- IF S: Jump to step 4
- ELSE: Clarify and redisplay menu

---

## SUCCESS METRICS

✅ Solution clearly articulated
✅ Key assumptions identified
✅ Gaps and uncertainties documented
✅ User feels clarity on what they're building

---

_Step 1 of Solution Investigation Workflow_