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

🕊️ **Customer/Business Perspective** (Value Narrator leads)
- Focus: Value propositions, business impact, user benefits
- Language: Clear, benefit-oriented, jargon-free
- Structure: Problem → Solution → Outcomes
- Details: Technical depth in expandable sections

📜 **R&D/Technical Perspective** (Technical Scribe leads)
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
→ Value Narrator drafts the main narrative

**[R] R&D/Technical**
- Engineering teams, architects, developers
- Technical reviewers, security auditors
- Integration partners (technical staff)
→ Technical Scribe drafts the main narrative

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
- **Lead Drafter:** {Value Narrator if Customer | Technical Scribe if R&D}
- Main narrative voice and structure

**Secondary Audience:** {secondary_audience} (Importance: {secondary_importance})
- **Support Drafter:** {Technical Scribe if Customer | Value Narrator if R&D}
- {Detail blocks | Callouts | Appendices} based on importance

**This means:**
{If Customer Primary}
→ Value Narrator writes the main flow (value, benefits, outcomes)
→ Technical Scribe adds technical detail blocks and architecture depth
→ Document reads as business-focused with technical rigor underneath

{If R&D Primary}
→ Technical Scribe writes the main flow (architecture, implementation, specs)
→ Value Narrator adds value highlights and business impact callouts
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
lead_drafter: '{Value Narrator | Technical Scribe}'
support_drafter: '{Technical Scribe | Value Narrator}'
```

### 6. Output Format Selection

**Chief Editor:**

"**One more configuration: Output Formats**

Solution documents are always generated in **Markdown**, but I can also convert them to additional formats for easier sharing with stakeholders.

**Available Formats:**

📄 **Markdown (.md)** — Always generated
- Source of truth
- Version control friendly
- Technical reviews

📘 **ODT (.odt)** — OpenDocument Text
- Opens in Microsoft Word, LibreOffice Writer, Google Docs
- Professional document format
- Fully editable by recipients

📊 **ODP (.odp)** — OpenDocument Presentation
- Opens in Microsoft PowerPoint, LibreOffice Impress, Google Slides
- Creates slides from document structure
- Great for executive briefings

**Which formats do you want?**

**[M]** Markdown only (default, fastest)
**[D]** Markdown + ODT document
**[P]** Markdown + ODP presentation
**[B]** Both (Markdown + ODT + ODP)

💡 *Note: ODT and ODP conversion requires pandoc. See README for installation.*

**Your choice:**"

**Capture output_formats:**
- M → `[markdown]`
- D → `[markdown, odt]`
- P → `[markdown, odp]`
- B → `[markdown, odt, odp]`

**Update workflow state:**
```yaml
output_formats: [markdown, odt, odp]  # Based on user choice
```

### 7. Save Audience Configuration

**Chief Editor:**

"**Saving audience configuration for audit trail...**

Output: `{output_folder}/solution-descriptions/{subject_name}_audience-config.md`

**Configuration Summary:**
- Primary audience: {primary_audience}
- Secondary importance: {secondary_importance}
- Lead drafter: {lead_drafter}
- Support drafter: {support_drafter}
- Output formats: {output_formats}

*This configuration will guide the entire document creation process.*"

**Create file:** `{output_folder}/solution-descriptions/{subject_name}_audience-config.md`

**Content:**
```markdown
# Audience Configuration: {subject_name}

## Configuration Summary

**Primary Audience:** {primary_audience}
- **Lead Drafter:** {Value Narrator | Technical Scribe}
- **Role:** Main narrative voice and structure

**Secondary Audience:** {secondary_audience}
- **Importance Level:** {High | Medium | Low}
- **Support Drafter:** {Technical Scribe | Value Narrator}
- **Role:** {Detail blocks | Callouts | Appendices} based on importance

## Document Approach

{If Customer Primary:}
**Customer/Business-Led Approach**
- Value Narrator writes the main flow (value, benefits, outcomes)
- Technical Scribe adds technical detail blocks and architecture depth
- Document reads as business-focused with technical rigor underneath
- Structure: Problem → Solution → Outcomes
- Language: Clear, benefit-oriented, jargon-free
- Technical details in expandable sections

{If R&D Primary:}
**R&D/Technical-Led Approach**
- Technical Scribe writes the main flow (architecture, implementation, specs)
- Value Narrator adds value highlights and business impact callouts
- Document reads as technical specification with clear business relevance
- Structure: System → Components → Interactions
- Language: Precise, technical, specification-grade
- Business value highlighted in callouts

## Secondary Audience Strategy

**Importance: {secondary_importance}**

{If High:}
- Nearly equal content for both audiences
- Rich dual perspectives throughout
- Longer document with comprehensive coverage
- Secondary audience gets detailed, substantive sections

{If Medium:}
- Balanced approach (recommended for most cases)
- Main narrative plus substantial supporting sections
- Secondary content is solid but clearly supporting
- Good depth without overwhelming the primary flow

{If Low:}
- Focused document, minimal secondary content
- Quick callouts, sidebars, or appendices only
- Primary narrative dominates
- Secondary audience gets awareness-level coverage

## Agent Assignments

- **Lead Drafter:** {lead_drafter}
  - Responsible for main document flow
  - Primary narrative voice
  - Core section ownership
  
- **Support Drafter:** {support_drafter}
  - Provides complementary perspective
  - Adds depth sections/callouts
  - Ensures dual-audience value

## Decision Context

**User Choices:**
- Primary audience selected: {primary_audience}
- Secondary importance: {secondary_importance}
- Output formats: {output_formats}
- Configuration approved: {timestamp}

---
*Generated: {timestamp}*
*Workflow: SDA Main — Step 03: Audience Configuration*
```

### 8. Present Menu

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
