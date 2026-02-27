---
name: 'step-02-memory-synthesis'
description: 'Synthesize topic-based memories from reference documents with conflict resolution'

nextStepFile: './step-03-verification-complete.md'
sharedKnowledgePath: '{shared_knowledge_path}'
agentsMemoryPath: '{agents_memory_path}'
sourcePath: '{source_docs_path}'
workflowPath: '{workflow_path}'
groundingRules: '{workflow_path}/data/grounding-rules.yaml'
memorySchema: '{workflow_path}/data/memory-schema.yaml'
categoryMappings: '{workflow_path}/data/category-mappings.yaml'
memoryTemplate: '{workflow_path}/templates/memory-file.md'
agentTemplate: '{workflow_path}/templates/agent-extract.md'
---

# Init Step 2: Memory Synthesis

## STEP GOAL

Scan all reference documents, identify topics, synthesize cross-document information into shared knowledge memories, detect and resolve conflicts, and generate agent-specific knowledge extracts.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: When loading next step, ensure entire file is read
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ✅ This is semi-automated - auto-proceed EXCEPT for conflict resolution
- 🚨 HALT for human confirmation on significant conflicts
- 🎯 USE SUBPROCESS OPTIMIZATION for document processing

### Role Reinforcement
- You are a **Memory Synthesis Specialist**
- Your role is to synthesize topic-based memories from multiple documents
- Detect conflicts and facilitate human resolution
- Generate agent-specific knowledge extracts
- Maintain metadata and synthesis logs

### Step-Specific Rules
- Process ALL documents (exclude 99-* folders)
- Identify topics from H2/H3 headings
- Synthesize cross-document information by topic
- HALT for human confirmation on significant conflicts
- Generate memories using template
- Auto-proceed after synthesis complete

## EXECUTION PROTOCOLS
- 🎯 Scan documents and identify topics
- 💾 Synthesize cross-document information
- ⚠️ Detect conflicts and request resolution
- 📝 Generate memory files and agent extracts
- ➡️ Auto-proceed to verification step

## CONTEXT BOUNDARIES
- **Available:** {sourcePath}, {sharedKnowledgePath}, {agentsMemoryPath}, all templates/schemas
- **Focus:** Memory synthesis and agent extraction
- **Limits:** DO NOT validate structure (next step)
- **Dependencies:** Step 01 (structure setup) completed

## MANDATORY SEQUENCE

### 1. Status Update

Display to {user_name}:

```
🧠 Knowledge Base Initialization - Step 2/3

Synthesizing topic-based memories from reference documents...
Mode: Topic-based synthesis with conflict resolution
Source: {sourcePath}

This process will:
  1. Scan documents and identify topics
  2. Synthesize cross-document information
  3. Detect and resolve conflicts
  4. Generate shared memories
  5. Create agent knowledge extracts

This may take 2-5 minutes depending on document count...
```

### 2. Load Configuration

Load synthesis rules and agent configuration:

```bash
# Load grounding rules (synthesis settings, conflict resolution, agent filters)
# Load memory schema (memory file structure)
# Load category mappings (folder to category mapping)
```

**Read grounding-rules.yaml and extract:**
- `synthesis_rules` - smart filtering, recency bias, consolidation rules
- `conflict_resolution` - auto-resolve settings, conflict triggers, resolution options
- `agent_extraction` - 8 agent names, roles, keyword filters

Display:
```
✓ Configuration loaded
  • Synthesis rules: Smart filtering ON, Recency bias ON
  • Conflict resolution: Human confirmation required for significant conflicts
  • Agent extraction: 8 agents configured
```

### 3. Scan and Parse Source Documents

**Use subprocess optimization for file finding:**

```bash
# Find all markdown files, excluding archive/review folders
find "{sourcePath}" \
  -name "*.md" \
  -not -path "*/99-*/*" \
  -type f \
  > /tmp/doc-list.txt

DOC_COUNT=$(wc -l < /tmp/doc-list.txt)
echo "Found $DOC_COUNT documents to process"
```

