---
name: "knowledge-management"
description: "Synthesize topic-based memories and agent knowledge for context grounding"
version: "3.0.0"
updated: "2026-02-19"
web_bundle: true

# Workflow Paths
workflow_path: "{project-root}/bmad-module-SolutionDocumentArchitect/src/workflows/knowledge-management"
source_docs_path: "{project-root}/bmad/reference-docs"
shared_knowledge_path: "{project-root}/bmad/_bmad/_memory/_sda/shared-knowledge"
agents_memory_path: "{project-root}/bmad/_bmad/_memory/_sda/agents"

# Mode-Specific Entry Points
initStepFile: "./steps-init/step-01-setup-sidecar.md"
updateStepFile: "./steps-update/step-01-prerequisites.md"
rebuildStepFile: "./steps-rebuild/step-01-confirm-backup.md"
validateStepFile: "./steps-validate/step-01-structure-check.md"

# Supporting Files
workflowPlan: "./workflow-plan.md"
---

# Knowledge Management Workflow

**Synthesize and manage knowledge memories for agent context grounding.**

---

## Purpose

This workflow transforms reference documents into actionable knowledge through:

**Two-Tier Memory Architecture:**

1. **Shared Knowledge Memories** (`shared-knowledge/memories/`)
   - Topic-based synthesis across multiple documents
   - Consolidated understanding with conflict resolution
   - Accessible to all agents

2. **Agent-Specific Knowledge** (`agents/{agent-name}/knowledge/`)
   - Role-filtered extracts tailored to each agent's focus
   - Pre-processed content relevant to agent responsibilities
   - Complements agent's personal context (in `agents/{agent-name}/context/`)

---

**⚠️ CRITICAL REQUIREMENT: Both Tiers Are Mandatory**

Every knowledge management operation (init, update, rebuild) creates BOTH:

1. **Shared Memories** - Cross-agent topic synthesis in `shared-knowledge/memories/`
2. **Agent Extracts** - Role-filtered knowledge in `agents/{agent}/knowledge/`

**Skipping either tier results in incomplete agent context grounding.**

The workflow automatically creates both tiers - this is by design and required for proper agent performance.

---

## Operations

| Mode | Purpose | Entry Point |
|------|---------|-------------|
| **init** | Create initial memory artifacts from all reference docs | {initStepFile} |
| **update** | Update memories when docs change (incremental) | {updateStepFile} |
| **rebuild** | Regenerate all memories and agent knowledge | {rebuildStepFile} |
| **validate** | Verify memory integrity and completeness | {validateStepFile} |

**Implementation Note:** All modes create BOTH shared memories AND agent-specific knowledge. The two-tier architecture is automatically enforced in all operations.

---

## Agent Invocation

**This workflow is executed BY AI agents, not via shell commands.**

To invoke this workflow, request an agent to execute it:

```
# First-time setup
@knowledge-management --mode=init

# Regular updates (default)
@knowledge-management --mode=update

# Full rebuild (with backup)
@knowledge-management --mode=rebuild

# Validate integrity
@knowledge-management --mode=validate
```

---

## WORKFLOW ARCHITECTURE

This workflow uses **step-file architecture** with **mode-based routing**.

### Core Principles

- **Multi-Modal**: Four distinct operational modes with separate step folders
- **Data Processing**: Primarily automated with minimal user interaction
- **Subprocess Optimized**: Heavy use of parallel file operations
- **Progressive Disclosure**: Just-in-time step loading
- **State in Artifacts**: No document continuation; state maintained in sidecar metadata

### Step Processing Rules

1. **READ COMPLETELY**: Always read entire step file before taking action
2. **FOLLOW SEQUENCE**: Execute numbered sections in order
3. **AUTO-PROCEED**: Most steps auto-proceed (validation & processing modes)
4. **USER INTERACTION**: Rebuild mode requires confirmation
5. **SUBPROCESS OPTIMIZATION**: File operations use parallelized subprocesses

### Critical Rules

- 🛑 **NEVER** load multiple step files simultaneously
- 📖 **ALWAYS** read entire step file before execution
- 🚫 **NEVER** skip steps or optimize sequence
- 🎯 **ALWAYS** follow exact instructions in step files
- ✅ **ALWAYS** communicate in {communication_language}

---

## INITIALIZATION SEQUENCE

### 1. Configuration Loading

