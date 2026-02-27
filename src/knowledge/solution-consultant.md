# Solution Consultant — Consolidated Guidance

**Focus:** Problem framing, scope boundaries, stakeholder alignment, and phased delivery outcomes.

## Observed Document Structure Patterns

### Document Control (Front Matter)
Every HLD/LLD starts with mandatory control sections:

**Version History Table:**
```
| Date | Version | Changes | Name |
```
- Track evolution over time with clear change descriptions
- Versions use semantic numbering (v1.0, v1.4, v1.5)

**Document Naming Convention Table:**
```
| Document Versioning | Convention |
| Document Name | Project-id Project-name Deliverable-name.doc |
| Work in progress with date | Project-id Project-name Deliverable-name - vyyyy-mm-dd.doc |
| Work in progress with tracked updates | ...Name-Initials.doc |
| Versioned file | ...v1.0.doc |
```

**Purpose and Completion Instructions:**
- "Purpose of the document" section explaining document role
- "How to complete this document" with role assignments (BSA, SA, Infra SA, ICSU)
- Clear approval workflow references

### Business Solution Summary Structure

Pattern: This is always Section 1 and contains these subsections in order:

1. **Project Objectives**
   - Phrased as capability demonstrations: "To demonstrate the value of applying [technology] to [data source] to automatically generate [outcomes]"
   - Action-oriented outcomes: "proactively detect", "deliver smart alerts", "enable faster decision-making", "reduce operational noise"
   - Often includes phasing: "Phase 1a – [scope]", "Phase 1b – [scope]", "Additional value-added functions in Phase 2"

2. **Solution Summary**
   - Opening pattern: "The proposed solution ingests [data sources], applies [technology/models] to [action], and generates [outputs]"
   - Differentiator statement: "Unlike traditional [approach], the [new approach]:"
   - Bullet list of key differentiators (3-5 items)
   - Closing: Executive/operational value statement

3. **Referenced Documents Table**
   ```
   | Document | Location | Date | Version |
   | Requirements Matrix (RM)* | <<Embedded Document>> | | |
   | Cyber STARR | <<Active Link>> | | |
   | Use Case | <<Link>> | | |
   | DA Enablement Checklist | <<Link>> | | |
   | Network Tables | <<Link>> | | |
   ```
   - Asterisk indicates mandatory

4. **Scope Statement** — Critical pattern with subsections:

   **4a. In Scope Table:**
   ```
   | Impacted Area | In Scope |
   |---------------|----------|
   | [Category 1]  | [Description] |
   | [Category 2]  | [Description] |
   ```
   Example categories: KPIs, Executive Dashboards, AI-Based Alerting, Data Export

   **4b. Out of Scope Table:**
   ```
   | Impacted Area | Out of Scope |
   |---------------|--------------|
   | [Area]        | [Description or leave empty if nothing explicitly out] |
   ```

   **4c. Use Cases In Scope:**
   - Numbered list (1. 2. 3. etc.)
   - Succinct one-line descriptions

   **4d. Use Cases Out of Scope:**
   - Same format or "NA"

5. **Assumptions, Risks & Constraints** — Three separate subsections:

   **5a. Assumptions Table:**
   ```
   | ID | Assumption | Impacted Application | Assumption Validated (Yes/No) | Due Date (if not validated) | Impact (if not validated) |
   ```
   - Often includes a separate "Sizing Assumptions" or "Traffic Volume Assumptions" table immediately after

   **5b. Risks Table:**
   ```
   | ID | Risk | Probability (H/M/L) | Impact (H/M/L) | Risk Owner | Impacted Stakeholders and Risk Response |
   ```

   **5c. Constraints/Dependencies/Limitations Table:**
   ```
   | ID | Constraint | Impacted Stakeholders |
   ```
   - Examples: Data availability/quality dependencies, platform resiliency, external file dependencies

6. **Business Considerations**
   - Often "NA" or brief statement

7. **Deployment Approach Table:**
   ```
   | Phase/Single Drop | Components included | Production Validation Testing (PVT) (Y/N) | PET | BRT (Y/N) |
   ```
   - Clearly shows what's enabled by phase

## Phrasing Templates

### Objective Statements
```
To demonstrate the value of [applying technology X] to [organization]'s existing [data source] 
to automatically generate [outcome 1], proactively [outcome 2], and deliver [outcome 3] 
that enable [business benefit 1], reduce [pain point], and improve [strategic goal].

[Vendor]'s role is to integrate with [data sources], mediate the information, and deliver 
actionable insights through [delivery mechanism].
```

