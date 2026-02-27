---
name: 'step-08-adversarial-review'
description: 'Review Board stress-tests the document (Phase 3)'
nextStepFile: './step-09-synthesis-formatting.md'
---

# Step 8: Adversarial Review (Phase 3)

## STEP GOAL

Subject the drafted document to rigorous adversarial review from opposing perspectives. Value Analyst challenges from customer viewpoint, Product Manager challenges from technical/business reality. Catch blind spots, overstatements, and gaps before finalization.

---

## EXECUTION

### 1. Review Board Introduction

"**Time for the Review Board!** 🥊

Now that we have a complete draft, it's time to stress-test it. The Review Board operates with professional skepticism:

**👥 Value Analyst** — Represents customer perspective
- Will they understand this?
- Will they believe these claims?
- What concerns will they raise?
- Are we addressing their real problems?

**🛡️ Product Manager** — Represents technical/business reality
- Is this technically accurate?
- Can we actually deliver this?
- Are claims aligned with our roadmap?
- What risks are we not mentioning?

**The Process:**
Both agents review the full document independently, then present their findings. This adversarial tension catches issues that collaborative drafting might miss.

**Ready for the gauntlet?**"

### 2. Value Analyst Review

"**Switching to Value Analyst** 👥 — Your customer perspective guardian.

'Hello. I'm reading this document as if I'm your skeptical customer — someone who's been burned by overpromises before.

Let me review the complete draft...'

{Read through entire document}

'Okay, here's my Customer Skepticism Report:'

---

## Value Analyst Findings

**Overall Assessment:** {Excellent | Strong | Concerning | Problematic}

### ✅ What Works

{List 3-5 strengths from customer perspective}
- Clear value propositions
- Customer-friendly language
- Addresses real pain points
- Believable claims with evidence
- Examples resonate with target audience

### ⚠️ Customer Concerns

{List issues that would concern customers}

