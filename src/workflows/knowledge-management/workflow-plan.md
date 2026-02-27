# Workflow Plan: Knowledge Management

**Workflow Name:** knowledge-management  
**Version:** 3.0.0 (V6 Compliant)  
**Type:** Multi-Modal Data Processing Workflow  
**Modes:** init | update | rebuild | validate

---

## Overview

This workflow manages reference document knowledge through a two-tier memory architecture (`_memory/shared-knowledge/` and `_memory/agents/{agent-name}/knowledge/`). It synthesizes topic-based memories from reference documents and generates agent-specific knowledge extracts for context grounding.

**Key Characteristics:**
- Two-tier memory architecture (shared memories + agent extracts)
- Topic-based synthesis across multiple documents
- Agent-specific knowledge filtering via grounding rules
- Optimized for token efficiency through batch processing
- Primarily automated data processing (minimal user interaction)
- Multi-modal operation (4 distinct modes)
- Heavy use of subprocess optimization for file operations
- Output is knowledge artifacts for agent context grounding

---

## Optimization Strategies (v3.0.0)

### Batch Processing Pipeline

For large-scale memory synthesis (10+ documents), use the **5-Phase Batch Processing Pipeline** to maximize efficiency:

**Phase 1: Bulk Topic Discovery**
- Use `grep_search` to scan ALL documents simultaneously for H2 headers
- Pattern: `^## ` to identify major topics across entire document corpus
- Result: Comprehensive topic inventory (100-200+ topics) in single operation
- Benefit: Avoids sequential document reading, reveals cross-cutting themes

**Phase 2: Targeted Document Reading**
- Read strategic sections (lines 1-250, 1-300) from 5-7 documents in parallel
- Focus on high-value areas: Overview, Architecture, Requirements, Key Components
- Purpose: Cross-document topic discovery, not deep reading
- Result: Identify 15-25 synthesis-worthy topics spanning multiple sources

**Phase 3: Bulk Memory Creation**
- Create memories in batches of 3-5 (not 1-2 sequentially)
- Each memory synthesizes 2-4 source documents (cross-document synthesis)
- Target size: 750-1000 lines per memory (vs earlier 300-400 lines)
- Include: Architecture diagrams (ASCII art), detailed examples, formulas, key insights
- Result: 3-4x efficiency improvement vs sequential processing

**Phase 4: Comprehensive Agent Extract Generation**
- Process ALL memories systematically (not incrementally)
- Target: 2-3 extracts per memory (based on grounding-rules.yaml keywords)
- Batch process: Group extracts by agent, create in parallel
- Result: 50-70 total extracts vs 10-15 with sequential approach

**Phase 5: Batch Metadata Update**
- Update ALL metadata files in single operation (not after each memory)
- Files: memory-index.md, agent-coverage.md, doc-to-topic-map.json, source-checksums.json, synthesis-log.jsonl
- Deferred updates prevent redundant file rewrites
- Result: 50% reduction in metadata update overhead

### Token Efficiency Guidelines

**Memory Creation:**
- **Sequential Approach:** 17% tokens for 43% document completion → 100%+ tokens for full corpus (INEFFICIENT)
- **Batch Approach:** 43% tokens for 71% document completion → 50-60% tokens for full corpus (EFFICIENT)
- **Target:** 23-26 total memories consuming 50-60% of token budget
- **Quality Over Quantity:** 750-1000 line detailed memories more valuable than 50+ shallow memories

**Processing Strategy:**
- Parallel topic discovery: Read 7 documents, synthesize 4 cross-cutting themes in single batch
- Cross-document synthesis: Each memory spans 2-4 sources (not 1:1 doc-to-memory mapping)
- Strategic selection: Prioritize high-value architectural topics over comprehensive coverage
- Agent extract density: Target 2-3 extracts per memory (comprehensive agent coverage)

### Quality Improvements

