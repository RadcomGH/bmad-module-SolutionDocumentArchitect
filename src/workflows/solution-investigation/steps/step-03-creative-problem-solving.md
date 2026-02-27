---
name: 'step-03-creative-problem-solving'
description: 'Apply TRIZ, systems thinking, and breakthrough ideation'
nextStepFile: './step-04-synthesis.md'
---

# Step 3: Creative Problem-Solving

## STEP GOAL

Apply creative problem-solving methodologies to tackle complex challenges in the solution.

---

## EXECUTION

### 1. Transition to Technical Wizard

"**Hello, I'm Technical Wizard.** 🧠

Solution Consultant clarified your solution, and Solution Designer mapped your audiences. Now let's make sure your solution is technically sound and innovative.

Are there any tough problems or contradictions we should tackle?"

### 2. Problem Identification

"**Let's identify challenges in your solution:**

- Technical constraints or contradictions?
- Competing requirements (need X but also need opposite of X)?
- Novel problems without obvious solutions?
- Architectural decisions you're uncertain about?

Tell me about the toughest challenge in your solution."

**IF user says "No major challenges":**
- "Great! Let's validate your approach and explore alternatives briefly."
- Proceed with light validation

**IF user identifies challenges:**
- Deep dive with problem-solving methodologies

### 3. Apply Problem-Solving Methodologies

**For Contradictions (TRIZ):**

"This is a classic contradiction: you need {X} but also {opposite of X}.

TRIZ offers separation principles:
- **In Time**: Alternate between states (eventual consistency)
- **In Space**: Different behaviors in different locations
- **In Condition**: Different behaviors under different conditions
- **System Level**: Move contradiction to subsystem or supersystem

Which principle might resolve this?"

**For Constraints (Theory of Constraints):**

"Let's identify the bottleneck:
- What's the limiting factor in your solution?
- What would you need to change to remove that constraint?
- What becomes the new bottleneck?

This helps us prioritize what matters most."

**For System Complexity (Systems Thinking):**

"Let's map the system:
- What are the key components?
- How do they interact?
- What feedback loops exist?
- Where are the leverage points for maximum impact?

Sometimes the solution is counter-intuitive when you see the whole system."

### 4. Alternative Exploration

"**Let's explore alternatives:**

What other approaches did you consider? Why did you choose this one?

Let me suggest some alternatives:
- {alternative approach 1}
- {alternative approach 2}
- {alternative approach 3}

Do any of these spark new thinking? Or confirm your current approach?"

### 5. Breakthrough Check

"**Innovation Assessment:**

- Is this solution incremental (10% better) or breakthrough (10x better)?
- What would make it breakthrough?
- Should it be breakthrough, or is incremental appropriate?

Not everything needs to be revolutionary—sometimes solid incremental improvement is the right answer."

### 6. Document Insights

Summarize findings:

"**Problem-Solving Insights:**

**Challenges Tackled:** {list}
**Methodologies Applied:** {TRIZ/TOC/Systems Thinking}
**Alternatives Considered:** {list}
**Decision Rationale:** {why chosen approach is best}
**Remaining Uncertainties:** {list}

Your solution is now much stronger. Ready for documentation."

### 7. Save Problem-Solving Analysis

**Technical Wizard:**

"**Saving problem-solving analysis...**

Output: `{output_folder}/solution-investigation/{solution-name}_problem-solving.md`

**Analysis Summary:**
- Challenges tackled: {count}
- Methodologies applied: {list}
- Alternatives explored: {count}
- Decision rationale documented

*This analysis captures the technical reasoning behind your solution choices.*"

**Create file:** `{output_folder}/solution-investigation/{solution-name}_problem-solving.md`

**Content:**
```markdown
# Problem-Solving Analysis: {solution-name}

## Challenges Identified

{For each challenge:}
### Challenge: {name}
- **Type:** {Contradiction | Constraint | System Complexity | Uncertainty}
- **Description:** {what makes this challenging}
- **Impact:** {why this matters}

## Methodologies Applied

{For each methodology used:}
### {TRIZ | Theory of Constraints | Systems Thinking | Other}
- **Application:** {how it was applied}
- **Insights Gained:** {what we learned}
- **Resolution Approach:** {how challenge was resolved}

## Alternatives Explored

{For each alternative:}
### Alternative: {approach name}
- **Description:** {what it involves}
- **Pros:** {advantages}
- **Cons:** {disadvantages}
- **Why Not Chosen:** {rationale}

## Chosen Approach

**Solution:** {describe chosen approach}

**Rationale:**
{Why this approach is best:}
- Technical fit
- Trade-offs accepted
- Risks mitigated
- Innovation level (incremental/breakthrough)

## Remaining Uncertainties

{List any open questions or areas needing more research:}
- {uncertainty 1}
- {uncertainty 2}
- {etc.}

## Innovation Assessment

- **Type:** {Incremental (10% better) | Breakthrough (10x better)}
- **Justification:** {why this level is appropriate}
- **Breakthrough Potential:** {what would make it breakthrough, if not already}

---
*Generated: {timestamp}*
*Workflow: Solution Investigation — Step 03: Creative Problem-Solving*
```

### 8. Transition

"**Excellent work. Let's synthesize everything we've learned.**

Chief Editor will help us document the refined solution understanding."

### 9. Present Menu

**Select an Option:**
- **[C]** Continue to Synthesis
- **[D]** Deeper problem-solving on specific issue
- **[S]** Skip to synthesis

---

## SUCCESS METRICS

✅ Tough problems identified and tackled
✅ Alternatives explored
✅ Solution strengthened through systematic methodologies
✅ Decision rationale documented

---

_Step 3 of Solution Investigation Workflow_