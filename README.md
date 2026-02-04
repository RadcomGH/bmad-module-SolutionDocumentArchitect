# Solution Document Architect (SDA)

[![Version](https://img.shields.io/npm/v/bmad-solution-document-architect?color=blue&label=version)](https://www.npmjs.com/package/bmad-solution-document-architect)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-7289da?logo=discord&logoColor=white)](https://discord.gg/gk8jAdXWmj)

**Dual-audience technical documentation through multi-agent collaboration.** Create solution documents that satisfy both technical reviewers and business stakeholders.

## About SDA

Solution Document Architect (SDA) produces dual-audience technical documentation through collaborative AI intelligence that exceeds individual capability. The module orchestrates specialized agents to create documents that simultaneously satisfy technical R&D requirements and deliver compelling business value to stakeholders.

## Agent Roster

The SDA team operates like a professional editorial house with specialized roles:

| Agent | Icon | Role | Expertise |
|-------|------|------|-----------|
| **Catalyst** | 💡 | Socratic guide & elicitation specialist | Strategic questioning, gap analysis, solution clarification |
| **Visionary** | 🔮 | Design thinking maestro | Empathy mapping, user-centered framing, human-centered design |
| **Inventor** | 🧠 | Creative problem solver | TRIZ, Theory of Constraints, systems thinking |
| **Chronicler** | 📜 | Technical integrity guardian | Technical documentation, architectural accuracy, R&D perspective |
| **Envoy** | 🕊️ | Value-focused narrator | Business value translation, strategic communication |
| **Weaver** | 🧵 | Master agent & synthesis specialist | Document synthesis, formatting, technical writing polish |
| **Client-Advocate** | — | Professional skeptic & customer defender | Customer perspective, skeptical challenge, clarity validation |
| **Product-Guard** | — | R&D & roadmap defender | Technical feasibility, roadmap alignment, product integrity |

## Workflows

| Workflow | Purpose | Use When |
|----------|---------|----------|
| **SDA Main** | Complete dual-audience solution documentation | Creating enterprise proposals, RFP responses, architecture docs |
| **Solution Investigation** | Deep exploration and refinement before documentation | Solution design needs clarification or creative problem-solving |
| **Review Only** | Adversarial review of existing documents | Auditing existing documentation for gaps and clarity |

## Installation

SDA is installed as a module during BMad Method setup:

```bash
npx bmad-method@v6.0.0-Beta.5 install
```

Select **Solution Document Architect** from the modules list.

## Quick Start

After installing BMad Method with SDA, activate any agent to begin:

```
/catalyst           # Start with Socratic questioning to clarify your solution
/weaver             # Launch the full SDA workflow for document creation
/client-advocate    # Review an existing document from customer perspective
```

Or launch workflows directly:

```
/sda-main                    # Full end-to-end documentation creation
/solution-investigation      # Deep solution exploration
/review-only                 # Audit existing documentation
```

## When to Use SDA

| Situation | Recommended Workflow |
|-----------|---------------------|
| Creating enterprise solution proposals | SDA Main |
| Responding to RFPs | SDA Main |
| Documenting architecture decisions | SDA Main |
| Solution design unclear or needs refinement | Solution Investigation |
| Need creative problem-solving on solution approach | Solution Investigation (with Inventor) |
| Reviewing existing documentation quality | Review Only |
| Feature launch documentation (dual audience) | SDA Main |
| Need both technical depth AND business clarity | SDA Main |

## Example: Enterprise RFP Response

```
You: /catalyst
Catalyst: Let's clarify your solution approach. What problem are we solving?
You: Cloud migration for enterprise client with compliance requirements
Catalyst: [Socratic questioning to uncover gaps and assumptions]
        "What specific compliance frameworks apply?"
        "What's the migration timeline constraint?"
        "Which workloads are in scope?"

You: /weaver Start the main SDA workflow
Weaver: [Launches full workflow]
        Phase 0: Subject Definition
        Phase 1: Knowledge Review
        Phase 2: Outline Proposal
        Phase 3: Parallel Drafting
        
Chronicler: [Drafts technical architecture section]
Envoy: [Drafts business value narrative simultaneously]

Client-Advocate: [Reviews with skepticism]
                "Will the client understand this?" 
                "Where's the risk mitigation?"
                
Product-Guard: [Validates technical feasibility]
              "Is this roadmap-aligned?"
              "Can we deliver this?"

Weaver: [Synthesizes everything into polished final document]
        ✓ Document saved to output folder
```

Result: **"This document is better than anything I could write alone."**

## Workflow Capabilities

### SDA Main Workflow

**Complete dual-audience documentation creation:**

- **Phase 0:** Subject Definition — Catalyst leads Socratic questioning to clarify solution
- **Phase 1:** Knowledge Review — Technical audit and source material validation  
- **Phase 2:** Outline Proposal — Collaborative outline between Chronicler and Envoy
- **Phase 3:** Parallel Drafting — Side-by-side technical + business narratives
- **Phase 4:** Adversarial Review — Client-Advocate and Product-Guard stress-test the document
- **Phase 5:** Synthesis & Formatting — Weaver unifies into polished final document

**Outputs:** Complete solution document in `{output_folder}/solution-descriptions/`

### Solution Investigation Workflow

**Deep solution exploration before documentation:**

- Catalyst questions assumptions and identifies gaps
- Visionary provides empathy mapping and user-centered framing
- Inventor applies TRIZ and systematic problem-solving
- Result: Refined solution understanding ready for documentation

**Use when:** Solution design needs clarification, creative problem-solving, or alternative exploration

### Review-Only Mode

**Adversarial audit of existing documents:**

- Client-Advocate challenges from customer perspective
- Product-Guard validates from R&D and roadmap perspective
- No new document creation — pure quality assurance
- Result: Review report with findings, gaps, and recommendations

**Use when:** Auditing existing documentation, pre-publication validation, quality checks

## Agent Collaboration Dynamics

**Productive Tension is a Feature:**

During drafting, Chronicler and Envoy engage in visible productive conflict:

- **Chronicler:** "We need detailed architectural patterns"
- **Envoy:** "But will executives care about microservices topology?"

This debate strengthens documents by forcing both technical depth AND business clarity.

**Adversarial Review:**

Client-Advocate operates as a professional skeptic:

- Challenges every claim
- Questions technical jargon
- Asks "Why would a customer believe this?"
- Documents that survive this review are bulletproof

## Team Collaboration

SDA works seamlessly with BMAD Party Mode:

- **Innovation Support Team:** Catalyst + Visionary + Inventor for solution exploration
- **Production Team:** Chronicler + Envoy for parallel drafting
- **Review Board:** Client-Advocate + Product-Guard for adversarial audit

Activate Party Mode with any agent combination for collaborative sessions.

## Documentation

- [BMad Method Docs](http://docs.bmad-method.org)
- [SDA Getting Started Guide](docs/getting-started.md)
- [Agents Reference](docs/agents.md)
- [Workflows Reference](docs/workflows.md)

## Community

- [Discord](https://discord.gg/gk8jAdXWmj) — Share your documentation breakthroughs
- [GitHub Issues](https://github.com/RadcomGH/bmad-module-SolutionDocumentArchitect/issues) — Report issues

## Key Features

✅ **Dual-narrative synthesis** — Technical and business perspectives in one document  
✅ **Adversarial review** — Multi-perspective validation catches blind spots  
✅ **Structured workflow** — From Socratic questioning through synthesis  
✅ **Faster authoring** — Multi-agent collaboration beats individual effort  
✅ **Professional editorial process** — Like working with a specialized publishing house

## License

MIT License — see [LICENSE](LICENSE) for details.

---

**Solution Document Architect** — Part of the [BMad Method](https://github.com/bmad-code-org/BMAD-METHOD) ecosystem.