**Memory Depth:**
- Include complete architectural specifications (not summaries)
- Add ASCII diagrams for visual understanding
- Provide concrete examples (code snippets, configuration, formulas)
- Include performance benchmarks and sizing calculations
- End with "Key Insights" section synthesizing learnings

**Cross-Document Synthesis:**
- Compare architectures across customers (e.g., DISH vs Rogers deployment patterns)
- Synthesize common patterns (e.g., cTAP vs VPC Mirroring vs GCP Packet Mirroring)
- Provide comparative analysis (pros/cons, cost, use cases)
- Build comprehensive references spanning entire solution domain

---

## Mode Selection Strategy

The workflow uses a **mode router** approach:
- workflow.md contains mode detection and routing logic
- Each mode has dedicated step folder: `steps-init/`, `steps-update/`, `steps-rebuild/`, `steps-validate/`
- Modes share the `data/` folder for reference files

---

## Mode: VALIDATE (Simplest - Auto-Proceed)

**Purpose:** Verify knowledge base integrity without modifications

**Step Sequence:**

### Step 01: Structure Check
- **File:** `steps-validate/step-01-structure-check.md`
- **Purpose:** Verify directory structure exists and is intact
- **Type:** Auto-proceed validation step
- **User Interaction:** None
- **Subprocess:** Yes - directory listing and checks
- **Exit:** Auto-proceed to step 02

### Step 02: Content Check
- **File:** `steps-validate/step-02-content-check.md`
- **Purpose:** Verify indexes, summaries, and extracts are well-formed
- **Type:** Auto-proceed validation step
- **User Interaction:** None
- **Subprocess:** Yes - JSON validation, file integrity checks
- **Exit:** Auto-proceed to step 03

### Step 03: Consistency Check
- **File:** `steps-validate/step-03-consistency-check.md`
- **Purpose:** Compare source documents vs indexed documents
- **Type:** Auto-proceed validation step
- **User Interaction:** None
- **Subprocess:** Yes - checksum comparison, count verification
- **Exit:** Auto-proceed to step 04

### Step 04: Report and Complete
- **File:** `steps-validate/step-04-report-complete.md`
- **Purpose:** Display validation report and exit
- **Type:** Final step
- **User Interaction:** Display results, no menu
- **Exit:** Workflow complete

---

## Mode: INIT (First-Time Setup)

**Purpose:** Create sidecar structure and perform initial knowledge ingestion

**Step Sequence:**

### Step 01: Setup Sidecar
- **File:** `steps-init/step-01-setup-sidecar.md`
- **Purpose:** Create directory structure and config files
- **Type:** Auto-proceed init step
- **User Interaction:** None (or optional confirmation)
- **Subprocess:** Yes - directory creation, file copying
- **Exit:** Auto-proceed to step 02

### Step 02: First Scan and Process
- **File:** `steps-init/step-02-first-scan.md`
- **Purpose:** Scan all documents, generate all artifacts
- **Type:** Auto-proceed processing step
- **User Interaction:** Progress display only
- **Subprocess:** Yes - heavily parallelized document processing
- **Key Operations:**
  - Scan all reference documents (exclude 99-*)
  - Extract metadata from each
  - Build master indexes
  - Generate heading hierarchies
  - Create category summaries
  - Build agent-specific extracts
  - Initialize checksums
- **Exit:** Auto-proceed to step 03

### Step 03: Verification and Complete
- **File:** `steps-init/step-03-verification-complete.md`
- **Purpose:** Verify all artifacts created successfully
- **Type:** Final step
- **User Interaction:** Display completion report
- **Exit:** Workflow complete

---

## Mode: UPDATE (Incremental Changes)

**Purpose:** Process only new/modified/deleted documents

**Step Sequence:**

### Step 01: Prerequisites Check
- **File:** `steps-update/step-01-prerequisites.md`
- **Purpose:** Verify sidecar exists and is healthy
- **Type:** Auto-proceed check step
- **User Interaction:** None
- **Subprocess:** Yes - existence checks
- **Error Handling:** If sidecar missing, suggest running init mode
- **Exit:** Auto-proceed to step 02

