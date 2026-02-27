# Chief Editor — Consolidated Guidance

**Focus:** Unify structure, terminology, and voice; ensure templates cover recurring required sections.

## Document Type Taxonomy

### HLD (High-Level Design)
**Typical Structure:**
```
1. Business Solution Summary (non-technical, executive-friendly)
2. Solution Architecture (logical, enterprise services, data governance mandatory)
3. Technical Solution Overview (deployment, detailed specs per application)
4. Approvals
5. Appendix
```

**Audience:** Business stakeholders, architects, enterprise review boards
**Approval Gates:** Enterprise Data Governance, Solution Architect, Business Owner, QE, IT Delivery Owner

### LLD (Low-Level Design)
**Typical Structure:**
```
1. Business Solution Summary (abbreviated from HLD)
2. Data Architecture (detailed information model, data flows)
3. Deployment Diagram (infrastructure specifics)
4. Sequence Diagram
5. [Application Name] Services (per-application deep dive)
   - Application Overview
   - Application Architecture/Design
   - Application Security Specifications
6. Operational MOPs (password rotation, runbooks)
```

**Audience:** Implementation teams, operations, infrastructure teams
**Focus Shift:** More infrastructure detail, less governance; runbooks and MOPs appear here

### Presentation / Integration Requirements
**Typical Structure (slide deck):**
```
- Agenda slide
- Integration: [Category A] (pattern + requirements bullets)
- Integration: [Category B]
- [Other Topics: SSO, Alarms, Monitoring, Client Rollout]
- Thank You slide
- Appendix (if applicable: Geo Redundancy, Uplifts)
```

**Audience:** Technical stakeholders, integration SMEs, vendors
**Format:** Bullet-heavy, concise; requirements explicitly separated (e.g., "MaveriQ documentation – Vendor Provided / Files conversion – Customer")

## Standard Heading Hierarchies

### HLD Heading Spine
```
# [H1] Business Solution Summary
## [H2] Project Objectives
## [H2] Solution Summary
### [H3] *Mandatory Requirements Matrix (RM)
## [H2] Scope Statement
### [H3] In scope
### [H3] Out of Scope
### [H3] Use Cases in Scope
### [H3] Use Cases Out of Scope
## [H2] Assumptions, Risks & Constraints
### [H3] Assumptions
### [H3] Risks
### [H3] Constraints/dependencies/limitations
## [H2] Business Considerations
## [H2] Deployment Approach

# [H1] Solution Architecture
## [H2] Project Context
### [H3] In-Scope Applications
## [H2] Application Communication
## [H2] Enterprise Services
## [H2] Use Case Realization
### [H3] Business Processes
### [H3] Performance KPIs
### [H3] Executive Dashboards
### [H3] AI Based Alerting Dashboards (or similar outcome-focused headings)
## [H2] Data Architecture
### [H3] Information Model
#### [H4] [Component A]
#### [H4] [Component B]
### [H3] Data Flow Diagram
### [H3] Data Integration Details
### [H3] Data Container Details
### [H3] Information Objects Utilized
## [H2] Data Governance (Mandatory)*
### [H3] Data/information Ownership & Stewardship
### [H3] Data Lifecycle and Retention
### [H3] Metadata Management
### [H3] Data Classification & Privacy
### [H3] Data Quality
### [H3] Data Access & Use
### [H3] Use of Third Parties and Third-Party Data
### [H3] Data Residency
## [H2] Security Architecture
### [H3] Security Solution View
### [H3] Encryption – Data at Rest
### [H3] Encryption – Data in Transit
### [H3] Identity and Access Management
### [H3] Audit Logging and Monitoring
## [H2] Other Architectural Characteristics
### [H3] Availability, Scalability, Reliability and Maintainability
### [H3] Disaster Recovery
### [H3] Response Time
### [H3] Industry Compliance
### [H3] Volumetric & Service Level Agreement - High Level Impact Analysis
### [H3] Enterprise Application Monitoring

# [H1] Technical Solution Overview
## [H2] Deployment Diagram [Vendor/Platform]
## [H2] Sequence Diagram
## [H2] [Application Name] Services
### [H3] Application Overview
### [H3] Application architecture/design
### [H3] Application Security Specifications
## [H2] Infrastructure Solution
### [H3] Solution Deployment Diagram
### [H3] High Level Technical Solution
## [H2] Infrastructure Design
### [H3] Current State
### [H3] Future State
### [H3] Deployment Approach

# [H1] Approvals
# [H1] Appendix
## [H2] List of Contributors
## [H2] Sign-Off Definitions
### [H3] Enterprise Data Governance
### [H3] Solution Delivery Manager
### [H3] QE
### [H3] IT Delivery Owner
### [H3] Business Owner
### [H3] Performance Lead
## [H2] Document Abbreviations
```

