# Workflow Invocation Guide

**How to invoke the knowledge-management workflow**

---

## 🎯 Critical Understanding: Workflows are Agent-Executed

**BMAD workflows are NOT shell commands.** They are instruction sets that AI agents read and execute.

- ✅ **Workflows** → Agent instructions (this file)
- ❌ **bmad CLI** → Only for installation (`bmad install`, `bmad status`)

---

## How to Invoke This Workflow

### Method 1: Direct Agent Request (Primary)

Simply ask an AI agent to execute the workflow with the desired mode:

**Examples:**
```
"@knowledge-management --mode=init"
"@knowledge-management --mode=validate"  
"Please run the knowledge-management workflow in update mode"
"Execute knowledge-management workflow to validate the sidecar"
```

The agent will:
1. Read [workflow.md](../workflow.md)
2. Follow the initialization sequence
3. Load the appropriate step file based on mode
4. Execute all steps progressively
5. Report results

---

## Operational Modes

### Init Mode - First-Time Setup
**Purpose:** Create knowledge base from scratch  
**Invocation:** `@knowledge-management --mode=init`  
**Duration:** 10-300 seconds  
**Steps:** 3 steps (setup → scan → verify)  
**Prerequisites:** None  
**Output:** Complete sidecar structure with all artifacts

---

### Update Mode - Incremental Changes (Default)
**Purpose:** Process only new/modified documents  
**Invocation:** `@knowledge-management --mode=update` or `@knowledge-management`  
**Duration:** 2-30 seconds  
**Steps:** 4 steps (prereq → detect → process → finalize)  
**Prerequisites:** Sidecar must exist (run init first)  
**Output:** Updated indexes and regenerated affected summaries

---

### Rebuild Mode - Complete Reconstruction
**Purpose:** Delete and recreate entire knowledge base  
**Invocation:** `@knowledge-management --mode=rebuild`  
**Duration:** 15-420 seconds  
**Steps:** 5 steps (confirm → clean → rebuild → verify → report)  
**Prerequisites:** None (creates backup automatically)  
**Output:** Fresh sidecar with backup of old data  
**⚠️ Warning:** Requires explicit user confirmation

---

### Validate Mode - Integrity Check
**Purpose:** Verify knowledge base health and consistency  
**Invocation:** `@knowledge-management --mode=validate`  
**Duration:** 1-30 seconds  
**Steps:** 4 steps (structure → content → consistency → report)  
**Prerequisites:** None  
**Output:** Validation report with pass/fail status

---

## Integration Patterns

### Pre-Hooks in Other Workflows
Other workflows can invoke this workflow as a prerequisite:

```yaml
# In another workflow's frontmatter
pre_hook: "@knowledge-management --mode=validate"
```

This ensures knowledge base is healthy before proceeding.

---

### Automated Triggers (Future Enhancement)

While workflows are agent-executed, they can be triggered by automation:

**File Watcher Pattern:**
- Monitor `reference-docs/` for changes
- When changes detected → Request agent to run update mode
- Agent executes workflow and reports results

**Scheduled Pattern:**
- Daily: Request agent to run update mode
- Weekly: Request agent to run validate mode
- Monthly: Consider rebuild if performance degrades

**Example automation request:**
```
"Check if any reference documents changed in the last hour. 
If yes, run @knowledge-management --mode=update"
```

---

## Mode Selection Guidance

| Situation | Recommended Mode | Why |
|-----------|------------------|-----|
| First time setup | `init` | Creates knowledge base from scratch |
| Added new documents | `update` | Only processes changes (faster) |
| Modified existing docs | `update` | Detects changes via checksums |
| Deleted documents | `update` | Removes orphaned index entries |
| Sidecar corrupted | `rebuild` | Nuclear option, recreates everything |
| Performance degraded | `rebuild` | Fresh start resolves fragmentation |
| Verify health | `validate` | Non-destructive integrity check |
| Before critical tasks | `validate` | Ensure knowledge base is reliable |
| After bulk changes | `validate` | Confirm changes processed correctly |

---

## What Happens During Execution

### Agent Workflow Execution Process

1. **Agent receives request**: User asks agent to run workflow
2. **Agent reads workflow.md**: Loads main workflow file completely
3. **Configuration loaded**: Reads `_bmad/bmb/config.yaml` for user settings
4. **Mode detection**: Determines which mode to execute
5. **Welcome message**: Greets user, shows configuration
6. **Load initial step**: Reads first step file for selected mode
7. **Step execution**: Agent follows step instructions (read completely, then execute)
8. **Progressive disclosure**: Loads next step file when current completes
9. **Auto-proceed**: Continues automatically (except rebuild confirmation)
10. **Completion**: Reports results to user

### What Agents Do During Steps

**Validation Mode (Automated):**
- Check directory structure exists
- Verify critical files present
- Validate JSON files well-formed
- Compare source vs. indexed document counts
- Calculate consistency metrics
- Generate validation report

**Init Mode (Automated):**
- Create directory structure
- Initialize configuration files
- Scan all source documents
- Calculate checksums (SHA256)
- Generate doc-index.json
- Create summaries per category
- Generate agent-specific extracts
- Write processing log
- Display completion report

**Update Mode (Automated):**
- Verify sidecar health
- Load current checksums
- Recalculate checksums for source files
- Detect new/modified/deleted documents
- Process only changed files
- Update doc-index.json
- Regenerate affected summaries/extracts
- Update checksum file
- Log processing events