### Step 02: Detect Changes
- **File:** `steps-update/step-02-detect-changes.md`
- **Purpose:** Identify new/modified/deleted documents
- **Type:** Auto-proceed analysis step
- **User Interaction:** None
- **Subprocess:** Yes - checksum comparison
- **Exit:** If no changes, skip to step 04; else proceed to step 03


### Step 03a: Agent Extraction
- **File:** `steps-update/step-03a-agent-extraction.md`
- **Purpose:** Extract agent-specific knowledge from changed documents
- **Type:** Auto-proceed processing step
- **User Interaction:** Progress display only
- **Subprocess:** Yes - agent extraction logic
- **Exit:** Auto-proceed to step 04

### Step 04: Finalize and Complete
- **File:** `steps-update/step-04-finalize-complete.md`
- **Purpose:** Update checksums, log results, display report
- **Type:** Final step
- **User Interaction:** Display completion report
- **Exit:** Workflow complete

---

## Mode: REBUILD (Full Reconstruction)

**Purpose:** Delete existing knowledge and rebuild from scratch

**Step Sequence:**

### Step 01: Confirmation and Backup
- **File:** `steps-rebuild/step-01-confirm-backup.md`
- **Purpose:** Display what will be deleted, create backup
- **Type:** Interactive confirmation step
- **User Interaction:** YES - Require explicit confirmation to proceed
- **Menu:** [C] Continue (after backup created) | [A] Abort
- **Subprocess:** Yes - backup creation
- **Exit:** Menu-driven (C → step 02, A → abort workflow)

### Step 02: Clean Sidecar

### Step 03: Rebuild Process
### Step 03a: Agent Extraction
- **File:** `steps-rebuild/step-03a-agent-extraction.md`
- **Purpose:** Extract agent-specific knowledge from documents
- **Type:** Auto-proceed processing step
- **User Interaction:** Progress display only
- **Subprocess:** Yes - agent extraction logic
- **Exit:** Auto-proceed to step 04

### Step 04: Verification

### Step 05: Report and Complete
- **File:** `steps-rebuild/step-05-report-complete.md`
- **Purpose:** Display rebuild completion report
- **Type:** Final step
- **User Interaction:** Display results with backup location
- **Exit:** Workflow complete

---

## Shared Resources

### Data Files

**Location:** `data/`

- `command-examples.md` - CLI usage examples for each mode
- `sidecar-structure.md` - Expected directory structure reference
- `exclusion-patterns.md` - Archive folder exclusion rules
- `performance-benchmarks.csv` - Expected performance metrics
- `error-messages.md` - Standard error messages and solutions

### Templates

**Location:** `templates/` (if needed)

Currently none required - workflow produces data artifacts, not formatted documents.

---

## Subprocess Optimization Points

**Critical for Performance:**

1. **Bulk Topic Discovery** - Single `grep_search` across all documents (Phase 1)
2. **Parallel Document Reading** - Read 5-7 documents simultaneously for topic discovery (Phase 2)
3. **Batch Memory Creation** - Create 3-5 memories per batch vs sequential 1-2 (Phase 3)
4. **Agent Extract Batching** - Process all memories systematically, 2-3 extracts per memory (Phase 4)
5. **Deferred Metadata Updates** - Update all metadata files once vs incrementally (Phase 5)
6. **Checksum Calculation** - Parallel per file
7. **JSON Validation** - Parallel file checks

**Token Efficiency:**
- Batch processing achieves 3-4x improvement over sequential processing
- Target 50-60% token usage for complete document corpus synthesis
- Cross-document synthesis reduces memory count while increasing depth

---

## Performance Benchmarks (v3.0.0)

### Memory Synthesis Performance

