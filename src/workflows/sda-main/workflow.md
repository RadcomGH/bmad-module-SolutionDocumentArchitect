---
name: sda-main
description: Solution Document Architect - End-to-end dual-audience documentation creation
version: 1.0.0
---

# Solution Document Architect (SDA) - Main Workflow

**Purpose:** Create comprehensive dual-audience solution documents from start to finish.

---

## What This Workflow Does

Creates multi-layered solution documentation that satisfies:
- **Technical R&D requirements** (architecture, accuracy, feasibility)
- **Business stakeholder needs** (value, clarity, strategic fit)

All in ONE cohesive document.

---

## Workflow Overview

Five phases guide you from subject definition to polished document:

**Phase 0:** Subject Definition & Investigation  
**Phase 1:** Knowledge Source Review & Validation  
**Phase 2:** Outline Extraction & Approval  
**Phase 3:** Layered Drafting (with adversarial review)  
**Phase 4:** Formatting & Synthesis

---

## Agent Team

**Full SDA Team (8 agents):**
- **Innovation Support:** Catalyst, Visionary, Inventor
- **Production & Drafting:** Chronicler, Envoy, Weaver
- **Review Board:** Client-Advocate, Product-Guard

**Weaver** serves as master agent, orchestrating the entire workflow.

---

## INITIALIZATION

### Step 1: Load First Step

When user activates this workflow, load `{installed_path}/steps/step-00-welcome.md`

---

## Output

**Deliverables:**
- Polished dual-audience solution document
- Technical narrative (Chronicler)
- Business value narrative (Envoy)
- Unified synthesis (Weaver)
- Adversarial review findings integrated

**Output Location:** `{output_folder}/solution-descriptions/{subject}_description.md`

---

## Workflow Duration

**Expected Time:** 30 minutes - 2 hours

**Fast Mode** (simple solutions): 30-45 min  
**Standard Mode** (most documents): 1-1.5 hours  
**Deep Mode** (complex solutions): 1.5-2+ hours

---

## Workflow States

```yaml
---
stepsCompleted: []
workflowType: 'sda-main'
subject_name: ''
primary_audience: ''      # Customer | R&D
secondary_audience: ''    # Customer | R&D
knowledge_validated: false
outline_approved: false
drafting_complete: false
review_complete: false
---
```

---

## Connection to Other Workflows

**Typical Flow:**
1. (Optional) **Solution Investigation** → clarify solution first
2. **SDA Main Workflow** (this workflow) → create document
3. (Optional) **Review-Only Mode** → additional quality check
4. (Auto) **Document Indexing** → catalog in repository

---

## Configuration

This workflow references:
- `{installed_path}/steps/` — Step-by-step workflow files
- `{project-root}/_bmad/core/config.yaml` — User configuration
- `{output_folder}` — Output location from config

---

_Workflow created as part of SDA module v1.0.0_
