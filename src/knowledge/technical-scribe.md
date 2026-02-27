# Technical Scribe — Consolidated Guidance

**Focus:** Turn the extracted structure into a coherent technical narrative order that reviewers expect.

## Documenting Complex Component Architectures

When documenting multi-component distributed systems:

### Component Documentation Pattern
For each major component or subsystem:

1. **Overview Section:**
   - Purpose statement
   - Position in overall architecture
   - Key capabilities

2. **Component Inventory Table:**
   ```markdown
   | Component | Type | Role | Key Responsibilities |
   ```

3. **Integration Architecture:**
   - Data flow diagrams (textual or Mermaid)
   - API contracts and protocols
   - Message queue patterns
   - Database access patterns

4. **Deployment Architecture:**
   - Where components run (site topology)
   - Scaling patterns
   - HA/DR considerations

### Criticality Documentation
Always document component criticality for operational teams:
- **CRITICAL:** Service down = system down or major functionality loss
- **HIGH:** Service down = degraded functionality, no new data
- **MEDIUM:** Service down = specific features unavailable
- **LOW:** Service down = minimal impact

### Multi-Site Architecture Documentation
For distributed deployments across site types:
```markdown
| Site Type | Primary Function | Key Components | Data Flow |
```

Example reference: `reference-docs/02-architecture-and-design/radcom-ace-component-architecture.md`

---

## HA/DR Documentation Structure

For High Availability and Disaster Recovery sections, reference: `reference-docs/04-operations-and-risks/ha-dr-architecture-patterns.md`

### Standard HA/DR Section Outline

1. **Overview (2-3 sentences)**
   - Solution context
   - HA/DR design philosophy
   -Key resilience capabilities

2. **Architecture Model**
   - Active-active vs. active-passive
   - N+K redundancy or 1+1 mirroring
   - Geographic distribution

3. **Failover Mechanisms**
   - Automatic vs. manual triggers
   - Detection methods (health checks, monitoring)
   - Switchover process and timing

4. **Recovery Objectives**
   - **RTO:** Time to restore service
   - **RPO:** Maximum data loss window
   - Include tier/category context

5. **Infrastructure Dependencies**
   - Platform requirements (Kubernetes, cloud provider)
   - Storage requirements (persistent volumes, object storage)
   - Networking requirements (cross-site connectivity, LB, DNS)

6. **Data Replication Strategy**
   - Database replication (sync/async)
   - Message queue buffering
   - File/backup replication

7. **Testing & Validation** (optional but recommended)
   - DR test schedule
   - Validation procedures

### HA/DR Table Format

Use comprehensive table for executive summary:

```markdown
| HA/DR Aspect | Strategy Description |
|--------------|---------------------|
| **Architecture Model** | ... |
| **Failover Mechanisms** | ... |
| **Recovery Time Objective (RTO)** | ... |
| **Recovery Point Objective (RPO)** | ... |
| **Infrastructure & Cloud Dependencies** | ... |
```

### Key Phrasing Patterns

**Resilience statement:**
> "[Solution] leverages an active-active geo-redundant architecture to ensure continuous service availability. Both sites actively process traffic, eliminating single points of failure."

**RTO statement:**
> "**RTO: [X] minutes/hours** for full site failover. The DR site is brought online within [timeframe] of primary site outage, [initiated manually / triggered automatically]."

**RPO statement:**
> "**RPO: Near-zero** data loss. All [data type] is replicated across sites in real time, and state is stored in redundant [databases] to prevent data loss on failures."

---

## Standard Document Flow (HLD)

### Section 1: Business Solution Summary
**Audience:** Business stakeholders, executives, approvers
**Voice:** Executive-friendly, outcome-oriented, non-technical
**Sequence:**
1. Project Objectives (the "why" + desired outcomes)
2. Solution Summary (the "what" + differentiators)
3. Referenced Documents (RM, Cyber STARR, Use Case, DA Checklist, Network Tables)
4. Scope Statement (in/out tables + use cases in/out)
5. Assumptions, Risks & Constraints (separate subsections with tables)
6. Business Considerations (often brief or NA)
7. Deployment Approach (phase table showing components + testing gates)

**Narrative Arc:** Problem → Solution → Scope → Risks/Assumptions → Plan

### Section 2: Solution Architecture
**Audience:** Architects, data governance, security reviewers
**Voice:** Technical but still logical/conceptual (not implementation detail)
**Sequence:**
1. Project Context (hosting, integration points, end-to-end coverage narrative)
2. In-Scope Applications (component inventory with functionality)
3. Application Communication (interface table)
4. Enterprise Services (dependencies on shared services)
5. Use Case Realization
   - Business Processes (TMForum mapping or NA)
   - Performance KPIs (formula table)
   - Executive Dashboards (deliverables list)
   - AI-Based Alerting / Advanced Analytics (if applicable)