**Sequential Processing (v2.0.0 baseline):**
- 2 memories created per iteration (5-8 tool calls)
- 17% tokens used for 43% document completion
- Projected: 100%+ tokens for full corpus (INEFFICIENT)
- Memory depth: 300-400 lines average

**Batch Processing (v3.0.0 optimized):**
- 4 memories created per batch (single iteration)
- 43% tokens used for 71% document completion  
- Projected: 50-60% tokens for full corpus (EFFICIENT)
- Memory depth: 750-1000 lines average
- **Efficiency Gain:** 3-4x improvement

### Scale Benchmarks

**14 Documents (typical solution corpus):**
- Memories: 23-26 comprehensive topic-based memories
- Agent Extracts: 50-70 extracts (2-3 per memory)
- Token Usage: 100-120K tokens (50-60% of 200K budget)
- Processing Time: 15-25 minutes (agent time, not wall time)
- Categories: Architecture (15), Operations (3), Requirements (2), Integrations (2), Security (2)

**Quality Metrics:**
- Cross-document synthesis: Each memory synthesizes 2-4 source documents
- Architectural depth: Complete specifications, diagrams, examples, formulas
- Agent coverage: All 8 agents receive targeted knowledge extracts
- Maintenance: Incremental updates process only changed documents

---

**No Traditional Document Continuation:**
- This workflow does NOT produce a document with `stepsCompleted` array
- Each execution is a standalone operation
- State is maintained in sidecar metadata (checksums, processing log)

---

## Error Handling Strategy

**Graceful Degradation:**
- Source directory missing → Abort with clear message
- Sidecar corrupted (in update/validate) → Suggest rebuild
- Partial processing failures → Continue, log errors, report at end
- Permission errors → Abort with clear message

**Error Exit Codes:**
- 0 = Success
- 1 = User abort
- 2 = Prerequisites failed
- 3 = Processing errors (some succeeded)
- 4 = Critical failure (all failed)

---

## Variable Definitions

**Standard Variables (from config):**
- `{project-root}` - Workspace root
- `{user_name}` - User's name from config
- `{communication_language}` - Language from config

**Workflow-Specific Variables:**
- `{workflow_path}` - This workflow's folder path
- `{source_docs_path}` - `{project-root}/bmad/reference-docs`
- `{shared_knowledge_path}` - `{project-root}/bmad/_memory/shared-knowledge`
- `{agents_memory_path}` - `{project-root}/bmad/_memory/agents`
- `{mode}` - Selected operation mode (init|update|rebuild|validate)

**Step-Specific Variables:**
- Defined in each step file's frontmatter as needed

---

## Integration Notes

**Invoked By:**
- User via agent invocation: `@knowledge-management --mode=<mode>`
- Pre-hooks in other workflows (sda-main, solution-investigation)
- Scheduled jobs (cron)
- File watchers (optional)

**Invokes:**
- Shell scripts for file operations
- Task files (if refactored from original design)
- Subprocess-optimized batch operations

---

## Testing Strategy

**Per Mode:**
1. **Validate** - Run on existing sidecar, check report accuracy
2. **Init** - Run on new workspace, verify all artifacts created
3. **Update** - Modify a document, verify only that document processed
4. **Rebuild** - Verify backup created, old data deleted, new data matches

**Integration:**
1. Run init → validate (should pass)
2. Run update with no changes (should skip processing)
3. Run rebuild → validate (should pass)

---

## Best Practices and Lessons Learned (v3.0.0)

### Memory Creation Best Practices

**Topic Selection:**
- Prioritize cross-cutting architectural themes over document-by-document mapping
- Look for patterns spanning multiple customers/deployments (e.g., cloud deployment patterns across AWS/GCP, DISH/Rogers)
- Synthesize comparative analyses (e.g., cTAP vs VPC Mirroring vs GCP Packet Mirroring) 
- Focus on high-value comprehensive references vs shallow coverage

