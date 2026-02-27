# Product Manager — Consolidated Guidance

**Focus:** Scope control, phasing, approvals/sign-offs, and "what ships when."

## Scope Control Patterns

### In Scope / Out of Scope Tables
**Standard Two-Column Format:**
```
| Impacted Area | In Scope |
|---------------|----------|
| [Category 1] | [Description of what's included] |
| [Category 2] | [Description, often with reference: "elaborated in section X.Y.Z"] |
```

```
| Impacted Area | Out of Scope |
|---------------|--------------|
| [Category] | [What's explicitly excluded, or leave empty] |
```

**Typical Categories:**
- KPIs (number and type)
- Dashboards (executive, operational)
- Alerting (anomaly detection, notifications)
- Data Export (formats, channels)
- Integrations (SSO, monitoring, enrichment)
- Additional Use Cases / Features

**Pattern:** In-scope items are specific and quantified ("The list of 18 KPIs..."); out-of-scope often brief or empty.

### Use Cases In Scope / Out of Scope Lists

**In Scope Format (Numbered List):**
```
1. [Use case 1 name/description]
2. [Use case 2 name/description]
3. [Use case 3 name/description]
4. [Use case 4 name/description]
```

**Out of Scope Format:**
- "NA" (if nothing explicitly scoped out)
- Or numbered list like in-scope

**Purpose:** Provides granular view of what user/business scenarios are supported vs. deferred.

## Phasing / Deployment Approach Patterns

### Deployment Approach Table
```
| Phase/Single Drop | Components included | Production Validation Testing (PVT) (Y/N) | PET | BRT (Y/N) |
|-------------------|---------------------|-------------------------------------------|-----|-----------|
| Phase 1a | [Component A, Component B] | Y | Y | Y |
| Phase 1b | [Component C] | Y | Y | Y |
| Phase 2 (future) | [Additional capabilities] | TBD | TBD | TBD |
```

**Key Columns:**
- **Phase/Single Drop:** Clear phase identifier
- **Components included:** What's being deployed (can be verbose: "ACE, AIM, NiFi-Core & IMS")
- **PVT (Production Validation Testing):** Y/N
- **PET (Performance/Environment Testing):** Y/N or explicit testing type
- **BRT (Business Readiness Testing):** Y/N

**Pattern:** Each phase has explicit testing gates; future phases may show TBD or be omitted entirely until planned.

### Phase Narrative Pattern
```
Different phases of deployment:
- Phase 1a – [Domain/Capability A]
- Phase 1b – [Domain/Capability B]
- Additional value-added functions will be explored as part of Phase 2 of the [initiative].
```

**Alternatives:**
```
Phase 1a: [Objective/Scope]
Phase 1b: [Objective/Scope]
Phase 2 (future): [Potential extensions]
```

**Purpose:** Communicates progressive delivery; sets expectations for what's MVP vs. future.

## Approvals & Sign-Offs Patterns

### Approvals Section (Section 4 in HLD)
Often simple heading with signature table or left blank for manual signatures.

### Sign-Off Definitions (Appendix 5.2)
**Standard Subsections:**
- 5.2.1 Enterprise Data Governance
- 5.2.2 Solution Delivery Manager
- 5.2.3 QE (Quality Engineering)
- 5.2.4 IT Delivery Owner
- 5.2.5 Business Owner
- 5.2.6 Performance Lead

**Each subsection includes:**
- **Role description:** Responsibilities of the sign-off role
- **When required:** Conditions under which this sign-off is mandatory
- **What they review:** Specific sections or criteria they evaluate

**Example Pattern:**
```
#### Enterprise Data Governance
Responsible for ensuring all data governance requirements are met, including data ownership, 
classification, retention, and compliance with organizational data policies. 

**Required when:** Project involves data collection, creation, migration, extraction, transformation, 
or any other use of data.

**Reviews:** Section 2.6 Data Governance (all 8 subsections); validates data owner assignments, 
classification, retention policies, third-party data usage.
```

### Referenced Documents Table (Front Matter)
```
| Document | Location | Date | Version |
|----------|----------|------|---------|
| *Mandatory Requirements Matrix (RM)* | <<Embedded Document>> | | |
| Cyber STARR | <<Active Link to ICSU Database>> | | |
| Use Case | <<Link to use case document>> | | |
| DA Enablement Checklist | <<Link to DA Enablement Checklist>> | | |
| Network Tables | <<Link to network tables document>> | | |
```

**Purpose:** Tracks dependencies and approval artifacts; "*Mandatory" indicates critical path items.

## Validation Gates Pattern

### Testing Gates (Per Phase)
From Deployment Approach table columns:
- **PVT (Production Validation Testing):** Functional correctness in prod-like environment
- **PET (Performance/Environment Testing):** Load, stress, scalability validation
- **BRT (Business Readiness Testing):** User acceptance, business process validation

**Pattern:** All three gates typically "Y" for production phases; may be "N" or "TBD" for POC/trials.

### Approval Gates (Per Document Section)
Key approval checkpoints:
1. **DA (Design Authority) Approval:** After Sections 1 & 2 (Business + Architecture) complete
2. **ICSU (Security) Approval:** After Section 2.7 (Security Architecture) complete; requires Cyber STARR ticket
3. **Data Governance Approval:** After Section 2.6 (Data Governance) complete; requires DG Project Intake
4. **Business Owner Approval:** After Section 1 (Business Solution Summary) reviewed
5. **Technical Stakeholder Approvals:** After Section 3 (Technical Solution Overview) complete

**Pattern:** Staged approvals—architecture approved before detailed technical work begins.

