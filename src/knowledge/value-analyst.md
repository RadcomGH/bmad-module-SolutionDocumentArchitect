# Value Analyst — Consolidated Guidance

**Focus:** Stress-test completeness: risks, constraints, governance, security, and readiness gates.

## Assumptions/Risks/Constraints Patterns

### Assumptions Table Structure
```
| ID | Assumption | Impacted Application | Assumption Validated (Yes/No) | Due Date (if assumption is not validated) | Impact (if assumption is not validated) |
|----|------------|----------------------|-------------------------------|-------------------------------------------|----------------------------------------|
| [#] | [Description] | [System/Component] | [Y/N or TBD] | [Date or blank] | [High/Medium/Low impact description] |
```

**Common Assumption Categories:**
- Sizing assumptions (traffic volumes, data rates, retention periods, monitored elements) - **Note: Project-specific sizing varies significantly; use reference docs for examples only, do not insert into new documents**
- Integration assumptions (data availability, format, frequency, quality)
- Platform assumptions (availability SLAs, resiliency, performance characteristics)
- Timeline assumptions (delivery dates, dependency readiness)

**Separate Sizing Assumptions Table (often appears immediately after main assumptions):**
> **Important:** Sizing is highly project-specific. Reference existing documents for patterns, but always gather fresh sizing requirements for each project.

```
| Sizing Assumptions: | Values |
|---------------------|--------|
| Number of [metric type] (e.g., KPIs, clusters, users) | [number] |
| Rate of [ingestion metric] (GB/h, messages/sec) | [rate] |
| Number of [elements] per [dimension] | [number] |
| [Data] Retention Period | [duration] |
```

### Risks Table Structure
```
| ID | Risk | Probability (H/M/L) | Impact (H/M/L) | Risk Owner | Impacted Stakeholders and Risk Response |
|----|------|---------------------|----------------|------------|-----------------------------------------|
| [#] | [Risk description] | [H/M/L] | [L/M/H] | [Role/Name] | [Stakeholders]; [Mitigation strategy] |
```

**Common Risk Categories:**
- **Data Quality Risks:** Dependency on external data sources; quality/availability affects outputs
- **Platform Risks:** Cloud/infrastructure availability; resiliency dependencies
- **Integration Risks:** Vendor dependency; SME availability; documentation completeness; lab access
- **Delivery Risks:** Timeline dependencies; resource availability; approval delays
- **Security Risks:** Compliance gaps; credential management; encryption/key rotation challenges

**Risk Response Patterns:**
- Mitigation: "Implement [control]; Establish [procedure]; Pre-validate [assumption]"
- Transfer: "Vendor responsible for [aspect]; SLA covers [risk]"
- Accept: "Low probability; Monitor during [phase]"
- Contingency: "Fallback to [alternative]; [Buffer] built into timeline"

### Constraints Table Structure
```
| ID | Constraint | Impacted Stakeholders |
|----|------------|----------------------|
| [#] | [Constraint description with impact statement] | [Stakeholder role/system] |
```

**Common Constraint Patterns:**
- **Data Dependency:** "Data Availability - [System] will present [outputs] based on [upstream source]. Therefore quality of [source] would affect the quality of [outputs produced]."
- **Platform Dependency:** "[Platform] Resiliency and Availability" → "Fault Tolerance of [solution component]"
- **External File Dependency:** "[Files/data] from [organization]" → "Users of [system]"
- **Compliance Constraint:** "Must adhere to [policy/standard]" → "All users/data controllers"
- **Performance Constraint:** "[Throughput/latency/capacity limit]" → "[Affected users/use cases]"

## Data Governance Patterns

### Ownership & Stewardship Tables

**Platform/Storage Ownership:**
```
| Platform Name | Storage/DB Name | Dataset Name / Schema name (optional) | Department Name | Department Owner Name (Director +) |
|---------------|-----------------|---------------------------------------|-----------------|-------------------------------------|
| [Platform] | [Storage system] | [Schema/table if applicable] | [Business dept] | [Director-level owner] |
```

