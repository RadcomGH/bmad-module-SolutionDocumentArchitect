# Knowledge Management Workflow v3.0.0

**Transform reference documents into actionable agent knowledge through topic-based memory synthesis.**

---

## Quick Start

```bash
# First-time setup (initializes memory structure)
@knowledge-management --mode=init

# Regular updates (processes changed documents only)
@knowledge-management --mode=update

# Full rebuild (regenerates all memories)
@knowledge-management --mode=rebuild

# Validate integrity (checks memory structure)
@knowledge-management --mode=validate
```

---

## What It Does

This workflow creates a **two-tier knowledge system** for AI agents:

### 1. Shared Knowledge Memories
**Location:** `bmad/_memory/shared-knowledge/memories/`

Topic-based synthesis consolidating insights from multiple reference documents:
- **Architecture**: Deployment patterns, components, topologies, security
- **Operations**: CI/CD, HA/DR, monitoring, maintenance
- **Requirements**: Project objectives, scope, constraints
- **Integrations**: External systems, APIs, protocols
- **Security**: Authentication, encryption, access control

Each memory:
- Synthesizes 2-4 source documents
- 750-1000 lines of comprehensive content
- Includes diagrams, examples, formulas, benchmarks
- Cross-references related memories

### 2. Agent-Specific Knowledge
**Location:** `bmad/_memory/agents/{agent-name}/knowledge/`

Role-filtered extracts tailored to each agent's responsibilities:
- **chief-editor**: Documentation standards, synthesis patterns
- **value-analyst**: Business value, ROI, cost analysis
- **value-narrator**: Storytelling, benefits, outcomes
- **solution-consultant**: Solution design, customer patterns
- **technical-wizard**: Deep technical specs, architecture
- **product-manager**: Features, roadmap, requirements
- **technical-scribe**: Technical writing, procedures
- **solution-designer**: System design, topology, deployment

Each agent receives 2-3 extracts per relevant memory (50-70 total extracts).

---

## Performance

### Efficiency (v3.0.0)

**For 14 reference documents:**
- **Processing Time:** 15-25 minutes (agent processing time)
- **Token Usage:** 100-120K tokens (50-60% of 200K budget)
- **Memories Created:** 23-26 comprehensive memories
- **Agent Extracts:** 50-70 role-specific extracts
- **Memory Depth:** 750-1000 lines average

**vs Sequential Processing (v2.0.0):**
- **3-4x faster** batch processing
- **50% token savings** through cross-document synthesis
- **2.5x deeper content** per memory

---

## Architecture

### 5-Phase Batch Processing Pipeline

**Phase 1: Bulk Topic Discovery**
- Single grep search identifies 100-200+ topics across all documents
- Result: Comprehensive topic inventory

**Phase 2: Targeted Document Reading**
- Parallel reading of 5-7 documents (strategic sections)
- Result: 15-25 synthesis-worthy cross-cutting topics

**Phase 3: Bulk Memory Creation**
- Batch creation of 3-5 memories per iteration
- Each memory synthesizes 2-4 source documents
- Result: Comprehensive architectural references

**Phase 4: Agent Extract Generation**
- Systematic processing of all memories
- 2-3 extracts per memory (based on grounding rules)
- Result: 50-70 agent-specific knowledge files

**Phase 5: Batch Metadata Update**
- Single update of all indexes, checksums, maps
- Result: Consistent metadata state

---

## Memory Categories

### Architecture (Primary)
- Cloud deployment patterns (AWS/GCP, multi-region)
- Component architecture (CDF, Backend, Databases)
- Traffic mirroring (cTAP, VPC Mirroring, GCP)
- Voice quality monitoring (VoLTE/VoNR, MOS scoring)
- Security architecture (Authentication, encryption)
- High availability patterns (Multi-AZ, geo-redundancy)

### Operations
- CI/CD pipelines (GitLab, ArgoCD, Helm)
- Deployment automation (Terraform, blue-green, canary)
- HA/DR procedures (Backup, recovery, failover)

### Requirements
- Project objectives (phases, scope, deliverables)
- Customer requirements (deployment, integration)

### Integrations
- Integration patterns (APIs, protocols, data flows)
- External systems (OSS/BSS, monitoring, authentication)

---

## Best Practices

### Memory Creation

**Topic Selection:**
- ✅ Prioritize cross-cutting themes (cloud deployment patterns)
- ✅ Synthesize comparative analyses (cTAP vs VPC Mirroring)
- ✅ Focus on architectural patterns spanning multiple sources
- ❌ Avoid 1:1 document-to-memory mapping

**Memory Depth:**
- ✅ Target 750-1000 lines for comprehensive coverage
- ✅ Include ASCII diagrams, examples, formulas, benchmarks
- ✅ Synthesize 2-4 source documents per memory
- ❌ Avoid shallow 300-line summaries

### Workflow Execution

**Phase Discipline:**
- ✅ Complete full Phase 1 before moving to Phase 2
- ✅ Create memories in batches (3-5 per iteration)
- ✅ Defer metadata updates to Phase 5
- ❌ Don't process documents sequentially

**Token Management:**
- ✅ Monitor usage after each batch (target 50-60% total)
- ✅ Prioritize quality over quantity (23-26 comprehensive memories)
- ✅ Cross-document synthesis reduces count while increasing value
- ❌ Don't create 50+ shallow memories

---

## File Structure