Load configuration from `{project-root}/_bmad/bmb/config.yaml`:
- `user_name`
- `communication_language`
- `output_folder`

### 2. Mode Detection

Detect operation mode from invocation parameter `--mode`:
- If `--mode=init` → Load {initStepFile}
- If `--mode=update` or unspecified → Load {updateStepFile}
- If `--mode=rebuild` → Load {rebuildStepFile}
- If `--mode=validate` → Load {validateStepFile}

### 3. Welcome Message

Display welcome to {user_name}:

```
Knowledge Management Workflow

Mode: {mode}
Source: {source_docs_path}
Shared Knowledge: {shared_knowledge_path}
Agent Knowledge: {agents_memory_path}

Initializing memory synthesis...
```

### 4. Load Initial Step

Based on detected mode, load, read entirely, then execute the corresponding step file.

---

## Mode Characteristics

### Init Mode (First-Time Setup)
- **Steps:** Variable (synthesis-driven)
- **Duration:** 30-180 seconds (depends on doc count)
- **Interaction:** May require conflict resolution decisions
- **Output:** Shared memories + agent knowledge extracts for 8 agents

### Update Mode (Incremental)
- **Steps:** Variable (change-driven)
- **Duration:** 5-30 seconds
- **Interaction:** May require conflict resolution for modified content
- **Output:** Updated memories and affected agent extracts only

### Rebuild Mode (Full Reconstruction)
- **Steps:** Variable (synthesis-driven)
- **Duration:** 45-240 seconds
- **Interaction:** Confirmation required + potential conflict resolution
- **Output:** Fresh memories and agent knowledge with backup

### Validate Mode (Integrity Check)
- **Steps:** 4-5 steps
- **Duration:** 5-15 seconds
- **Interaction:** None (auto-proceed)
- **Output:** Validation report covering memories + agent directories

---

## Integration Points

**Invoked by:**
- User requesting agent to execute workflow
- Pre-hooks in workflows (sda-main, solution-investigation)
- Automated triggers (scheduled, file watchers)
- Other agents as sub-workflow

**Invokes:**
- Shell scripts for file operations
- Subprocess-optimized batch processing
- JSON/markdown parsing tools

---

## Output Artifacts

**Two-Tier Memory Structure:**

```
{shared_knowledge_path}/
├── memories/
│   ├── requirements/          # Topic memories from 01-context-and-requirements
│   ├── architecture/          # Topic memories from 02-architecture-and-design
│   ├── integrations/          # Topic memories from 03-security-and-integrations
│   └── operations/            # Topic memories from 04-operations-and-risks
├── indexes/
│   ├── memory-index.json      # Machine-readable index
│   └── memory-index.md        # Human-readable index
└── metadata/
    ├── source-checksums.json  # Track document changes
    ├── synthesis-log.jsonl    # Synthesis operations log
    └── doc-to-topic-map.json  # Document to memory mappings

{agents_memory_path}/
├── chief-editor/
│   ├── knowledge/             # Reference extracts (workflow manages)
│   └── context/               # Personal memories (agent manages)
├── value-analyst/
│   ├── knowledge/
│   └── context/
├── value-narrator/
│   ├── knowledge/
│   └── context/
├── solution-consultant/
│   ├── knowledge/
│   └── context/
├── technical-wizard/
│   ├── knowledge/
│   └── context/
├── product-manager/
│   ├── knowledge/
│   └── context/
├── technical-scribe/
│   ├── knowledge/
│   └── context/
└── solution-designer/
    ├── knowledge/
    └── context/
```

---

## Error Handling

**Graceful Degradation:**
- Source missing → Abort with clear message
- Memory corruption → Suggest rebuild
- Synthesis conflicts → Pause for human resolution
- Partial failures → Continue, log errors, report at end
- Permission errors → Abort with clear message

**Exit Codes:**
- 0 = Success
- 1 = User abort
- 2 = Prerequisites failed
- 3 = Processing errors (partial success)
- 4 = Critical failure

---

## Documentation

- **Workflow Plan:** {workflowPlan}
- **Original Design:** workflow-design-archive.md (preserved for reference)
- **Data Schemas:** data/memory-schema.yaml, data/grounding-rules.yaml
- **Templates:** templates/memory-file.md, templates/agent-extract.md

---

**Ready to execute. Mode will be determined at runtime.**