**Application Ownership:**
```
| Application/System/Platform Name | Department Name | Department Owner Name (Director +) |
|----------------------------------|-----------------|-------------------------------------|
| [System] | [Business dept] | [Director-level owner] |
```

**Key Governance Principle:** All new data assets must have Director+ level data owner assigned; data ownership for business-generated data must reside with business (not IT).

### Retention & Lifecycle Patterns

**Standard Phrasing:**
- "Provide details of the data storage process utilized to retain, archive, and purge data in compliance with [organization]'s standards."
- "(i.e., X years plus current year – low latency access, high latency/offline storage of data up to Y years, and subsequent purge process)"
- "If defined, provide link to existing retention policy/framework documentation. If not defined, please follow [organization]'s retention policy schedule."
- For PoC/Trial: "[PoC duration] has been decided. The [data types] generated will be retained for the duration of the [PoC]. Solution deployed in [platform] and all data will stay there."

### Classification & Privacy Table

**PI Attribute Classification:**
```
| PI Attribute Name | PI Attribute Definition | Confidentiality Class (Restricted/Confidential/Internal/Public) | Attribute level protection method (anonymized/de-identified/clear text) | Consumer Type | Comments |
|-------------------|-----------------------|------------------------------------------------------------------|-------------------------------------------------------------------------|---------------|----------|
| [Attribute] | [Definition] | *Restricted* | *Anonymized* | [Account Type] | [Context, e.g., "During data transfer from..."] |
```

**Classification Scheme Reference:**
- **Restricted:** Unauthorized disclosure = severe harm (severe EBITDA impact, significant customer impact, regulatory sanctions, large-scale legal liabilities)
  - Examples: PII (account number, phone, address), authentication credentials, government IDs, financial account numbers
- **Confidential:** Unauthorized disclosure = moderate to significant harm (moderate business impact, regulatory fines, legal liabilities)
  - Examples: Full name, birth date, transaction history, usage details, employee compensation, architecture docs, vendor contracts
- **Internal:** Minimal harm (limited business impact)
  - Examples: Employee ID, org charts, anonymized/tokenized data
- **Public:** No harm from disclosure
  - Examples: Marketing materials, announced results

**Common Statement for Non-PI Scope:**
- "The current scope of the project is to process [data types] generated and stored by [source system]."
- "The list of [data types] shared by [organization] does not include any personal information."

### Data Quality Framework Patterns

**Standard Questions:**
- "Business Team is to define the required business standards for data quality as per project scope (i.e., provide critical data elements, data quality dimensions, and business rules for measurements)."
- "Specify if there is an existing data quality framework and if it requires modification OR if a new one will be developed for this project."
- "Provide a link to existing documented data quality framework/process."

**Common Response Pattern:**
- "[Available data validation inputs] to be discussed with [organization]"
- Or: "Data quality validated via [process/tool]; KPIs: completeness [X%], accuracy [Y%], timeliness [Z minutes]"

### Data Access & Use Table

```
| Platform/Database/Application | On-Prem and/or Cloud | Access Type (individual/M2M/prod support/etc.) | Access Pattern/Framework (Link/Description/BAU) | Access to PI elements in clear text (Yes/NO) |
|-------------------------------|----------------------|-------------------------------------------------|--------------------------------------------------|----------------------------------------------|
| [System/Service Account] | [Deployment model] | [Access type] | [Framework reference or "TBD"] | [Yes/No] |
```

**Access Type Examples:**
- Individual business access
- Machine to Machine (M2M)
- Production support
- Service account (read-only / read-write)

### Third Parties & Third-Party Data Table

```
| Vendor Name | Purpose of the Vendor | Access to PI (Yes/No) | Status (Existing/New/Out of Scope) |
|-------------|----------------------|------------------------|-------------------------------------|
| [Vendor] | [Service description] | [Yes/No] | [New/Existing/Out of Scope] |
```

