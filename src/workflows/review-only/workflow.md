---
name: review-only
description: Adversarial audit of existing solution documents without creating new ones
version: 1.0.0
---

# Review-Only Mode Workflow

**Purpose:** Adversarial audit of existing solution documents from customer and R&D perspectives.

---

## When to Use This Workflow

- Reviewing documents before publication
- Quality check on completed documentation
- Getting critical feedback without redrafting
- Validating technical accuracy and customer clarity
- Stress-testing documents before stakeholder review

---

## Workflow Overview

This workflow provides adversarial review through three steps:

1. **Document Loading** — Load existing document and set review focus
2. **Adversarial Review** — Client-Advocate + Product-Guard challenge document
3. **Review Report** — Compile findings, recommendations, and action items

---

## Agent Team

**Review Board:**
- **Client-Advocate** — Professional skeptic, customer perspective (Primary)
- **Product-Guard** — R&D defender, technical validation (Primary)

---

## INITIALIZATION

### Step 1: Load First Step

When user activates this workflow, load `{installed_path}/steps/step-01-load-document.md`

---

## Output

**Deliverables:**
- Comprehensive review report
- Findings categorized by severity (critical, high, medium, low)
- Actionable recommendations
- What's working well (positive feedback)

**Output Location:** `{output_folder}/document-reviews/{document-name}-review-{date}.md`

---

## Workflow Duration

**Expected Time:** 15-30 minutes

**Factors affecting duration:**
- Document length and complexity
- Number of issues found
- Depth of review requested

---

## Connection to Other Workflows

**Typical Flow:**
1. **SDA Main Workflow** → Create document
2. **Review-Only Mode** → Audit document
3. **SDA Main Workflow** → Revise based on findings (targeted phases)

**Can also be used:**
- Standalone on any existing solution document
- Before Solution Investigation (to understand gaps first)
- As quality gate before publication

---

## Configuration

This workflow references:
- `{installed_path}/steps/` — Step-by-step workflow files
- `{project-root}/_bmad/core/config.yaml` — User configuration
- `{output_folder}` — Output location from config

---

_Workflow created as part of SDA module v1.0.0_