**Clarity Issues:**
{Sections or terms that customers won't understand}
- Section X: Too much jargon
- Term Y: Needs plain-language definition
- Concept Z: Assumes too much technical knowledge

**Credibility Gaps:**
{Claims that need more support}
- Claim: '{example}' — Where's the proof?
- Performance number without context or benchmark
- Competitive advantage without differentiation

**Missing Information:**
{What customers will ask that isn't answered}
- Pricing or cost implications?
- Implementation timeline/effort?
- Risk mitigation strategies?
- Support and maintenance expectations?

**Friction Points:**
{Places where customers will hesitate}
- Section X creates anxiety without resolution
- Unclear what happens if Y goes wrong
- No clear path from evaluation to production

### 🎯 Priority Fixes

{Top 3-5 changes needed from customer perspective}
1. {Specific recommendation with line/section reference}
2. {Specific recommendation}
3. {Specific recommendation}

---

'That's my customer reality check. Some of this might sting, but better to hear it from me than from a lost deal.'

**Value Analyst review complete.**"

### 3. Product Manager Review

"**Switching to Product Manager** 🛡️ — Your reality guardian.

'I'm reading this document as your internal skeptic — the person who asks "Can we actually do this?" and "What aren't we saying?"

Let me review...'

{Read through entire document}

'Here's my Reality Check Report:'

---

## Product Manager Findings

**Overall Assessment:** {Solid | Mostly Sound | Risky | Dangerous}

### ✅ What's Defensible

{List 3-5 technically sound elements}
- Technical accuracy verified against {findings_report}
- Architecture claims align with implementation
- Performance numbers are realistic/documented
- Competitive advantages are sustainable
- Roadmap alignment confirmed

### 🚨 Technical Red Flags

{List technical accuracy or feasibility concerns}

**Accuracy Issues:**
{Technical inaccuracies or outdated information}
- Section X: Claims Y but code shows Z
- Diagram doesn't match actual architecture
- API example uses deprecated pattern
- Version number mismatch (doc says v2, we're on v1.8)

**Overpromises:**
{Claims we can't fulfill with current capabilities}
- "Sub-millisecond latency" — Protocol limits us to 5ms minimum
- "Unlimited scale" — We have documented limits at {threshold}
- "Zero configuration" — Setup requires {steps}
- "100% compatibility" — Known issues with {scenarios}

**Missing Disclaimers:**
{Limitations or constraints not mentioned}
- Known limitations: {list}
- Current roadmap gaps: {list}
- Dependencies on external systems: {list}
- Scale/performance boundaries: {list}

**Business Reality Gaps:**
{Misalignment with business constraints}
- Feature mentioned is not GA yet (beta/alpha)
- Pricing model not finalized
- Support model unclear
- Compliance/security gaps for regulated industries

### 🔧 Required Corrections

{Top 3-5 changes needed from reality perspective}
1. {Specific recommendation with line/section reference}
2. {Specific recommendation}
3. {Specific recommendation}

---

'This document needs these corrections before it goes external. We can't afford to overpromise or misrepresent capabilities.'

**Product Manager review complete.**"

### 4. Review Board Synthesis

"**Review Board Findings Summary**

We have feedback from both adversarial perspectives. Let's synthesize:

**Critical Issues (Fix required):**
{Issues flagged by BOTH reviewers}
- {Intersection of concerns}

**Customer Perspective (Value Analyst):**
- Priority fixes: {count}
- Clarity improvements: {count}
- Credibility enhancements: {count}

**Reality Perspective (Product Manager):**
- Accuracy corrections: {count}
- Overpromise rollbacks: {count}
- Disclaimer additions: {count}

**Overall Document Health:** {Calculate based on findings}
- 🟢 Green: Minor polish needed
- 🟡 Yellow: Moderate revisions needed
- 🔴 Red: Significant rework required

**My recommendation:**
{Based on severity, suggest either:}
- Quick fixes then synthesis
- Moderate revision round
- Substantial redrafting of problem sections"

### 5. User Review of Findings

"**Please review the Review Board findings.**

{Display both reports}

**This adversarial review is designed to be tough.** The goal is to catch problems before customers or technical reviewers do.

**How would you like to proceed?**

**[A] Auto-fix** — Let agents fix all identified issues automatically
**[S] Selective** — I'll choose which fixes to apply
**[R] Review discussion** — Let's discuss specific findings before fixing
**[I] Ignore** — Skip Review Board recommendations (not advised)

**Your choice:**"

### 6. Handle Response

#### If AUTO-FIX:
"**Applying all Review Board recommendations...**

{Process each fix:}
- Value Analyst priority 1: {fixing...}
- Product Manager accuracy issue: {fixing...}
- Value Analyst clarity issue: {fixing...}
- Product Manager overpromise: {fixing...}

{Update document file with all corrections}

**All fixes applied.** ✅

**Changes summary:**
- {count} accuracy corrections
- {count} clarity improvements
- {count} disclaimers added
- {count} overpromises tempered

**Document status:** Ready for synthesis"

#### If SELECTIVE:
"**Let's go through the recommendations...**

{For each priority fix:}
**Fix #{n}: {description}**

Current text:
'{show current section}'

Recommended change:
'{show proposed fix}'

Reason: {explanation from review}

**Apply this fix?**
- [Y] Yes, apply
- [N] No, skip
- [E] Edit (different approach)
- [D] Discuss (why is this needed?)

{Loop through all fixes}"

#### If REVIEW DISCUSSION:
"**Let's discuss the findings.**

Which findings would you like to discuss?
{List all findings with numbers}

**Enter number(s) to discuss:**"

{Engage in dialogue about selected findings}

#### If IGNORE:
"**Are you sure you want to skip the Review Board recommendations?**

The adversarial review caught {count} issues that could:
- Confuse customers (clarity issues)
- Damage credibility (overpromises)
- Create support problems (missing information)
- Cause technical disputes (accuracy issues)

**Really skip?**
- [Y] Yes, proceed without fixes (I'll handle this later)
- [N] No, let's apply fixes

{If confirmed ignore, mark review as 'skipped' in state}"

### 7. Review Complete

"**Review Board phase complete!** ✅

**Review Statistics:**
- Value Analyst findings: {count}
- Product Manager findings: {count}
- Critical issues: {count}
- Fixes applied: {count}
- Fixes skipped: {count}

**Document Status:** {Adversarial review complete | Hardened and ready}

**The document is now more:**
✅ Clear and customer-friendly
✅ Technically accurate and realistic
✅ Credible with proper support/evidence
✅ Complete with necessary disclaimers

**Saving reviewed draft...**

Output: `{output_folder}/solution-descriptions/{subject_name}_description_REVIEWED.md`"

**Update workflow state:**
```yaml
review_board_complete: true
value_analyst_findings: {count}
product_manager_findings: {count}
fixes_applied: {count}
```

### 8. Save Review Board Findings

**Chief Editor:**

"**Saving Review Board findings and applied fixes...**

Output: `{output_folder}/solution-descriptions/{subject_name}_review-findings.md`

**Review Summary:**
- Value Analyst findings: {count}
- Product Manager findings: {count}
- Critical issues: {count}
- Fixes applied: {count}
- Fixes skipped: {count}

*These findings document how the document was hardened through adversarial review.*"

**Create file:** `{output_folder}/solution-descriptions/{subject_name}_review-findings.md`

**Content:**
```markdown
# Review Board Findings: {subject_name}

## Review Statistics
- **Value Analyst Findings:** {count}
- **Product Manager Findings:** {count}
- **Critical Issues:** {count}
- **Fixes Applied:** {count}
- **Fixes Skipped:** {count}

## Value Analyst Review (Customer Perspective)

### Findings
{List all Value Analyst findings with:}
- Issue description
- Impact on credibility/clarity
- Recommended fix
- Category (incomplete evidence, unsupported claims, etc.)

### Applied Fixes
{For each fix applied:}
- **Issue:** {description}
- **Fix:** {what was changed}
- **Rationale:** {why this fix was chosen}

### Skipped Fixes
{For any skipped:}
- **Issue:** {description}
- **Reason Skipped:** {user's justification}

## Product Manager Review (Reality Check)

### Findings
{List all Product Manager findings with:}
- Issue description
- Feasibility concern
- Risk assessment
- Recommended fix

### Applied Fixes
{For each fix applied:}
- **Issue:** {description}
- **Fix:** {what was changed}
- **Rationale:** {why this fix was chosen}

### Skipped Fixes
{For any skipped:}
- **Issue:** {description}
- **Reason Skipped:** {user's justification}

## Document Hardening Summary

**The document is now more:**
- Clear and customer-friendly (Value Analyst)
- Technically accurate and realistic (Product Manager)
- Credible with proper support/evidence
- Complete with necessary disclaimers

**Output Location:** `{output_folder}/solution-descriptions/{subject_name}_description_REVIEWED.md`

---
*Generated: {timestamp}*
*Workflow: SDA Main — Step 08: Adversarial Review*
```

### 9. Present Menu

**Phase 3: Review Board Complete ✅**

**Select an Option:**
- **[C]** Continue to Phase 4 (Synthesis & Formatting)
- **[VF]** View Review Board findings
- **[RD]** Read reviewed draft
- **[AF]** Apply additional fixes
- **[X]** Exit workflow

---

## SUCCESS METRICS

✅ Value Analyst review completed
✅ Product Manager review completed
✅ Findings presented to user
✅ User chose fix strategy
✅ Fixes applied (or consciously skipped)
✅ Document hardened against blind spots
✅ Reviewed draft saved

---

## TRANSITIONS

**Next Step:** step-09-synthesis-formatting.md (Phase 4)

---

_Step 8 of SDA Main Workflow — Phase 3: Adversarial Review_