**Key Note:** For new/existing vendor, CyberSTARR (CST) ticket is required. Access and transfer of data must adhere to classification and handling requirements per security standards.

### Data Residency Pattern

**Standard Question:**
"Provide the application(s) and the name(s) of the country(ies) in which the data for these application(s) is transmitted, processed, resides or will be residing."

**Example Responses:**
- "[Cloud Platform] ([Country])"
- "[On-prem datacenter] - [Location]"
- "V21, [App] – On prem [Country] | [Data Lake] – Cloud [Country]"

## Security Coverage Patterns

### Security Solution View (Cross-Reference from Technical Wizard)

Value Analyst focus: **Ensure every architectural layer has documented in-transit and at-rest encryption strategy.**

**Checklist per layer:**
- [ ] Data extraction (from source) → encryption method, key rotation policy
- [ ] Data processing (ETL/transformation) → platform-to-platform, application-level encryption, key management
- [ ] Analytics/compute layer → encryption protocols, TLS versions, rotation
- [ ] Visualization/presentation layer → user-facing encryption
- [ ] User portal/authentication → authentication methods, session security

### Authentication Coverage

**Internal vs. External Interfaces:**
- All external interfaces (data ingestion, exports, third-party integrations) must document authentication method
- Internal interfaces (component-to-component) must document authentication method
- Mark future/roadmap items explicitly with "(*) roadmap"
- Document credential rotation requirements with "(*) requires procedure for [rotation/renewal]"

### Audit Logging Standards

**Common Patterns:**
- "Audit logs per application"
- "[Component A]: [Location] - [Format: CSV/JSON/Syslog]"
- "[Component B]: [Location] - Periodic exports"
- "[Portal/API Gateway]: [Location] - Prefix with AUDIT"

Ensure: Audit logs captured for authentication events, data access, configuration changes, privilege escalation.

## Readiness & Completeness Checklists

### MVP (Minimum Viable Product) Checklist Pattern

Observed in source docs:
```
| Section / Component | Status | Reviewer | Notes |
|---------------------|--------|----------|-------|
| Business objectives defined | [✓ / ✗ / Partial] | [Role] | |
| Scope (in/out) explicit | [✓ / ✗ / Partial] | [Role] | |
| Assumptions validated | [✓ / ✗ / Partial] | [Role] | |
| Risks identified with owners | [✓ / ✗ / Partial] | [Role] | |
| Data governance complete | [✓ / ✗ / Partial] | [Data Governance Team] | |
| Security architecture reviewed | [✓ / ✗ / Partial] | [ICSU] | |
| Deployment approach documented | [✓ / ✗ / Partial] | [Infra SA] | |
```

Pattern: Tracks completeness per major document section with assigned reviewers.

### Governance Completeness Audit

**Data Governance Section (all 8 subsections must be present in HLD):**
- [ ] Data/information Ownership & Stewardship (tables completed, Director+ owners assigned)
- [ ] Data Lifecycle and Retention (policy links provided; explicit retention rules or "follows org policy")
- [ ] Metadata Management (location/link for data dictionaries specified)
- [ ] Data Classification & Privacy (PI attributes classified per confidentiality scheme; protection methods documented)
- [ ] Data Quality (framework specified or "TBD with org")
- [ ] Data Access & Use (access types and patterns documented per platform/app; PI access flagged)
- [ ] Use of Third Parties and Third-Party Data (vendor table completed; CyberSTARR ticket required if new vendor)
- [ ] Data Residency (countries/regions specified)

**Security Coverage (all subsections must be present):**
- [ ] Security Solution View (table covering all architectural layers, in-transit + at-rest encryption)
- [ ] Encryption – Data at Rest (mechanism, key management, redundancy)
- [ ] Encryption – Data in Transit (protocols, TLS versions, certificate rotation policies)
- [ ] Identity and Access Management (authentication methods, role boundaries, integration with identity provider)
- [ ] Audit Logging and Monitoring (audit log locations, formats, prefixes; monitoring hooks)