### Solution Opening
```
The proposed solution ingests [data types], applies [AI/ML/processing models] to 
[identify/detect/generate X], and generates [primary outputs]. Unlike traditional 
[old approach]-based [domain], the [new engine]:
```

### Scope Pattern – In Scope
```
| Impacted Area | In Scope |
| KPIs | The list of [N] KPIs [brief qualifier] (elaborated in section X.Y.Z) |
| Dashboards | [Type] dashboards for [audience/purpose] |
| Alerting | [Detection approach]-based [alert type] |
| Export | [Output format] notification via [channel] |
```

### Phasing Pattern
```
Different phases of deployment:
- Phase 1a – [Domain A] Monitoring
- Phase 1b – [Domain B] Monitoring
- Additional value-added functions will be explored as part of Phase 2 of the [initiative type].
```

### Assumptions – Sizing Example
```
| Sizing Assumptions: | Values |
| Number of [metric type] | [number] |
| Rate of [data ingest metric] | [rate] |
| Number of [elements monitored] | [number] |
| [Dimension] per [cluster/element] | [number] |
| [Data] Retention Period | [duration] |
```

### Risk Statement Pattern
```
| ID | Risk | Probability | Impact | Risk Owner | Impacted Stakeholders and Risk Response |
| 1 | [Data/Platform] [availability/quality/resiliency issue] - [description of dependency] | [H/M/L] | [L/M/H] | [Role/Team] | [Stakeholder]; [Mitigation approach] |
```

### Constraint Pattern
```
| ID | Constraint | Impacted Stakeholders |
| 1 | Data [Availability/Quality] - [System] will [depend on/present based on] [external source]. Therefore [quality/availability] of [source] would affect [outcome]. | Users of [System] |
| 2 | [Platform] Resiliency and Availability | Fault Tolerance of [solution component] |
| 3 | [External files/inputs] from [Organization] | Users of [System] |
```

## Section Flow (High-Level Document Spine)

**Standard HLD Outline (Enterprise Pattern):**
```
1. Business Solution Summary
   1.1 Project Objectives
   1.2 Solution Summary
       *Mandatory Requirements Matrix (RM)
   1.3 Scope Statement
       1.3.1 In scope
       1.3.2 Out of Scope
       1.3.3 Use Cases in Scope
       1.3.4 Use Cases Out of Scope
   1.4 Assumptions, Risks & Constraints
       1.4.1 Assumptions
       1.4.2 Risks
       1.4.3 Constraints/dependencies/limitations
   1.5 Business Considerations
   1.6 Deployment Approach

2. Solution Architecture
   [detailed architecture content]

3. Technical Solution Overview
   [detailed technical content]

4. Approvals
5. Appendix
```

## Key Governance Patterns

### Approval Section Structure
```
4. Approvals

5. Appendix
   5.1 List of Contributors
   5.2 Sign-Off Definitions
       5.2.1 Enterprise Data Governance
       5.2.2 Solution Delivery Manager
       5.2.3 QE
       5.2.4 IT Delivery Owner
       5.2.5 Business Owner
       5.2.6 Performance Lead
   5.3 Document Abbreviations
```

## Consolidation Rules for SDA Agent Use

1. **Problem Statement:** Open with "To demonstrate the value of..." pattern showing transformation from current state to desired outcomes
2. **Phasing is First-Class:** Always capture what's enabled/disabled per phase in a table
3. **Scope Boundaries:** Use two-column tables (In Scope | Out of Scope) as guardrails; be explicit about what you're NOT doing
4. **Assumptions ≠ Risks:** Assumptions are "if false, changes design"; Risks are "probability of bad outcome"
5. **Stakeholder Traceability:** Every assumption/risk/constraint names an owner or impacted party
6. **Version Control Front and Center:** Lead with version history table to show document evolution

## Reusable Checklists

### Have you covered?
- [ ] Version history table with clear change descriptions
- [ ] Document naming/versioning conventions
- [ ] Purpose and "how to complete" instructions
- [ ] Phasing clearly called out (if applicable)
- [ ] In-scope and out-of-scope explicitly stated in tables
- [ ] Use cases enumerated (both in and out)
- [ ] Assumptions table with validation status and impact columns
- [ ] Risks table with probability, impact, owner
- [ ] Constraints table with impacted stakeholders
- [ ] Deployment approach table showing components per phase
- [ ] Referenced documents table with links/versions
- [ ] Approval workflow and sign-off definitions in appendix

### Document Control Checklist
- [ ] Clear role assignments (who completes what sections)
- [ ] Approval workflow defined
- [ ] Hosting location specified (e.g., "hosted on Project website for collaborative updates")
- [ ] Links to related artifacts (Requirements Matrix, Cyber STARR, Use Case, DA Enablement Checklist)