**Memory Depth:**
- Target 750-1000 lines for architectural topics (not 300-400 lines)
- Include complete specifications, not summaries
- Add ASCII diagrams for visual architecture representation
- Provide concrete examples: code snippets, configurations, formulas, sizing calculations
- Include performance benchmarks and operational considerations
- End with "Key Insights" section synthesizing learnings
- Reference 2-4 source documents per memory for comprehensive coverage

**Cross-Document Synthesis:**
- Read sections from 5-7 documents before creating batch of memories
- Identify themes that span multiple sources
- Compare/contrast implementations across customers
- Synthesize common patterns and variations
- Build complete architectural references, not document excerpts

### Agent Extract Generation Best Practices

**Coverage:**
- Target 2-3 extracts per memory (comprehensive agent coverage)
- Use grounding-rules.yaml keywords to filter relevance
- Prioritize role-specific applicability over exhaustive coverage
- Batch process all extracts after memory creation (Phase 4)

**Extract Quality:**
- Distill complex memories into role-focused insights
- Preserve key technical details relevant to agent's domain
- Include examples and specifications, not just summaries
- Link back to source memory for deep-dive context

### Workflow Execution Best Practices

**Phase Discipline:**
- Complete full Phase 1 (bulk topic discovery) before Phase 2
- Don't jump to memory creation until Phase 2 topic identification complete
- Create memories in batches during Phase 3 (not one-by-one)
- Defer all metadata updates to Phase 5 (not after each memory)

**Token Management:**
- Monitor token usage after each batch (target 50-60% total)
- If approaching 70% tokens with incomplete corpus, prioritize remaining high-value topics
- Quality over quantity: 23-26 comprehensive memories better than 50+ shallow ones
- Cross-document synthesis reduces memory count while increasing value

**Efficiency Indicators:**
- Phase 3 batch size: 3-5 memories (not 1-2 sequential)
- Memory depth: 750-1000 lines (indicates comprehensive coverage)
- Document coverage: 70%+ documents with 40-50% token usage (efficient)
- Agent extract density: 2-3 extracts per memory (comprehensive grounding)

### Common Pitfalls to Avoid

**Sequential Processing:**
- ❌ Reading 1 document → creating 1-2 memories → repeat (INEFFICIENT)
- ✅ Reading 7 documents → creating 4 cross-cutting memories (EFFICIENT)

**Shallow Coverage:**
- ❌ Creating 50 memories of 300 lines each (breadth without depth)
- ✅ Creating 25 memories of 800 lines each (comprehensive references)

**Premature Metadata Updates:**
- ❌ Updating indexes after each memory creation (redundant rewrites)
- ✅ Batch updating all indexes in Phase 5 (single update)

**Insufficient Agent Extracts:**
- ❌ Creating 1 extract per memory (incomplete agent coverage)
- ✅ Creating 2-3 extracts per memory (comprehensive agent grounding)

---

## Version History

**v1.0.0 (Original Design):**
- Sidecar pattern with indexes and summaries
- Document-centric approach
- Sequential processing

**v2.0.0 (V6 Compliant):**
- Multi-modal operation (init/update/rebuild/validate)
- Step-file architecture
- Subprocess optimization
- Original workflow.md preserved as `workflow-design-archive.md`

**v3.0.0 (Memory Synthesis - Current):**
- Two-tier memory architecture (shared memories + agent extracts)
- Topic-based synthesis (not document-centric)
- 5-Phase batch processing pipeline
- Cross-document synthesis
- Token efficiency optimization (3-4x improvement)
- Comprehensive agent extract generation (2-3 per memory)
- Memory depth improvement (750-1000 lines vs 300-400)

**Key Evolution:**
- v1.0 → v2.0: Added multi-modal operation and step architecture
- v2.0 → v3.0: Transformed from document indexing to knowledge synthesis
- Major architectural shift: Sidecar indexes → Two-tier memory system
- Performance breakthrough: Sequential processing → Batch pipeline (3-4x efficiency)

---

**Plan Complete - Ready for Implementation**
