---
name: 'step-03-audience-configuration'
description: 'Configure primary and secondary audience priorities (Phase 1)'
nextStepFile: './step-04-outline-proposal.md'
---

# Step 3: Audience Configuration (Phase 1)

## STEP GOAL

Determine whether the solution document should prioritize the Customer/Business perspective or R&D/Technical perspective, and configure the secondary audience.

---

## EXECUTION

### 1. Audience Framing

"**Who is this document FOR?**

SDA creates dual-audience documents that serve both technical AND business readers. But we need to know which perspective leads.

**Two Perspectives:**

🕊️ **Customer/Business Perspective** (Envoy leads)
- Focus: Value propositions, business impact, user benefits
- Language: Clear, benefit-oriented, jargon-free
- Structure: Problem → Solution → Outcomes
- Details: Technical depth in expandable sections

📜 **R&D/Technical Perspective** (Chronicler leads)
- Focus: Architecture, implementation, technical accuracy
- Language: Precise, technical, specification-grade
- Structure: System → Components → Interactions
- Details: Business value highlighted in callouts

**Who needs this document MOST?**"

### 2. Primary Audience Selection

"**Select PRIMARY audience (who leads the narrative):**

**[C] Customer/Business**
- External customers, prospects, executives
- Sales engineers, product marketing
- Business stakeholders, decision-makers
→ Envoy drafts the main narrative

**[R] R&D/Technical**
- Engineering teams, architects, developers
- Technical reviewers, security auditors
- Integration partners (technical staff)
→ Chronicler drafts the main narrative

**[?] Not sure (help me decide)**

**Your choice:**"

**Capture primary_audience: [Customer | R&D]**

### 3. Help Decide (if requested)

"**Let me help you decide.**

Ask yourself:
1. **Who makes the go/no-go decision?** (Business buyer vs Technical gatekeeper)
2. **What's the document's purpose?** (Sell value vs Prove feasibility)
3. **Where will it be used?** (Sales deck vs Architecture review)

**Common scenarios:**

→ **Customer Primary:** RFP responses, solution proposals, product announcements, customer-facing roadmaps

→ **R&D Primary:** Technical specifications, architecture documents, API documentation, internal design docs

**Which scenario matches yours?**"

**Re-present primary audience selection.**

### 4. Secondary Audience Configuration

"**Great! Primary audience: {primary_audience}**

Now, the secondary audience will still get substantial content, just organized differently.

**Secondary audience:** {opposite_of_primary}

**How important is the secondary audience?**

**[H] High** — They need detailed, comprehensive coverage
- Results in nearly equal content for both audiences
- Longer document with rich dual perspectives

**[M] Medium** — They need solid coverage of key points
- Balanced approach (recommended for most cases)
- Main narrative + substantial supporting sections

**[L] Low** — They need basic awareness/reference
- Focused document, minimal secondary content
- Quick callouts or appendices only

**Your choice:**"

**Capture secondary_importance: [High | Medium | Low]**

### 5. Configuration Summary

"**Audience Configuration Complete ✅**

**Primary Audience:** {primary_audience}
- **Lead Drafter:** {Envoy if Customer | Chronicler if R&D}
- Main narrative voice and structure

**Secondary Audience:** {secondary_audience} (Importance: {secondary_importance})
- **Support Drafter:** {Chronicler if Customer | Envoy if R&D}
- {Detail blocks | Callouts | Appendices} based on importance

**This means:**
{If Customer Primary}
→ Envoy writes the main flow (value, benefits, outcomes)
→ Chronicler adds technical detail blocks and architecture depth
→ Document reads as business-focused with technical rigor underneath

{If R&D Primary}
→ Chronicler writes the main flow (architecture, implementation, specs)
→ Envoy adds value highlights and business impact callouts
→ Document reads as technical specification with clear business relevance

**Is this configuration correct?**

- **[Y]** Yes, proceed to outline creation
- **[E]** Edit configuration
- **[R]** Restart audience configuration"

**Update workflow state:**
```yaml
primary_audience: '{Customer | R&D}'
secondary_audience: '{R&D | Customer}'
secondary_importance: '{High | Medium | Low}'
lead_drafter: '{Envoy | Chronicler}'
support_drafter: '{Chronicler | Envoy}'
```

### 6. Present Menu

**Phase 1: Complete ✅**

**Select an Option:**
- **[C]** Continue to Phase 2 (Outline Creation)
- **[E]** Edit audience configuration
- **[VS]** View current workflow state
- **[X]** Exit workflow

---

## SUCCESS METRICS

✅ Primary audience identified (Customer OR R&D)
✅ Secondary audience importance configured
✅ Lead and support drafters assigned
✅ User confirms configuration
✅ Workflow state updated

---

## TRANSITIONS

**Next Step:** step-04-outline-proposal.md (Phase 2)

---

_Step 3 of SDA Main Workflow — Phase 1: Audience Configuration_
