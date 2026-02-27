# SDA Agent Coordination — Consolidated Guidance (Reference Docs Extract)

This folder contains per-agent consolidated guidance derived from direct analysis of enterprise architecture and requirements documents (HLDs, LLDs, and presentation decks).

## Sanitization Contract

These outputs are **generalized patterns and structures** suitable for reuse across projects:

✅ **What's Included:**
- Document structure patterns (section hierarchies, standard tables)
- Phrasing templates (objectives, scope, risks, assumptions)
- Table archetypes with column headers and formatting conventions
- Sentence patterns (with placeholders for specifics)
- Governance and approval frameworks
- Diagram conventions and standard diagramsets

❌ **What's Excluded:**
- References to specific source documents or file paths
- Customer names or project names
- Exact specifications (port numbers, subnet ranges, instance sizes, vendor SKUs)
- Proprietary implementation details

## Agent Assignment

| Agent | Focus Areas |
|-------|-------------|
| **solution-consultant** | Problem framing, scope boundaries (in/out tables), stakeholder alignment, phasing narrative, assumptions/risks/constraints tables |
| **solution-designer** | Architecture section structure (logical → deployment), component taxonomy (FE/BE, layers), data flow diagrams, KPI/dashboard patterns |
| **technical-wizard** | Networking (VPC/subnet/CIDR tables), security (layered encryption, auth tables), infrastructure (platform markers, sizing tables), operational runbooks |
| **technical-scribe** | Document narrative flow (Business → Architecture → Technical), section transitions, reviewer optimization, HLD vs. LLD structure |
| **value-narrator** | Objectives phrasing ("To demonstrate the value of..."), differentiator bullets ("Unlike traditional..."), KPI business relevance, dashboard value statements |
| **value-analyst** | Assumptions/risks/constraints tables, Data Governance (8 mandatory subsections), security coverage audit, readiness checklists, approval gates |
| **product-manager** | Scope control tables (in/out), phasing tables (components + testing gates), approval/sign-off definitions, milestone tracking via version history |
| **chief-editor** | Document type taxonomy (HLD/LLD/Presentation), heading hierarchies, table formatting standards, terminology normalization, voice/tone guidelines |

## File Structure

Each agent has a consolidated guidance file:
-  `<agent-name>.md` — Primary consolidated patterns and templates

Example: [solution-consultant.md](solution-consultant.md), [technical-wizard.md](technical-wizard.md), [chief-editor.md](chief-editor.md)

## How to Use These Outputs

### For Document Creation (New HLD/LLD/Presentation)
1. Start with [chief-editor.md](chief-editor.md) to understand document type structure
2. Use [solution-consultant.md](solution-consultant.md) for Business Solution Summary section patterns
3. Use [solution-designer.md](solution-designer.md) for Architecture section patterns
4. Use [technical-wizard.md](technical-wizard.md) for Technical section and security/networking tables
5. Use [value-narrator.md](value-narrator.md) to craft executive-friendly objectives and value statements
6. Use [value-analyst.md](value-analyst.md) to ensure governance completeness and risk coverage
7. Use [product-manager.md](product-manager.md) for scope tables, phasing, and approval tracking
8. Use [technical-scribe.md](technical-scribe.md) to sequence sections in reviewer-friendly flow

### For Document Review/QA
1. [value-analyst.md](value-analyst.md) contains audit checklists for governance, security, assumptions/risks
2. [chief-editor.md](chief-editor.md) contains editorial checklists for structure, terminology, voice
3. [technical-scribe.md](technical-scribe.md) contains narrative flow and reviewer optimization checklists
4. [product-manager.md](product-manager.md) contains approvals, sign-offs, and validation gates checklists

### For Template Development
- Each agent file includes reusable table structures with column headers
- Phrasing templates use `[placeholders]` for customer-specific details
- Copy table markdown directly; replace placeholders with project specifics
- Combine patterns from multiple agents (e.g., Solution Consultant's scope table + Product Manager's phasing table)

## Pattern Categories Captured

### Structural Patterns
- Document control (version history, naming conventions, purpose/instructions)
- Section hierarchies (HLD: Business → Architecture → Technical; LLD: Business → Deployment → Runbooks)
- Mandatory subsections (Data Governance: 8 subsections; Security Architecture: 5 subsections)
- Heading numbering conventions (1.1, 1.2, 1.3.1, etc.)

### Tabular Patterns
- Two-column definition tables (Attribute | Value)
- Multi-column tracking tables (ID | Description | Owner | Status | Impact)
- Layered architecture tables (No. | Layer | Interface | In-Transit | At-Rest)
- Mapping/inventory tables (Component | Platform | Subnet | VPC)

### Phrasing Patterns
- Objectives: "To demonstrate the value of [technology] to [organization]'s [data] to automatically [outcomes]..."
- Differentiators: "Unlike traditional [X], the [new Y]: • [bullet 1] • [bullet 2]..."
- Constraints: "Data Availability - [System] will [depend] on [source]. Therefore quality of [source] affects [outcome]."
- Risks: "| ID | Risk | Probability (H/M/L) | Impact (H/M/L) | Owner | Response |"

### Governance Patterns
- Data ownership tables (Platform | Storage | Dataset | Department | Owner (Director+))
- Classification scheme (Restricted/Confidential/Internal/Public with harm thresholds)
- Retention patterns (X years + current, Y years offline, then purge)
- Third-party vendor table (Vendor | Purpose | PI Access | Status (New/Existing))

### Approval Patterns
- Sign-off definitions (per role: Data Governance, SDM, QE, IT Owner, Business Owner, Performance Lead)
- Referenced documents table (RM, Cyber STARR, Use Case, DA Checklist, Network Tables)
- Approval gates (DA after architecture → ICSU after security → Data Governance after Section 2.6)

## Document Type Decision Tree

```
Are you creating a new document?
├─ Yes → What audience/purpose?
│  ├─ Business stakeholders + architects → HLD (use solution-consultant + solution-designer + value-analyst)
│  ├─ Implementation teams + operations → LLD (use technical-wizard + technical-scribe)
│  └─ Vendor integration / technical stakeholders → Presentation (use solution-designer + technical-wizard, slide format)
└─ No → Are you reviewing/QA an existing document?
   ├─ Yes → Governance/security completeness → value-analyst
   ├─ Yes → Structure/terminology consistency → chief-editor
   ├─ Yes → Scope/phasing/approvals tracking → product-manager
   └─ Yes → Narrative flow/readability → technical-scribe
```

## Relationship to SDA Workflow

These consolidated agent outputs serve as **knowledge base** for SDA agents when:
- Generating new HLD/LLD documents from requirements
- Reviewing draft documents for completeness
- Scaffolding section templates
- Validating against enterprise standards
- Training junior architects on document structure

**Not Included:**
- Per-document extracts (those remain in `docs/` subdirectory)
- Source document references
- Customer/project-specific content

## Meta: How These Were Created

These consolidated outputs were generated by:
1. Direct reading of 10+ source HLD/LLD/Presentation documents
2. Pattern extraction (structure, tables, phrasing, governance, approvals)
3. Generalization (removing customer/project/vendor specifics, keeping structure & conventions)
4. Consolidation per agent role (focus on what each agent needs to know)

**Validation:** Generated outputs were audited to ensure zero customer names, project names, exact specs (ports/subnets/sizes), or source document references remained.

