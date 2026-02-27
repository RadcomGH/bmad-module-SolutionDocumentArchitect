---
name: 'step-10-completion'
description: 'Final review, celebration, and workflow completion'
nextStepFile: null
---

# Step 10: Completion

## STEP GOAL

Present the final document, gather user feedback, provide next steps, and close the workflow with a celebration of what was created.

---

## EXECUTION

### 1. Final Document Presentation

"**🎉 The Solution Document is Complete! 🎉**

**Switching back to Chief Editor** 🧵

'We did it! After {workflow_duration}, we've created a solution document that's better than anything one person could write alone.

Let me show you what we've accomplished...'

---

## 📄 Final Document

**Title:** {subject_name}
**Type:** Solution Description (Dual-Audience)
**Primary Audience:** {primary_audience}
**Length:** {final_page_count} pages (~{final_word_count} words)
**Status:** ✅ Complete and Publication-Ready

**Location:**
`{output_folder}/solution-descriptions/{subject_name}_description.md`

---

**Document Highlights:**

🎯 **Serves Both Audiences**
- {primary_audience} gets a clear, focused narrative
- {secondary_audience} receives {secondary_importance} level supporting content
- Both perspectives integrated seamlessly

📜🕊️ **Dual Perspectives Unified**
- Technical accuracy from Technical Scribe
- Business value from Value Narrator
- Productive debates strengthened the content
- Review Board caught blind spots

🛡️ **Battle-Tested**
- Value Analyst: {client_advocate_findings} customer concerns addressed
- Product Manager: {product_guard_findings} reality checks applied
- Hardened against skeptical readers

🧵 **Professionally Polished**
- Visual hierarchy for easy scanning
- Consistent terminology and style
- Table of contents and navigation
- Publication-ready formatting

---

**Would you like to review the final document?**

- **[V]** View in editor
- **[S]** View summary/excerpt
- **[L]** View document location
- **[C]** Continue to wrap-up

**Your choice:**"

### 2. Handle Document Review

#### If VIEW IN EDITOR:
**Open file in VS Code**
"Opening `{subject_name}_description.md` in editor..."

**After review:**
"What do you think?"

{Capture feedback}

#### If VIEW SUMMARY:
"**Document Summary/Excerpt:**

{Show first 200 lines or executive summary + one major section}

---

**Full document:** `{document_path}`

**Satisfied with the result?**"

### 3. Feedback Collection

"**I'd love to hear your thoughts on the process.**

**Quick feedback (optional):**

**1. Quality:** How well does the document serve your needs?
- [E] Excellent - Exactly what I needed
- [G] Good - Meets expectations
- [N] Needs work - Some issues to fix

**2. Process:** How was the SDA workflow experience?
- [S] Smooth - Easy to follow
- [O] Okay - A few confusing moments
- [C] Challenging - Needs improvement

**3. Duration:** {workflow_duration} to create this document.
- [F] Faster than doing it alone
- [W] Worth it for the quality
- [L] Too long

**Any specific comments or suggestions?**

{Capture feedback if provided}"

**Store feedback in workflow state for future improvement.**

### 4. Output Format Conversion

**Chief Editor:**

"**Converting to requested output formats...**"

**Check workflow state for output_formats: [markdown, odt, odp]**

#### Always Present:
"✅ **Markdown:** `{subject_name}_description.md`"

#### If 'odt' in output_formats:

"**Converting to ODT (OpenDocument Text)...**"

**Execute task: convert-output-format**
- source_md: `{output_folder}/solution-descriptions/{subject_name}_description.md`
- output_format: `odt`
- template: `{odt_template}` (from config.yaml)

**On success:**
"✅ **ODT Document:** `{subject_name}_description.odt` ({file_size} MB)
   Opens in: Microsoft Word, LibreOffice Writer, Google Docs"

**On failure:**
"⚠️ **ODT conversion failed:** {error_message}
   Markdown version available as fallback.
   
   **Troubleshooting:**
   - Verify pandoc is installed: `pandoc --version`
   - See README Prerequisites section for installation
   - Check error details above"

#### If 'odp' in output_formats:

"**Converting to ODP (OpenDocument Presentation)...**"

**Execute task: convert-output-format**
- source_md: `{output_folder}/solution-descriptions/{subject_name}_description.md`
- output_format: `odp`
- template: `{odp_template}` (from config.yaml)

**On success:**
"✅ **ODP Presentation:** `{subject_name}_description.odp` ({slide_count} slides, {file_size} MB)
   Opens in: Microsoft PowerPoint, LibreOffice Impress, Google Slides"

**On failure:**
"⚠️ **ODP conversion failed:** {error_message}
   Markdown version available as fallback.
   
   **Troubleshooting:**
   - Verify pandoc is installed: `pandoc --version`
   - See README Prerequisites section for installation
   - Check error details above"

#### Conversion Complete:

"**📁 All formats saved to:**
`{output_folder}/solution-descriptions/`

**📄 Generated Files:**"

{List all successfully generated files with formats}

"💡 **Tip:** ODT and ODP files open natively in Microsoft Office and are fully editable."

### 5. Artifacts Summary

"**Complete Workflow Artifacts:**

Throughout this workflow, we created several supporting files:

📊 **Subject Definition**
`{output_folder}/solution-descriptions/{subject_name}_subject.yaml`
- Problem statement, insights, constraints, value proposition

📋 **Technical Findings Report**
`{output_folder}/solution-descriptions/{subject_name}_findings.md`
- Workspace scan results, existing documentation, code signatures