```
workflows/knowledge-management/
├── workflow.md                 # Main workflow definition
├── workflow-plan.md            # Detailed implementation plan
├── CHANGELOG.md                # Version history
├── README.md                   # This file
├── data/
│   ├── grounding-rules.yaml    # Agent filtering rules
│   ├── memory-schema.yaml      # Memory frontmatter schema
│   └── exclusion-patterns.md   # Document exclusion rules
├── templates/
│   ├── memory-file.md          # Memory template
│   └── agent-extract.md        # Agent extract template
├── steps-init/                 # First-time setup steps
├── steps-update/               # Incremental update steps
├── steps-rebuild/              # Full rebuild steps
└── steps-validate/             # Integrity check steps
```

---

## Output Structure

```
bmad/_memory/
├── shared-knowledge/
│   ├── memories/
│   │   ├── architecture/       # 15 memories
│   │   ├── operations/         # 3 memories
│   │   ├── requirements/       # 2 memories
│   │   ├── integrations/       # 2 memories
│   │   └── security/           # 2 memories
│   ├── indexes/
│   │   ├── memory-index.md     # Human-readable catalog
│   │   └── agent-coverage.md   # Agent extract coverage
│   └── metadata/
│       ├── doc-to-topic-map.json   # Document → memory mapping
│       ├── source-checksums.json   # Change detection
│       └── synthesis-log.jsonl     # Processing history
└── agents/
    ├── chief-editor/knowledge/      # 6-8 extracts
    ├── value-analyst/knowledge/     # 5-7 extracts
    ├── value-narrator/knowledge/    # 5-7 extracts
    ├── solution-consultant/knowledge/ # 8-10 extracts
    ├── technical-wizard/knowledge/  # 10-12 extracts
    ├── product-manager/knowledge/   # 6-8 extracts
    ├── technical-scribe/knowledge/  # 5-7 extracts
    └── solution-designer/knowledge/ # 6-8 extracts
```

---

## Modes

### Init Mode
**Purpose:** First-time setup for new workspace

**When to use:**
- Setting up knowledge management for the first time
- No existing memory structure in workspace

**What it does:**
- Creates directory structure
- Scans all reference documents
- Generates all shared memories
- Creates agent extracts
- Initializes metadata files

**Duration:** 15-25 minutes for 14 documents

---

### Update Mode (Default)
**Purpose:** Incremental updates when documents change

**When to use:**
- Reference documents added, modified, or deleted
- Regular maintenance updates
- After document review/editing

**What it does:**
- Detects changed documents (via checksums)
- Updates affected memories
- Regenerates relevant agent extracts
- Updates metadata incrementally

**Duration:** 2-10 minutes (depends on change volume)

---

### Rebuild Mode
**Purpose:** Full regeneration of all knowledge

**When to use:**
- Major document reorganization
- Suspected memory corruption
- Workflow version upgrade (e.g., v2.0 → v3.0)
- Grounding rules changed significantly

**What it does:**
- Creates backup of existing memories
- Clears all generated knowledge
- Performs full init process
- Reports backup location for rollback

**Duration:** 20-30 minutes (includes backup)

---

### Validate Mode
**Purpose:** Verify integrity without modifications

**When to use:**
- Troubleshooting issues
- Pre-deployment checks
- Post-update verification
- Regular health checks

**What it does:**
- Checks directory structure
- Validates memory frontmatter
- Verifies agent extract counts
- Checks metadata consistency
- Reports issues (no fixes)

**Duration:** 1-3 minutes

---

## Troubleshooting

### "Sidecar missing" error
**Solution:** Run `@knowledge-management --mode=init`

### Memories seem outdated
**Solution:** Run `@knowledge-management --mode=update`

### Suspected corruption
**Solution:** Run `@knowledge-management --mode=rebuild` (creates backup first)

### Low agent extract count
**Check:** Agent coverage report in `shared-knowledge/indexes/agent-coverage.md`
**Solution:** Run rebuild if < 2 extracts per memory on average

### Token budget concerns
**Monitor:** After each batch, check token usage
**Target:** 50-60% for complete corpus
**Action:** If > 70%, prioritize remaining high-value topics

---

## Integration

**Pre-hooks in workflows:**
```yaml
# In sda-main workflow step-02-knowledge-review.md
before_execution:
  - @knowledge-management --mode=update
```

**Scheduled updates:**
```bash
# Daily at 2am (if documents change frequently)
0 2 * * * cd /project && agent-cli exec "@knowledge-management --mode=update"
```

**Manual invocation:**
```bash
# From any workflow or command line
@knowledge-management --mode=update
```

---

## Version Information

- **Current Version:** 3.0.0
- **Release Date:** 2026-02-19
- **Breaking Changes:** Yes (v2.0 → v3.0 requires rebuild)
- **Previous Version:** 2.0.0 (sidecar indexing pattern)

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history.

---

## Further Reading

- **Workflow Plan:** [workflow-plan.md](./workflow-plan.md) - Detailed implementation guide
- **Main Workflow:** [workflow.md](./workflow.md) - Executable workflow definition
- **Grounding Rules:** [data/grounding-rules.yaml](./data/grounding-rules.yaml) - Agent filtering logic
- **Memory Schema:** [data/memory-schema.yaml](./data/memory-schema.yaml) - Memory structure definition

---

**Ready to build your knowledge base!** 🧠