6. Data Architecture
   - Information Model (component-by-component descriptions)
   - Data Flow Diagram (numbered flows)
   - Data Integration Details (interface table)
   - Data Container Details (database/storage inventory)
   - Information Objects Utilized (or NA)
7. Data Governance (Mandatory)* — 8 subsections (ownership, lifecycle, metadata, classification, quality, access, third parties, residency)
8. Security Architecture
   - Security Solution View (layered table)
   - Encryption – Data at Rest
   - Encryption – Data in Transit
   - Identity and Access Management
   - Audit Logging and Monitoring
9. Other Architectural Characteristics
   - Availability, Scalability, Reliability, Maintainability
   - Disaster Recovery
   - Response Time
   - Industry Compliance
   - Volumetric & SLA Impact Analysis
   - Enterprise Application Monitoring

**Narrative Arc:** Context → Applications → Data → Governance → Security → Non-Functional Requirements

### Section 3: Technical Solution Overview
**Audience:** Implementation teams, infrastructure engineers, operations
**Voice:** Implementation-focused, detailed, prescriptive
**Sequence:**
1. Deployment Diagram [Vendor/Platform]
   - Network VPC/Subnets structure
   - CIDR mappings
   - Component-to-subnet mappings
   - Load balancer / gateway configuration
2. Sequence Diagram (interaction flows)
3. [Application Name] Services (repeat per application)
   - Application Overview (components + 3rd party services table)
   - Application Architecture/Design (changes to existing app)
   - Application Security Specifications (security group rules table)
4. Infrastructure Solution
   - Solution Deployment Diagram
   - High Level Technical Solution
5. Infrastructure Design
   - Current State
   - Future State
   - Deployment Approach

**Narrative Arc:** Deployment Infrastructure → Per-Application Detail → Security Rules → State Transition

### Section 4: Approvals
Simple section; may be blank or have signature table

### Section 5: Appendix
- List of Contributors
- Sign-Off Definitions (per role: Data Governance, SDM, QE, IT Owner, Business Owner, Performance Lead)
- Document Abbreviations

**Purpose:** Reference material, governance, credits

## Standard Document Flow (LLD)

Simplified structure focusing on implementation:

### Section 1: Business Solution Summary (Abbreviated)
- Project Objectives
- Solution Summary
- Data Architecture (detailed information model with platform markers)

### Section 2: Deployment Details
- Deployment Diagram [Vendor]
- Sequence Diagram
- [Application] Services (overview, architecture, security specs)

### Section 3: Operational Runbooks
- Vault password rotation MOP (per component)
- Other operational procedures

**Key Difference from HLD:** No extensive Data Governance section; more operational detail (MOPs, runbooks); component descriptions include platform markers (VM/GKE/etc.)

## Narrative Conventions

### Opening a Section: Context-Setting Pattern
Start each major section with high-level narrative before diving into tables/details.

**Example (Data Architecture):**
"The diagram below depicts the logical architecture of [solution], including [data acquisition], [processing], and [end-user applications] for [outcomes]."

**Example (Security Architecture):**
"<<For [compliance body] to provide approval, the accompanying [compliance ticket type] number must be completed and accessible>>"

"[Organization] to update" (if pending customer input)

### Closing a Section: Summary or Forward Reference
End complex sections with summary statement or pointer to next section.

**Example:**
"This [encryption/security/deployment] approach enables [outcome], tailored for [organization]'s [requirement] needs."

### Handling Vendor-Contributed Content
Mark sections with `[VENDOR]` or `**[VENDOR]**` to indicate vendor provides content.

**Example:**
"**[VENDOR]** The scope of this PoC encompasses..."

### Using Tables vs. Prose

**Use tables for:**
- Inventories (components, services, interfaces)
- Requirements tracking (assumptions, risks, constraints)
- Security specifications (rules, encryption methods, auth)
- Governance (ownership, classification, retention)
- Comparisons (current state vs. future state)

**Use prose for:**
- Problem statements / objectives
- Solution summaries / differentiators
- Context-setting narratives
- Flow descriptions (supplementing diagrams)
- Closing summaries

**Use hybrid (bullets in table cells) for:**
- Multi-faceted functionality descriptions
- Step-by-step process flows within structured table
- Encryption details (Infra: X / Application: Y / Supported)

## Transitions Between Sections

### Business → Architecture Transition
After completing business section (objectives, scope, risks, deployment approach), introduce architecture with:

Pattern: "Architecture Section" heading; optionally "# Solution Architecture" as H1

Opening: "## Project Context" providing narrative of hosting, integration, coverage