### LLD Heading Spine
```
# [H1] Business Solution Summary
## [H2] Project Objectives
## [H2] Solution Summary
### [H3] *Mandatory Requirements Matrix (RM)
## [H2] Data Architecture
### [H3] Information Model
#### [H4] [Component descriptions with deployment platform markers: VM/GKE]
### [H3] Data Flow Diagram
### [H3] Data Integration Details
### [H3] Data Container Details
### [H3] Information Objects Utilized
## [H2] Deployment Diagram [Vendor/Platform]
## [H2] Sequence Diagram
## [H2] [Application Name] Services
### [H3] Application Overview
### [H3] Application architecture/design
### [H3] Application Security Specifications
## [H2] Vault password rotation MOP (or similar operational runbook section)
### [H3] [Per-component rotation procedures]
```

Note: LLDs often skip the extensive Data Governance section since it's covered in HLD.

## Terminology Normalization

### Common Abbreviations & Conventions
- **BSA:** Business Systems Analyst
- **SA:** Solution Architect
- **DA:** Design Authority
- **ICSU:** Information & Cyber Security Unit
- **HLD:** High-Level Design
- **LLD:** Low-Level Design
- **RM:** Requirements Matrix (mandatory)
- **PVT:** Production Validation Testing
- **PET:** Performance/Environment Testing
- **BRT:** Business Readiness Testing
- **PoC:** Proof of Concept
- **MVP:** Minimum Viable Product
- **SLA/SLO:** Service Level Agreement/Objective
- **DR:** Disaster Recovery
- **CI/CD:** Continuous Integration/Continuous Deployment
- **IaC:** Infrastructure as Code
- **ETL:** Extract, Transform, Load
- **VPC:** Virtual Private Cloud
- **OAM:** Operations, Administration, Management
- **ALB/NLB:** Application/Network Load Balancer

### Consistent Component Naming Patterns
- **Data Collector / ETL Module:** Ingestion component
- **Data Warehouse / Analytical DB:** Storage for aggregated metrics
- **Object Storage:** Unstructured/blob storage
- **State DB / Settings DB:** Configuration and user profiles
- **Cache DB:** In-memory fast access layer
- **Management Services / Orchestration:** Control plane components
- **Visualization Layer / Dashboard Tool:** Presentation/UI layer
- **Enrichment Services:** Data augmentation/mapping
- **Processing / Routing:** Data mediation and transformation

Pattern: Use "/" to show equivalence (e.g., "Data Collector / ETL Module" = same concept, different naming)

## Voice & Style Guidelines

### Imperative vs. Descriptive Voice

**Imperative (instructions, embedded notes):**
- "Provide links and version dates to the additional documents listed below."
- "Submit a [tool] Project Intake after HLD Review meeting with Data Governance Team."
- "If a Project Intake has already been submitted, then provide the link to the existing request:"
- "Document logical view of deployment (e.g., if servers need to be load balanced, clustered, or deployed in DR environment)."