📐 **Approved Outline**
`{output_folder}/solution-descriptions/{subject_name}_outline.md`
- Integrated structure from dual perspectives

🔍 **Review Board Findings**
`{output_folder}/solution-descriptions/{subject_name}_review_findings.md`
- Value Analyst and Product Manager audit results

📄 **Final Document**
`{output_folder}/solution-descriptions/{subject_name}_description.md`
- Complete solution description ready for publication

**All artifacts saved for future reference.**"

### 6. Next Steps Guidance

"**What's Next?**

Now that you have a publication-ready document, here are common next steps:

**📤 Distribution:**
- Share with stakeholders for final review
- Publish to documentation site / knowledge base
- Include in RFP responses or proposals
- Add to product marketing materials

**🔄 Iteration:**
- Run **Review-Only Mode** when you want fresh adversarial audit
- Return to **Edit Mode** (future feature) for updates
- Keep document synced with product evolution

**🗂️ Indexing:**
- Run **Document Indexing workflow** to make this searchable
- Create summaries for different audiences
- Extract key sections for reuse

**📚 Reuse:**
- Use as template for similar solution descriptions
- Extract patterns for documentation standards
- Build a library of solution descriptions

**Do you want help with any of these next steps?**"

### 6. Team Recognition

"**Team Recognition** 🌟

'Before we close, let me recognize the team that made this possible:'

**Innovation Support:**
💡 **Solution Consultant** — Asked the right questions to define the solution clearly
{If solution investigation used}
🔮 **Solution Designer** — Applied design thinking for deep problem exploration
🧠 **Technical Wizard** — Contributed creative problem-solving insights

**Production Team:**
📜 **Technical Scribe** — Ensured technical accuracy and architectural integrity
🕊️ **Value Narrator** — Translated complex technology into clear value propositions
💡 **Solution Consultant** — Coordinated drafting and resolved creative tensions

**Review Board:**
👥 **Value Analyst** — Caught {client_advocate_findings} customer concerns
🛡️ **Product Manager** — Verified {product_guard_findings} technical realities

**Synthesis:**
🧵 **Chief Editor** — Unified dual perspectives into polished final document

**And most importantly:**
👤 **{user_name}** — Provided subject expertise, validated direction, made key decisions

**This document exists because of this collaborative team effort.**'"

### 7. Celebration

"**🎊 Congratulations! 🎊**

You now have a solution document that:
- ✨ Serves both technical AND business audiences
- 🛡️ Has been battle-tested by adversarial review
- 🧵 Integrates multiple expert perspectives
- 📐 Looks professional and polished
- 🚀 Is ready to publish and share

**From subject definition to publication-ready in {workflow_duration}.**

**This document is better than anything you could have written alone,** not because you couldn't write it, but because it embodies the collaborative intelligence of 8 specialized agents working together.

That's the power of SDA. 🎯"

### 8. Workflow State Save

"**Saving workflow state...**

Output: `{output_folder}/solution-descriptions/{subject_name}_workflow_state.yaml`

```yaml
workflow: sda-main
version: 1.0.0
status: complete
subject: {subject_name}
primary_audience: {primary_audience}
duration: {workflow_duration}
completion_date: {current_date}

phases_completed:
  - phase_0_subject_definition
  - phase_1_knowledge_review
  - phase_1_audience_configuration
  - phase_2_outline_creation
  - phase_2_outline_approval
  - phase_3_parallel_drafting
  - phase_3_adversarial_review
  - phase_4_synthesis_formatting

artifacts:
  final_document: '{path}'
  subject_definition: '{path}'
  findings_report: '{path}'
  approved_outline: '{path}'
  review_findings: '{path}'

statistics:
  word_count: {final_word_count}
  page_count: {final_page_count}
  sections: {count}
  review_board_findings: {total_findings}
  fixes_applied: {count}

team_contributions:
  solution_consultant: {count} interventions
  technical_scribe: {count} sections
  value_narrator: {count} sections
  value_analyst: {count} findings
  product_manager: {count} findings
  chief_editor: 1 synthesis

user_feedback: {captured_feedback}
```

**Workflow state saved for future reference.**"

### 9. Final Menu

"**SDA Main Workflow Complete** ✅

**What would you like to do?**

**[VD]** View final document one more time
**[EA]** Export artifacts (zip all workflow files)
**[SI]** Start another document (new SDA workflow)
**[RO]** Run Review-Only on this document (future audit)
**[H]** Help / Documentation
**[X]** Exit (I'm done!)

**Your choice:**"

### 10. Exit

{When user chooses to exit}

"**Thank you for using Solution Document Architect!** 🎉

**Your final document:**
`{document_path}`

**Need help later?**
- Run `sda --help` for workflow options
- Access documentation in `sda/docs/`
- Reactivate SDA module anytime

**Happy documenting!** 📝

{Return to BMAD system prompt}

**SDA workflow terminated.** ✅"

**Update system state:**
```yaml
active_workflow: null
last_completed: sda-main
last_document: {document_path}
```

---

## SUCCESS METRICS

✅ Final document presented to user
✅ User feedback collected (optional)
✅ All artifacts cataloged
✅ Next steps guidance provided
✅ Team recognized for contributions
✅ Workflow state saved
✅ User satisfied with outcome
✅ Clean exit executed

---

## TRANSITIONS

**Next Step:** None (workflow complete)

**Possible Follow-ups:**
- Start new SDA workflow
- Run Review-Only Mode on this document
- Document Indexing workflow
- Return to BMAD main menu

---

_Step 10 of SDA Main Workflow — Completion and Celebration_ 🎉

---

**END OF SDA MAIN WORKFLOW**