## Milestone & Timeline Patterns

### Version History as Milestone Tracker
```
| Date | Version | Changes | Name |
|------|---------|---------|------|
| 08/29/2025 | V1.0 | First Draft of HLD | [Authors] |
| 09/11/2025 | V1.4 | Update security table (section 2.7.1) | [Authors] |
| 09/24/2025 | V1.5 | Update deployment diagram; Add LDA integration; Update data classification | [Authors] |
| 10/02/2025 | V1.6 | Update KPI list; Update encryption logic; Update TLS rotation logic | [Authors] |
| 11/05/2025 | V1.9 | Update network connectivity architecture | [Authors] |
```

**Pattern:** Each version update represents a milestone (section completion, review feedback incorporation, approval gate met).

### Assumptions Table as Timeline Tracker
```
| ID | Assumption | Impacted Application | Assumption Validated (Yes/No) | Due Date (if assumption is not validated) | Impact (if assumption is not validated) |
|----|------------|----------------------|-------------------------------|-------------------------------------------|----------------------------------------|
| 1 | [Assumption] | [System] | [Y/N/TBD] | [Date or blank] | [Impact description] |
```

**Due Date column:** Acts as dependency timeline; unvalidated assumptions with dates are implicit milestones.

## Contributor Tracking (Appendix 5.1)

### List of Contributors Pattern
Simple table or bulleted list:
```
| Name | Role | Organization | Contribution |
|------|------|--------------|--------------|
| [Name] | [BA/SA/Infra SA/etc.] | [Org] | [Section/activity] |
```

Or:
```
- [Name], [Role], [Organization] – [Contribution]
```

**Purpose:** Credits work; tracks who to contact for questions on specific sections.

## Scope Change Management Patterns

### Version History Tracks Scope Evolution
**Pattern:** Each version's "Changes" column shows scope adjustments.

**Examples from corpus:**
- "Add Data Export Solution Flow" (scope addition)
- "Update Sizing: reduction to 2 LBAs per Site" (scope refinement)
- "Update Oracle" (component change)

**Implication:** Version history is the scope change log.

### Out of Scope as Future Phase Parking Lot
**Pattern:** Items listed as "Out of Scope" are often future phase candidates, not permanent exclusions.

**Example:**
```
| Impacted Area | Out of Scope |
|---------------|--------------|
| Additional AI Use Cases | Deferred to Phase 2 pending POC results |
| Mobile App Access | Future enhancement; Phase 1 is web-only |
```

**Purpose:** Manages stakeholder expectations; provides roadmap hint without commitment.

## Consolidation Rules for SDA Agent Use

1. **Scope is Two-Column Tables:** Always use In Scope / Out of Scope tables with "Impacted Area" column
2. **Use Cases are Numbered Lists:** Both in-scope and out-of-scope use cases as simple numbered lists
3. **Phasing is First-Class:** Deployment Approach table showing components + testing gates per phase
4. **Testing Gates Explicit:** PVT, PET, BRT columns per phase; Y/N/TBD values
5. **Approval Gates Staged:** Architecture approved before technical detail; security/data governance approved before implementation
6. **Sign-Off Definitions in Appendix:** Each sign-off role has definition, required-when conditions, and what they review
7. **Version History = Milestone Log:** Track scope changes, section completions, review incorporations via version history table

## Reusable Checklists

### Scope Definition Checklist
- [ ] In Scope table with specific, quantified items
- [ ] Out of Scope table (even if empty or brief)
- [ ] Use Cases In Scope (numbered list, 1-4+ items typical)
- [ ] Use Cases Out of Scope (numbered list or "NA")
- [ ] Scope references forward to detailed sections (e.g., "elaborated in section 2.4.2")

### Phasing Checklist
- [ ] Deployment Approach table with Phase/Components/PVT/PET/BRT columns
- [ ] Phase narrative in objectives or summary ("Phase 1a – [X], Phase 1b – [Y]")
- [ ] Future phases mentioned explicitly or left as "additional value-added functions"
- [ ] Each phase has clear deliverables/components list

### Approvals & Sign-Offs Checklist
- [ ] Approvals section (Section 4) present (even if blank for signatures)
- [ ] Sign-Off Definitions in Appendix (5.2) with subsections:
  - [ ] Enterprise Data Governance
  - [ ] Solution Delivery Manager
  - [ ] QE
  - [ ] IT Delivery Owner
  - [ ] Business Owner
  - [ ] Performance Lead (if applicable)
- [ ] Each sign-off definition includes role, when required, what they review
- [ ] Referenced Documents table includes Cyber STARR, DA Enablement Checklist, Requirements Matrix

### Validation Gates Checklist
- [ ] PVT (Production Validation Testing) defined per phase
- [ ] PET (Performance/Environment Testing) defined per phase
- [ ] BRT (Business Readiness Testing) defined per phase
- [ ] DA approval gate after architecture sections
- [ ] ICSU approval gate with Cyber STARR ticket reference
- [ ] Data Governance approval gate with DG Project Intake reference

### Milestone Tracking Checklist
- [ ] Version history table showing progression of work
- [ ] Assumptions table includes "Due Date" column for unvalidated assumptions
- [ ] List of Contributors in Appendix (names, roles, contributions)
- [ ] Scope changes reflected in version history "Changes" column

### Scope Change Management Checklist
- [ ] Version history documents all scope additions/changes
- [ ] Out of Scope items categorized (deferred vs. permanent exclusion; future phase hints)
- [ ] Assumptions with "Impact if not validated" column show scope risk
- [ ] Phase 2 / future mentions provide roadmap visibility without commitment