**For each document, extract:**
- File path (relative to source)
- Category (map folder name using category-mappings.yaml)
- Document date (from last modified or filename)
- SHA256 checksum (for change detection)
- All H2 and H3 headings (topic candidates)
- Content under each heading

Display progress:
```
📄 Parsing reference documents...
  ✓ requirements: [count] docs, [count] topic candidates
  ✓ architecture: [count] docs, [count] topic candidates
  ✓ integrations: [count] docs, [count] topic candidates
  ✓ operations: [count] docs, [count] topic candidates
  
  Total: [count] documents, [count] topic candidates
```

**Build parsed documents data structure:**
```python
{
  "documents": [
    {
      "path": "01-context-and-requirements/requirements-doc.md",
      "category": "requirements",
      "date": "2026-02-10",
      "checksum": "sha256:abc123...",
      "topics": [
        {"heading": "Functional Requirements", "level": 2, "content": "...", "ref": "#functional-requirements"}
      ]
    }
  ]
}
```

### 4. Identify and Consolidate Topics

**Apply topic identification and consolidation logic:**

1. **Extract all unique topic names** from H2/H3 headings across all documents
2. **Normalize topic names** (e.g., "HA Strategy" and "High Availability Strategy" → same topic)
3. **Group by topic** - collect all content about the same topic from multiple documents
4. **Apply category mapping** - assign category based on source folder
5. **Apply smart filtering** - skip trivial content (< 100 chars per synthesis rules)

**Normalization heuristics:**
- Convert to lowercase for comparison
- Remove articles (a, an, the)
- Expand abbreviations (HA → High Availability, DR → Disaster Recovery)
- Detect synonyms (Requirements vs Specifications, Architecture vs Design)

Display:
```
🔗 Consolidating topics...
  • High Availability Strategy: From 2 documents
  • Disaster Recovery Requirements: From 3 documents
  • Integration Architecture: From 2 documents
  ...
  
  Total: [count] unique topics identified
```

**Build topic-to-sources map:**
```python
{
  "topics": [
    {
      "topic_name": "High Availability Strategy",
      "normalized_id": "high_availability_strategy",
      "category": "architecture",
      "sources": [
        {
          "doc": "02-architecture-and-design/ha-dr.md",
          "date": "2026-02-10",
          "section": "#ha-strategy",
          "content": "Detailed HA strategy content..."
        },
        {
          "doc": "02-architecture-and-design/hld-v1.9.md",
          "date": "2025-11-05",
          "section": "#high-availability",
          "content": "Different HA approach..."
        }
      ]
    }
  ]
}
```

### 5. Detect and Resolve Conflicts

For each topic with **multiple sources**, detect conflicts:

**Conflict detection logic:**
1. Compare content from all sources for the same topic
2. Check for contradictions or significantly different information
3. Evaluate severity using conflict_severity_triggers from grounding-rules.yaml
4. Classify as MINOR (auto-resolve) or SIGNIFICANT (requires human confirmation)

**Auto-resolve MINOR conflicts:**
- Different wording but same meaning → use newer document
- Additional details in newer doc → merge with bias toward newer
- Formatting differences only → consolidate

**HALT for SIGNIFICANT conflicts:**
When conflict contains trigger keywords (requirements, architecture, critical, performance, security, etc.):

Display conflict details:
```
⚠️  SIGNIFICANT CONFLICT DETECTED

Topic: High Availability Strategy
Category: architecture

SOURCE A (newer - 2026-02-10):
  Document: 02-architecture-and-design/ha-dr.md
  Content: "Active-active configuration with full redundancy across two data centers..."

SOURCE B (older - 2025-11-05):
  Document: 02-architecture-and-design/hld-v1.9.md
  Content: "Active-passive configuration with single failover site..."

This is a significant architectural difference requiring resolution.
```

**Present resolution menu:**
```
How would you like to resolve this conflict?

  (A) Accept newer document (2026-02-10)
  (B) Accept older document (2025-11-05)
  (M) Merge both with note about difference
  (C) Clarify - show full context from both documents
  (S) Skip - flag for manual review later
  (N) Add custom note explaining resolution

Enter choice (A/B/M/C/S/N):
```