**Descriptive (solution description):**
- "The proposed solution ingests [data], applies [transformation], and generates [outputs]."
- "[Component] facilitates periodic ingestion and processing of time-series data."
- "Acts as the analytical data warehouse with high throughput for incoming/outgoing data."

Pattern: Instructions and template guidance use imperative; actual solution content uses descriptive present tense.

### Placeholder Conventions

**Embedded Placeholders in Templates:**
- `<<Placeholder text with action or link>>`
- `<<For [role] to provide approval, the accompanying [ticket type] number must be completed and accessible>>`
- `<If [condition], then [details]>`
- `[VENDOR]` or `[CUSTOMER to Fill]` markers for vendor-contributed vs. customer-contributed sections

**Table Placeholders:**
- Use dropdown hints: `Choose an item.`
- Use role indicators: `[ROGERS to Fill]`, `[RADCOM]`
- Leave empty rows with `|  |  |  |` for future additions

### Handling Vendor-Contributed Sections

Pattern observed: Sections often marked `[VENDOR]` or `**[VENDOR]**` to indicate that vendor provides the content (e.g., deployment, architecture diagrams, component descriptions)

## Table Formatting Standards

### Markdown Table Rules
1. Use `|---|---|---|` separator line after headers
2. Cell content can include:
   - Bullet lists (for multi-item cells)
   - Line breaks `<br>` (in HTML export or Word)
   - Bold `**text**` for emphasis
   - Italics `*text*` for notes like `*(Y/N)*`, `*(H/M/L)*`
   - Inline code or protocol names (e.g., `TLS 1.2/1.3`)

### Common Table Archetypes

**Two-Column Definition Table:**
```
| [Attribute] | [Value/Description] |
|-------------|---------------------|
```
Use for: key-value pairs, simple mappings

**Multi-Column Tracking Table:**
```
| ID | [Entity] | [Attribute 1] | [Attribute 2] | [Owner] | [Notes/Impact] |
|----|----------|---------------|---------------|---------|----------------|
```
Use for: assumptions, risks, constraints, requirements

**Layered Security/Architecture Table:**
```
| No. | Layer | Interface | [Technical Detail 1] | [Technical Detail 2] |
|-----|-------|-----------|----------------------|----------------------|
```
Use for: multi-layer architecture with numbered rows

**Mapping/Inventory Table:**
```
| [Entity A] | [Entity B] | [Relationship/Description] |
|------------|------------|----------------------------|
```
Use for: application communication, data flows, component-to-subnet mappings

## Document Metadata Patterns

### Version History Table Template
```
| Date | Version | Changes | Name |
|------|---------|---------|------|
| [MM/DD/YYYY] | V[major].[minor] | [Concise description] | [Author(s)] |
```
Versions increment: V1.0 (initial) → V1.4 (updates) → V1.10 (more updates) — not strictly semantic but generally incremental

### Referenced Documents Table Template
```
| Document | Location | Date | Version |
|----------|----------|------|---------|
| *Mandatory Requirements Matrix (RM)* | <<Embedded Document>> | | |
| Cyber STARR | <<Active Link to ICSU Database>> | | |
| Use Case | <<Link to use case document>> | | |
| DA Enablement Checklist | <<Link to DA Enablement Checklist>> | | |
| Network Tables | <<Link to network tables document>> | | |
```

Asterisk `*` indicates mandatory; `<<Placeholder>>` used for links to be provided

### Document Naming/Versioning Table
```
| Document Versioning | Convention |
|---------------------|------------|
| Document Name | Project-id Project-name Deliverable-name.doc |
| Work in progress file with date stamp | Project-id Project-name Deliverable-name - vyyyy-mm-dd.doc |
| Work in progress file with tracked updates | Project-id Project-name Deliverable-name - vyyyy-mm-dd Name-Initials.doc |
| Versioned file | Project-id Project-name Deliverable-name - v1.0.doc |
```