**Rebuild Mode (User Interaction):**
- Display current sidecar state
- Create backup automatically
- **STOP: Request user confirmation** (C=Continue, A=Abort)
- If confirmed:
  - Delete sidecar contents
  - Re-run full ingestion (same as init)
  - Verify rebuild success
  - Display completion report

---

## Subprocess Optimization

Workflows use subprocess optimization for performance:

**Parallel Processing Patterns:**
```bash
# Document scanning (parallelized by agent)
find {source_docs_path} -name "*.md" -not -path "*/99-*/*" | \
xargs -P 4 -I {} process_document {}

# Checksum calculation (batched)
find {source_docs_path} -name "*.md" -not -path "*/99-*/*" | \
xargs sha256sum > checksums.tmp

# JSON validation (parallelized)
ls indexes/*.json | xargs -P 2 -I {} jq empty {}
```

Agents execute these subprocesses to achieve workflow goals efficiently.

---

## Error Handling

When workflows encounter errors, agents handle them gracefully:

**Exit Codes:**
- **0** = Success → Continue or complete
- **1** = User abort or warning → Review message
- **2** = Prerequisites failed → Fix prerequisites (e.g., run init)
- **3** = Partial success → Review processing log
- **4** = Critical failure → Fix underlying issue

**Common Error Scenarios:**

| Error | Agent Response | User Action |
|-------|---------------|-------------|
| Sidecar missing (update) | Abort with clear message | Request `--mode=init` |
| Sidecar corrupted | Suggest rebuild | Request `--mode=rebuild` |
| Source directory missing | Abort with path error | Create source directory |
| Permission denied | Abort with permission error | Fix file permissions |
| JSON malformed | Suggest rebuild | Request `--mode=rebuild` |
| Partial processing failures | Continue, log errors | Review processing log |

See [error-messages.md](error-messages.md) for complete error reference.

---

## Performance Expectations

### Duration by Document Count

| Mode | <20 docs | 20-100 docs | 100+ docs |
|------|----------|-------------|-----------|
| **init** | 10-20s | 30-90s | 120-300s |
| **update** | 2-5s | 5-15s | 15-30s |
| **rebuild** | 15-30s | 45-120s | 180-420s |
| **validate** | 1-3s | 3-10s | 10-30s |

See [performance-benchmarks.csv](performance-benchmarks.csv) for detailed timing data.

---

## Best Practices

### When to Use Each Mode

**Use Init:**
- ✅ First time setting up knowledge base
- ✅ After deleting sidecar directory
- ✅ Migrating to new workspace

**Use Update (Most Common):**
- ✅ Added new documents to reference-docs/
- ✅ Modified existing documents
- ✅ Deleted documents
- ✅ Daily/regular synchronization
- ✅ As a pre-hook in other workflows

**Use Rebuild:**
- ⚠️ Sidecar corrupted beyond repair
- ⚠️ Performance significantly degraded
- ⚠️ Major restructuring of source documents
- ⚠️ JSON files malformed or unrecoverable
- 🚫 **Not for routine use** (destructive operation)

**Use Validate:**
- ✅ Before critical operations
- ✅ After bulk document changes
- ✅ Troubleshooting synchronization issues
- ✅ Periodic health checks (weekly)
- ✅ As final verification after init/rebuild

---

## Troubleshooting

### Workflow Not Executing

**Problem:** Agent doesn't execute workflow  
**Cause:** Agent may not understand request  
**Solution:** Be explicit:
```
"Execute the knowledge-management workflow with mode=validate"
"@knowledge-management --mode=init" (if agent supports @ syntax)
```

---

### Mode Not Detected

**Problem:** Agent executes wrong mode  
**Cause:** Mode parameter unclear  
**Solution:** Explicitly state mode parameter:
```
"Run knowledge-management workflow with --mode=validate parameter"
```

---

### Workflow Seems Stuck

**Problem:** Agent not progressing through steps  
**Cause:** Agent may not be following progressive disclosure  
**Solution:** Remind agent:
```
"Please read the next step file completely before proceeding"
```

---

### Agent Skipping Steps

**Problem:** Agent not executing all steps  
**Cause:** Agent trying to optimize sequence  
**Solution:** Reinforce rules:
```
"Follow all steps sequentially. Do not skip or optimize."
```

---

## Examples of Requesting Execution

### Casual Request
```
"Can you validate the knowledge base for me?"
→ Agent should invoke: @knowledge-management --mode=validate
```

### Explicit Request
```
"Execute knowledge-management workflow with mode=update"
→ Agent should: Read workflow.md, follow init sequence, load update steps
```

### Conditional Request
```
"Check if the sidecar exists. If not, initialize it. If yes, update it."
→ Agent should: Check directory, invoke init or update appropriately
```

### Pre-Hook Request (From Another Workflow)
```yaml
# In workflow.md of another workflow
pre_hook: "@knowledge-management --mode=validate"
```
→ Agent should: Execute knowledge-management validation before proceeding

---

## Related Documentation

- **Workflow Entry Point:** [workflow.md](../workflow.md)
- **Step Sequence Design:** [workflow-plan.md](../workflow-plan.md)
- **Directory Structure:** [sidecar-structure.md](sidecar-structure.md)
- **Error Reference:** [error-messages.md](error-messages.md)
- **Exclusion Rules:** [exclusion-patterns.md](exclusion-patterns.md)
- **Performance Data:** [performance-benchmarks.csv](performance-benchmarks.csv)

---

**Remember:** Workflows are agent-executed instructions, not shell commands!