### Deployment Readiness Checklist

**Phased Deployment Pattern (from Deployment Approach table):**
```
| Phase | Components Included | PVT (Y/N) | PET | BRT (Y/N) |
|-------|---------------------|-----------|-----|-----------|
| Phase 1a | [Component list] | Y | Y | Y |
| Phase 1b | [Component list] | Y | Y | Y |
```

**Validation Per Phase:**
- [ ] PVT (Production Validation Testing) plan documented
- [ ] PET (Performance/Environment Testing) plan documented
- [ ] BRT (Business Readiness Testing) plan documented
- [ ] Rollback plan if phase fails validation
- [ ] Success criteria defined per phase

### Approvals & Sign-Offs Tracking

**Required Sign-Offs (from Appendix - Sign-Off Definitions):**
- [ ] Enterprise Data Governance (mandatory if data assets involved)
- [ ] Solution Delivery Manager
- [ ] QE (Quality Engineering)
- [ ] IT Delivery Owner
- [ ] Business Owner
- [ ] Performance Lead (if SLA/performance requirements)
- [ ] ICSU (Information & Cyber Security Unit) via CyberSTARR ticket

**Pattern:** Each sign-off role has definition in Appendix explaining their responsibilities and when they're required.

## Consolidation Rules for SDA Agent Use

1. **Assumptions ≠ Risks ≠ Constraints:** Keep strictly separated; don't conflate. Assumptions are "if false, impacts design"; Risks are "probability × impact"; Constraints are "external limitations we must work within"
2. **Governance is Non-Negotiable:** HLDs must have all 8 Data Governance subsections; instructions stay in document; tables pre-filled with placeholders
3. **Security Coverage Must Be Layered:** Use multi-row table showing each architectural layer (extraction, processing, analytics, visualization, portal) with separate in-transit and at-rest columns
4. **Ownership Must Be Director+:** Data owner assignments require Director-level or higher; business-generated data owned by business, not IT
5. **Third-Party Vendor Tracking:** All vendors must be in table with "New/Existing" status; new vendors trigger CyberSTARR requirement
6. **Classification is Specific:** Use 4-tier scheme (Restricted/Confidential/Internal/Public) with examples; document protection methods (anonymized/de-identified/clear text)
7. **Readiness = Checklists:** Use MVP/readiness checklist table format with status (✓ / ✗ / Partial) and assigned reviewers

## Reusable Audit Questions

### Assumptions Audit
- Are sizing assumptions backed by data or clearly marked as estimates?
- Is there a "Date" and "Impact if not validated" for each unvalidated assumption?
- Are integration assumptions (data format, frequency, quality) validated with upstream system owners?

### Risks Audit
- Does every risk have Probability (H/M/L) and Impact (H/M/L)?
- Is there a Risk Owner assigned to each risk?
- Are mitigations specific and actionable (not generic "monitor closely")?
- Are top risks (High probability × High impact) escalated in executive summary?

### Constraints Audit
- Does each constraint clearly state the impacted stakeholder?
- Are platform/vendor constraints validated with vendor documentation or support?
- Are compliance constraints traceable to specific policies/regulations?

### Data Governance Audit
- All 8 subsections present?
- Data owner assignments at Director+ level?
- Retention policy specified or linked?
- PI attributes classified per confidentiality scheme?
- Third-party vendors listed with CST ticket reference if new?
- Data residency (country/region) specified?

### Security Audit
- In-transit encryption documented for every interface (internal + external)?
- At-rest encryption documented for every storage layer?
- TLS versions specified (recommend 1.2+ only)?
- Certificate/key rotation policies documented?
- Authentication methods documented per interface?
- Audit logging captured for authentication, access, config changes?

### Deployment Readiness Audit
- Deployment approach table shows components per phase?
- PVT/PET/BRT plans exist or scheduled?
- Success criteria defined per phase?
- Rollback plan documented?
- All required sign-offs obtained or in-flight?