## Data Governance Section (Mandatory for HLDs)

Every HLD must include this section with **all subsections**, even if stating "NA" or referencing external documentation.

**Standard Instruction Block:**
```
IT IS IMPORTANT TO RETAIN THE INSTRUCTIONS IN ALL THE DATA GOVERNANCE SECTIONS. PLEASE DO NOT DELETE.

PROVIDE REQUIRED INFORMATION IN ALL DG SECTIONS FOR PROGRAMS/PROJECTS INVOLVING DATA COLLECTION, 
CREATION, MIGRATION, EXTRACTION, TRANSFORMATION, LANDING or ANY OTHER USE OF DATA.

IF YOUR PROJECT SCOPE DOES NOT INCLUDE ACTIVITIES LISTED ABOVE, DO NOT LEAVE SECTIONS BLANK NOR PROVIDE 
COMMENTS SUCH AS "NOT APPLICABLE (N/A)" OR "BUSINESS AS USUAL (BAU)" WITHOUT JUSTIFICATIONS. 
PLEASE ENGAGE **ENTERPRISE DATA GOVERNANCE** via EMAIL: [contact email]
```

**Required Subsections (in order):**
1. Data/information Ownership & Stewardship
2. Data Lifecycle and Retention
3. Metadata Management
4. Data Classification & Privacy
5. Data Quality
6. Data Access & Use
7. Use of Third Parties and Third-Party Data
8. Data Residency

Each subsection has:
- Instructions in plain text or bullet format
- One or more tables for completion
- Links to relevant policies/standards

### Data Classification Table (Detailed Example)

Observed: Large table with four columns showing confidentiality classes, characteristics, and examples

```
| Classification Scheme | | |
|-----------------------|---|---|
| **Confidentiality Class** | **Characteristics** | **Examples** |
| **Restricted** | Unauthorized disclosure may result in severe harm:<br>• Severe EBITDA impact<br>• Significant customer impact<br>• Regulatory sanctions<br>• Large-scale legal liabilities | **Customer Data - PII**<br>• Account Number<br>• Phone Number<br>• Residential address<br>**Customer Authentication**<br>• Passwords<br>• PINs<br>**Government Issued ID Numbers**<br>• SIN, Driver's License, Passport<br>**Financial Account Numbers**<br>• Bank Account, Payment card numbers |
| **Confidential** | Unauthorized disclosure may result in moderate to significant harm:<br>• Moderate business impact<br>• Customer impact<br>• Regulatory investigations/fines | **Customer Data**<br>• Full Name, Birth date, Product transactions<br>• Usage details (call history, Internet activity)<br>**Employee Information**<br>• Address, Phone, Email, Compensation<br>**Corporate Information**<br>• Audit reports, Architecture docs, Vendor contracts |
| **Internal** | Minimal harm:<br>• Limited business impact<br>• Minimal customer impact | **Corporate Information - Internal**<br>• Company Policy<br>• Organization charts<br>• Anonymized/tokenized/encrypted data<br>**Employee Information**<br>• Employee ID, Job Level |
| **Public** | No harm from public disclosure | **Corporate Information - Public**<br>• Marketing information<br>• Announced financial results |
```

Pattern: Multi-level nested bullets within cells; bold for category headers

## Presentation (Slide Deck) Patterns

### Slide Titles
- **Agenda** (first content slide after title)
- **Integration: [Category Name]** (pattern for each integration topic)
- **[Feature/Component] Overview** (architecture or component introduction)
- **Thank You** (closing slide)

### Bullet Style
- Prefix with `▪` or `-` or `*` (varies by tool)
- Indent sub-bullets with 2-4 spaces
- Keep bullets concise (5-10 words per bullet ideal)

### Requirements Bullets Pattern
```
▪ Requirements
  ▪ [Item 1 documentation] – [Responsible party]
  ▪ [Item 2 conversion/preparation] – [Responsible party]
  ▪ [Item 3 delivery/placement] - [Responsible party]
```

