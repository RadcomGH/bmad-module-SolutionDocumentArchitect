---
name: solution-investigation
description: Deep exploration and refinement of solutions before documentation begins
version: 1.0.0
---

# Solution Investigation Workflow

**Purpose:** Conduct deep exploration and refinement of your solution before committing to documentation.

---

## When to Use This Workflow

- Your solution feels unclear or incomplete
- Complex architectural decisions need exploration
- Need to identify gaps, assumptions, or alternatives
- Before committing to a documentation approach
- Want to stress-test solution thinking with the Innovation Support team

---

## Workflow Overview

This workflow guides you through four phases of solution exploration:

1. **Problem Framing** — Socratic questioning to clarify the solution
2. **Design Thinking** — Audience empathy mapping and user-centered framing
3. **Creative Problem-Solving** — TRIZ, systems thinking, breakthrough ideation
4. **Refinement & Synthesis** — Document insights and prepare for documentation

---

## Agent Team

**Innovation Support Team:**
- **Catalyst** 💡 — Leads Socratic questioning (Primary)
- **Visionary** 🔮 — Facilitates design thinking and empathy mapping
- **Inventor** 🧠 — Applies creative problem-solving methodologies

---

## INITIALIZATION

### Step 1: Load First Step

When user activates this workflow, load `{installed_path}/steps/step-01-problem-framing.md`

---

## Output

**Deliverables:**
- Refined solution understanding document
- Identified gaps and assumptions
- Documented architectural decisions
- Audience empathy map
- Ready for SDA main workflow

**Output Location:** `{output_folder}/solution-investigation/{solution-name}-investigation.md`

---

## Workflow Duration

**Expected Time:** 30-60 minutes

**Can be shortened for:**
- Simple solutions needing light validation
- Targeted problem-solving (skip phases)

**Should be extended for:**
- Complex, high-stakes solutions
- Novel or unprecedented approaches
- Multiple stakeholders with conflicting needs

---

## Connection to Other Workflows

**Typical Flow:**
1. **Solution Investigation** (this workflow)
2. → **SDA Main Workflow** (documentation creation)

**Can also be used:**
- Standalone for solution refinement without documentation
- As Phase 0.5 in SDA Main Workflow (integrated)
- Before Review-Only Mode to strengthen solution first

---

## Configuration

This workflow references:
- `{installed_path}/steps/` — Step-by-step workflow files
- `{project-root}/_bmad/core/config.yaml` — User configuration
- `{output_folder}` — Output location from config

---

_Workflow created as part of SDA module v1.0.0_