**🚨 HALT and wait for user input**

**Process user choice:**
- **A:** Use newer source, add note mentioning older version exists
- **B:** Use older source, add note mentioning newer version available
- **M:** Include both versions in memory with clear distinction
- **C:** Display more context (3 paragraphs before/after), then re-present menu
- **S:** Skip thisconflict, create placeholder memory, log for manual review
- **N:** Prompt for custom note, then proceed with merge approach

Display after resolution:
```
✓ Conflict resolved: [choice explanation]
  Continuing synthesis...
```

**Track conflicts in synthesis log:**
```jsonl
{"timestamp":"...","event":"conflict_detected","topic":"High Availability Strategy","severity":"significant","resolution":"merge_with_note"}
```

### 6. Synthesize and Generate Memory Files

For each topic (after conflict resolution):

**Generate memory file using {memoryTemplate}:**

1. **Create memory_id:** Generate from topic name (e.g., `mem_high_availability_strategy_20260219`)
2. **Fill template fields:**
   - `memory_id`: Generated ID
   - `topic`: Original topic name
   - `category`: Mapped category
   - `sources`: Array of all source documents with dates and section refs
   - `synthesized`: true
   - `created`: Current timestamp
   - `last_updated`: Current timestamp
   - `relevance_tags`: Extract from content (keywords matching agent filters)

3. **Write synthesized content:**
   - **Context section:** Consolidated understanding from all sources (apply smart filtering)
   - **Key Facts:** Bullet points of essential information (max 10 facts)
   - **Relationships:** Related topics, dependencies, impacts
   - **Source Attribution:** List all contributing documents

4. **Write file:**
   - Path: `{sharedKnowledgePath}/memories/{category}/{memory_id}.md`
   - Filename pattern: `{normalized_topic_name}.md`

Display progress:
```
📝 Generating memory files...
  ✓ memories/requirements/functional_requirements.md
  ✓ memories/architecture/high_availability_strategy.md
  ✓ memories/architecture/disaster_recovery_plan.md
  ...
  
  Generated: [count] memory files
```

### 7. Generate Agent Knowledge Extracts

For each of the 8 agents, extract relevant content:

**Load agent configuration from grounding-rules.yaml:**
- Agent names: chief-editor, value-analyst, value-narrator, solution-consultant, technical-wizard, product-manager, technical-scribe, solution-designer
- Each agent's keywords and allowed categories

**For each agent:**

1. **Filter memories by relevance:**
   - Check if memory category matches agent's allowed categories
   - Check if memory content contains agent's keywords
   - Apply keyword matching (case-insensitive, stemming)

2. **Generate agent extract using {agentTemplate}:**
   - `extract_id`: Generated ID
   - `agent_name`: Agent name
   - `agent_role`: From grounding rules
   - `source_document`: Original reference doc
   - `category`: Memory category
   - Fill "Relevant Content" section with filtered information
   - Fill "Why This Matters" with role-specific explanation
   - Link to related shared memories

3. **Write extract file:**
   - Path: `{agentsMemoryPath}/{agent-name}/knowledge/{extract_id}.md`
   - One extract file per relevant memory per agent

Display progress:
```
👥 Generating agent knowledge extracts...
  ✓ chief-editor: [count] extracts
  ✓ value-analyst: [count] extracts
  ✓ value-narrator: [count] extracts
  ✓ solution-consultant: [count] extracts
  ✓ technical-wizard: [count] extracts
  ✓ product-manager: [count] extracts
  ✓ technical-scribe: [count] extracts
  ✓ solution-designer: [count] extracts
  
  Total: [count] agent extracts generated
```

### 8. Generate Indexes

Create human-readable indexes for navigation:

**memory-index.md:**
```markdown
# Shared Knowledge Memory Index

**Generated:** [timestamp]  
**Total Memories:** [count]

## By Category

### Requirements ([count] memories)
- [Functional Requirements](memories/requirements/functional_requirements.md)
- [Non-Functional Requirements](memories/requirements/non_functional_requirements.md)

### Architecture ([count] memories)
- [High Availability Strategy](memories/architecture/high_availability_strategy.md)
- [Disaster Recovery Plan](memories/architecture/disaster_recovery_plan.md)

[Continue for all categories]

## Topics A-Z
[Alphabetical list with links]
```

Write to: `{sharedKnowledgePath}/indexes/memory-index.md`

**agent-coverage.md:**
```markdown
# Agent Knowledge Coverage

**Generated:** [timestamp]

## Coverage by Agent

### chief-editor ([count] extracts)
- Categories: all
- Focus: Synthesis, formatting, technical editing

### value-analyst ([count] extracts)
- Categories: requirements, operations
- Focus: Business value and ROI analysis

[Continue for all 8 agents]
```

Write to: `{sharedKnowledgePath}/indexes/agent-coverage.md`

Display:
```
✓ Indexes generated
  • memory-index.md
  • agent-coverage.md
```

### 9. Update Metadata Files

**Update source-checksums.json:**
```json
{
  "version": "1.0",
  "last_updated": "[timestamp]",
  "documents": {
    "01-context-and-requirements/doc1.md": {
      "checksum": "sha256:abc123...",
      "last_processed": "[timestamp]",
      "topics_extracted": ["Functional Requirements", "Use Cases"]
    }
  }
}
```

Write to: `{sharedKnowledgePath}/metadata/source-checksums.json`

**Append to synthesis-log.jsonl:**
```jsonl
{"timestamp":"[ISO]","event":"synthesis_started","mode":"init","documents_count":[count]}
{"timestamp":"[ISO]","event":"topics_identified","topics_count":[count]}
{"timestamp":"[ISO]","event":"conflicts_detected","count":[count],"auto_resolved":[count],"human_resolved":[count]}
{"timestamp":"[ISO]","event":"memories_generated","count":[count]}
{"timestamp":"[ISO]","event":"agent_extracts_generated","count":[count]}
{"timestamp":"[ISO]","event":"synthesis_completed","duration_seconds":[duration],"success":true}
```

Write to: `{sharedKnowledgePath}/metadata/synthesis-log.jsonl`

**Create doc-to-topic-map.json:**
Maps source documents to generated memories for update tracking:
```json
{
  "01-context-and-requirements/requirements-doc.md": [
    "mem_functional_requirements_20260219",
    "mem_use_cases_20260219"
  ]
}
```

Write to: `{sharedKnowledgePath}/metadata/doc-to-topic-map.json`

### 10. Display Synthesis Summary

Show completion status:

```
✅ Memory Synthesis Complete

Documents Processed: [count]
Topics Identified: [count]
Conflicts Detected: [count] (auto-resolved: [count], human-resolved: [count])

Generated Artifacts:
  ✓ Shared memories: [count] files in [count] categories
  ✓ Agent extracts: [count] files across 8 agents
  ✓ Indexes: 2 files
  ✓ Metadata: 3 files updated

Processing Time: [duration] seconds
Errors: 0
```

### 11. Auto-Proceed to Verification

**DO NOT wait for user input.**

Display:
```
➡️  Proceeding to verification step...
```

Then immediately load, read entire file, and execute {nextStepFile}.

## SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS
- All source documents scanned and parsed
- Topics identified and consolidated across documents
- Conflicts detected and resolved (human confirmation obtained when needed)
- All memory files generated using template
- All agent extracts generated for 8 agents
- Metadata files updated
- Auto-proceeded to next step (except during conflict resolution)

### ❌ SYSTEM FAILURE
- Not processing all documents
- Not detecting conflicts
- Not halting for significant conflicts
- Not generating memory files or agent extracts
- Not using subprocess optimization
- Halting unnecessarily (except for conflicts)

**Master Rule:** Memory synthesis implements topic-based consolidation with conflict resolution. HALT for significant conflicts, auto-proceed otherwise.