Example:
```
▪ Requirements
  ▪ Documentation – Vendor Provided
  ▪ Files to be converted to format X – Customer
  ▪ Files to be placed in landing zone - Customer
```

Pattern: Responsibilities clearly assigned with "Vendor Provided" vs. "Customer" (or "TBD" if undecided)

### Integration Slide Pattern
```
Slide Title: Integration: [Topic Name]

▪ [High-level description of integration]
  ▪ [Detail A]
  ▪ [Detail B]

▪ [Integration approach]
  ▪ [Tool/method]

▪ Requirements
  ▪ [Requirement 1] – [Owner]
  ▪ [Requirement 2] - [Owner]
```

## Consolidation Rules for SDA Agent Use

1. **Three Document Types:** HLD (governance-heavy), LLD (operations-heavy), Presentation (integration-focused); each has distinct heading spine
2. **Heading Hierarchy is Sacred:** Always use the standard spine; insert new subsections within existing hierarchy rather than creating new top-level sections
3. **Terminology Consistency:** Maintain abbreviation list in appendix; use "/" notation to show equivalence (e.g., "ETL Module / Data Collector")
4. **Placeholders are Instructions:** Use `<<Action>>` for embedded instructions; use `[ROLE]` to indicate who provides content
5. **Data Governance is Mandatory:** HLDs must include all 8 DG subsections; instructions stay in document; tables pre-formatted
6. **Table Formatting:** Separator line `|---|---|` after headers; use bold/italics for emphasis; multi-line cells allowed in complex tables
7. **Version Control Front and Center:** Version history table comes before everything; tracks all changes with author names

## Reusable Checklists

### HLD Completeness
- [ ] Version history table (all changes documented)
- [ ] Document naming/versioning conventions table
- [ ] Purpose and "how to complete" instructions
- [ ] Referenced documents table (links to RM, Cyber STARR, Use Case, DA Checklist)
- [ ] Business Solution Summary (objectives, summary, scope, assumptions/risks/constraints, deployment approach)
- [ ] Solution Architecture (project context, app communication, use case realization, data architecture, data governance mandatory*)
- [ ] Security architecture (solution view, encryption at rest/in transit, IAM, audit logging)
- [ ] Technical solution overview (deployment diagrams, per-application deep dives)
- [ ] Approvals section
- [ ] Appendix (contributors, sign-off definitions, abbreviations)

### LLD Completeness
- [ ] Version history table
- [ ] Document naming/versioning conventions
- [ ] Purpose and instructions
- [ ] Referenced documents table
- [ ] Business solution summary (abbreviated)
- [ ] Data architecture (detailed information model with platform markers: VM/GKE/etc.)
- [ ] Deployment diagram (infrastructure specifics: VPC/subnets/CIDR/components)
- [ ] Sequence diagram
- [ ] Per-application services sections (overview, architecture, security specs)
- [ ] Operational MOPs (password rotation, runbooks per component)

### Presentation Completeness
- [ ] Agenda slide
- [ ] Integration slides (one per category: enrichment, monitoring, audit logs, SSO, etc.)
- [ ] Requirements bullets per slide (with responsibility assignment: Vendor/Customer/TBD)
- [ ] Thank you slide
- [ ] Appendix (if needed: geo redundancy, uplifts, detailed flows)

### Editorial Review Checklist
- [ ] Consistent heading hierarchy per document type
- [ ] Terminology consistent with abbreviations list
- [ ] All placeholders either filled or marked with responsible party
- [ ] Tables formatted with separator line and proper column alignment
- [ ] Vendor-contributed sections marked with `[VENDOR]` or equivalent
- [ ] Instructions retained in Data Governance sections (HLD only)
- [ ] Voice consistent: imperative for instructions, descriptive for solution narrative
- [ ] Version history updated with current change