### Architecture → Technical Transition
After completing architecture (logical design, data governance, security), introduce technical with:

Pattern: "Technical Section" heading; "# Technical Solution Overview" as H1

Opening: "<<Describe technical solution including integration, interfaces, table changes, reference table changes etc.>>"

Then: "For New/Modified/Decommissioned Interfaces:" table

### Within Architecture: Data → Governance → Security Flow
Smooth transition: Data Architecture concludes with information objects → Data Governance opens with ownership (natural bridge from "what data" to "who owns it") → Security opens with solution view table (builds on governance classification)

## Reviewer Flow Optimization

### Front-Loading Key Decision Points
- **Version History:** Reviewers check this first to see what changed
- **Scope Statement:** Reviewers validate boundaries early
- **Assumptions/Risks/Constraints:** Reviewers assess feasibility
- **Data Governance:** Mandatory review gate; slow if incomplete
- **Security Architecture:** Second mandatory review gate

**Implication:** These sections must be complete and clear; avoid "TBD" without owner/date

### Providing "Anchor Points" for Reviewers
- **Section numbering:** Consistent hierarchy (1.1, 1.2, 1.3.1, etc.)
- **Table of Contents:** Hyperlinked for navigation
- **Diagram references:** "See Figure 1: High-level Visualization of [Solution]"
- **Cross-references:** "Elaborated in section X.Y.Z"
- **Explicit markers:** `*Mandatory`, `<<Placeholder>>`, `[VENDOR]`, `[CUSTOMER to Fill]`

## Consolidation Rules for SDA Agent Use

1. **Section Order is   Sacred:** HLD = Business → Architecture → Technical → Approvals → Appendix; LLD = Business (abbreviated) → Deployment → Operational Runbooks
2. **Audience Shift Per Section:** Business section = executive voice; Architecture section = architect voice; Technical section = implementer voice
3. **Context Before Detail:** Every major section opens with narrative paragraph before tables/diagrams
4. **Tables for Structure, Prose for Story:** Use tables for inventories/tracking; prose for problem/solution/outcomes
5. **Mandatory Subsections Non-Negotiable:** Data Governance (8 subsections) and Security Architecture (5 subsections) must appear in HLDs even if some say "NA"
6. **Transition Headings Explicit:** Use "Business Section", "Architecture Section", "Technical Section" as transition markers before H1 headings

## Reusable Checklists

### HLD Narrative Flow Checklist
- [ ] Version history table (reviewers check this first)
- [ ] Purpose + How to Complete instructions (sets expectations)
- [ ] Business Solution Summary opens with objectives (the "why")
- [ ] Scope statement early (reviewers validate boundaries)
- [ ] Assumptions/Risks/Constraints before detailed architecture (reviewers assess feasibility)
- [ ] Data Architecture before Data Governance (logical flow: "what data" → "who owns it")
- [ ] Data Governance before Security (classification feeds security controls)
- [ ] Security Architecture before Technical details (logical design before deployment)
- [ ] Technical section includes deployment diagrams first, then per-app detail
- [ ] Appendix includes sign-off definitions and abbreviations

### LLD Narrative Flow Checklist
- [ ] Version history table
- [ ] Business Solution Summary (abbreviated: objectives + summary)
- [ ] Data Architecture with platform markers (VM/GKE/Managed per component)
- [ ] Deployment Diagram (VPCs, subnets, CIDRs, components)
- [ ] Sequence Diagram (interaction timing)
- [ ] Per-application services (overview, architecture, security specs)
- [ ] Operational runbooks (password rotation MOPs per component)

### Reviewer-Friendly Writing Checklist
- [ ] Consistent section numbering (1.1, 1.2, 1.3.1, etc.)
- [ ] Table of Contents with hyperlinks
- [ ] Diagrams referenced by figure number ("See Figure 1:")
- [ ] Cross-references to other sections ("Elaborated in section X.Y.Z")
- [ ] Clear markers for pending info (`<<Placeholder>>`, `[ROLE to Fill]`, or "TBD")
- [ ] Vendor-contributed sections marked `[VENDOR]`
- [ ] Mandatory sections flagged with `*Mandatory` or similar
- [ ] Instructions retained in Data Governance sections (per policy)

### Technical Detail Sequencing Checklist
- [ ] Start with deployment overview (network, subnets, CIDRs)
- [ ] Then component inventory (what's deployed where)
- [ ] Then security rules (per-VPC security group summary)
- [ ] Then sequence/interaction diagrams (how components communicate)
- [ ] Then per-application deep dives (architecture, design, specs)
- [ ] Then operational procedures (runbooks, MOPs)
- [ ] Close with current-state vs. future-state (if applicable)

