---
name: 'step-01-setup-structure'
description: 'Create shared knowledge and agent directory structures'

nextStepFile: './step-02-first-scan.md'
sharedKnowledgePath: '{shared_knowledge_path}'
agentsMemoryPath: '{agents_memory_path}'
workflowPath: '{workflow_path}'
groundingRules: '{workflow_path}/data/grounding-rules.yaml'
---

# Init Step 1: Setup Memory Structure

## STEP GOAL

Create the two-tier memory structure: shared knowledge memories and agent-specific knowledge directories for first-time knowledge base initialization.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: When loading next step, ensure entire file is read
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ✅ This is initialization - auto-proceed after setup
- 🚫 DO NOT halt for user input (unless checking for existing structure)

### Role Reinforcement
- You are a **Memory Structure Initialization Specialist**
- Your role is to create the foundational two-tier memory architecture
- Set up directories systematically for shared and agent-specific knowledge
- Initialize configuration files
- Auto-proceed to memory synthesis

### Step-Specific Rules
- Check if structure already exists (warn if found)
- Create shared knowledge directories
- Create all 8 agent directories with knowledge/ and context/ subdirs
- Auto-proceed after successful setup

## EXECUTION PROTOCOLS
- 🎯 Create directory structure using subprocess if available
- 💾 Initialize metadata files
- 📊 Display setup progress
- ➡️ Auto-proceed to scanning and synthesis step

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {agentsMemoryPath}, {workflowPath}
- **Focus:** Directory structure setup only
- **Limits:** DO NOT scan documents or synthesize (next step)
- **Dependencies:** None - first init step

## MANDATORY SEQUENCE

### 1. Welcome Message

Display to {user_name}:

```
🚀 Knowledge Base Initialization - Step 1/3

Setting up two-tier memory structure...
Shared Knowledge: {sharedKnowledgePath}
Agent Knowledge: {agentsMemoryPath}
```

### 2. Check for Existing Structure

Check if structure already exists:

```bash
if [ -d "{sharedKnowledgePath}/memories" ] && [ -d "{agentsMemoryPath}" ]; then
  echo "⚠️  Memory structure already exists!"
  echo "Shared: {sharedKnowledgePath}"
  echo "Agents: {agentsMemoryPath}"
  echo ""
  echo "If you want to rebuild, use: --mode=rebuild"
  echo "To update existing knowledge, use: --mode=update"
  exit 1
fi
```

**If exists:** Abort initialization (prevents accidental overwrite)

### 3. Create Shared Knowledge Structure

Create shared knowledge directories:

```bash
echo "Creating shared knowledge structure..."

# Create main shared knowledge directory
mkdir -p "{sharedKnowledgePath}"

# Create memory category subdirectories
mkdir -p "{sharedKnowledgePath}/memories/requirements"
mkdir -p "{sharedKnowledgePath}/memories/architecture"
mkdir -p "{sharedKnowledgePath}/memories/integrations"
mkdir -p "{sharedKnowledgePath}/memories/operations"

# Create indexes directory
mkdir -p "{sharedKnowledgePath}/indexes"

# Create metadata directory
mkdir -p "{sharedKnowledgePath}/metadata"

echo "✓ Shared knowledge structure created"
```

### 4. Create Agent Directory Structure

Load agent list from grounding rules and create directories:

```bash
echo "Creating agent knowledge directories..."

# Read agent names from grounding-rules.yaml
# Agents: chief-editor, value-analyst, value-narrator, solution-consultant,
#         technical-wizard, product-manager, technical-scribe, solution-designer

agents=("chief-editor" "value-analyst" "value-narrator" "solution-consultant" 
        "technical-wizard" "product-manager" "technical-scribe" "solution-designer")

for agent in "${agents[@]}"; do
  echo "  Creating {agentsMemoryPath}/$agent/..."
  mkdir -p "{agentsMemoryPath}/$agent/knowledge"
  mkdir -p "{agentsMemoryPath}/$agent/context"
done

echo "✓ Agent directories created (8 agents)"
```

### 5. Initialize Metadata Files

Create initial metadata files:

```bash
echo "Initializing metadata..."

# Initialize source checksums file
cat > "{sharedKnowledgePath}/metadata/source-checksums.json" << 'EOF'
{
  "version": "1.0",
  "last_updated": "TIMESTAMP_PLACEHOLDER",
  "documents": {}
}
EOF

# Initialize synthesis log
cat > "{sharedKnowledgePath}/metadata/synthesis-log.jsonl" << 'EOF'
{"timestamp":"TIMESTAMP_PLACEHOLDER","event":"initialization","mode":"init"}
EOF

# Initialize doc-to-topic mapping
cat > "{sharedKnowledgePath}/metadata/doc-to-topic-map.json" << 'EOF'
{
  "version": "1.0",
  "mappings": {}
}
EOF

echo "✓ Metadata files initialized"
```

### 6. Display Setup Summary

Present summary:

```
✅ Memory Structure Setup Complete

Shared Knowledge:
  • {sharedKnowledgePath}/memories/requirements/
  • {sharedKnowledgePath}/memories/architecture/
  • {sharedKnowledgePath}/memories/integrations/
  • {sharedKnowledgePath}/memories/operations/
  • {sharedKnowledgePath}/indexes/
  • {sharedKnowledgePath}/metadata/

Agent Knowledge (8 agents):
  • chief-editor (knowledge/ + context/)
  • value-analyst (knowledge/ + context/)
  • value-narrator (knowledge/ + context/)
  • solution-consultant (knowledge/ + context/)
  • technical-wizard (knowledge/ + context/)
  • product-manager (knowledge/ + context/)
  • technical-scribe (knowledge/ + context/)
  • solution-designer (knowledge/ + context/)

Ready to scan documents and synthesize memories...
```

### 7. Auto-Proceed to Next Step

**CRITICAL:** Load, read entirely, then execute:

```
{nextStepFile}
```

## SUCCESS METRICS

### ✅ SUCCESS
- Shared knowledge directories created
- All 8 agent directories created with knowledge/ and context/
- Metadata files initialized
- Auto-proceeded to scanning step

### ❌ FAILURE
- Directory creation failed
- Permission errors
- Structure already exists (aborted correctly)

---

*Step 1 of 3 - Memory structure initialization complete*

**Structure created:**
```
{sidecarPath}/
├── indexes/
├── summaries/
├── extracts/
│   ├── technical-scribe/
│   ├── architect/
│   └── security-sentinel/
└── metadata/
```

### 4. Initialize config.yaml

Create configuration file:

```yaml
# Reference Document Sidecar Configuration
# Auto-generated during initialization

version: "2.0.0"
created_date: "[current date]"
source_path: "{source_docs_path}"

# Exclusion patterns (folders to skip during ingestion)
exclude_patterns:
  - "99-*"  # Archive folders

# Document categories expected
categories:
  - "01-context-and-requirements"
  - "02-architecture-and-design"
  - "03-security-and-integrations"
  - "04-operations-and-risks"

# Agent extract types
agent_extracts:
  - technical-scribe      # Technical facts and specifications
  - architect             # Patterns and decisions
  - security-sentinel     # Security requirements

# Metadata tracking
metadata:
  track_checksums: true
  log_processing: true
  checksum_algorithm: "sha256"
```

Write to: `{sidecarPath}/config.yaml`

### 5. Initialize README.md

Create README file:

```markdown
# Reference Document Knowledge Sidecar

**Sidecar Pattern Knowledge Base for Reference Documents**

## Overview

This directory contains extracted knowledge, indexes, and summaries from reference documents located in `{source_docs_path}`.

**Generated:** [current date]  
**Version:** 2.0.0  
**Pattern:** Sidecar (decoupled from workflows)

---

## Structure

\`\`\`
_memory/reference-docs-sidecar/
├── indexes/           ← Document and heading indexes
├── summaries/         ← Category-level summaries
├── extracts/          ← Agent-specific knowledge
├── metadata/          ← Checksums and processing logs
├── config.yaml        ← Configuration
└── README.md          ← This file
\`\`\`

---

## Files

### Indexes
- **doc-index.json** - Machine-readable document index
- **doc-index.md** - Human-readable document index
- **heading-index.md** - Hierarchical heading index

### Summaries
- Organized by category folder
- Each contains `summary.md` with category overview

### Extracts
- **technical-scribe/** - Technical facts and specifications
- **architect/** - Architectural patterns and decisions
- **security-sentinel/** - Security requirements and controls

### Metadata
- **source-checksums.json** - File checksums for change detection
- **processing-log.jsonl** - Processing history and errors

---

## Usage

**Update knowledge after document changes:**
- Re-invoke workflow with mode=update

**Validate integrity:**
- Re-invoke workflow with mode=validate

**Rebuild from scratch:**
- Re-invoke workflow with mode=rebuild

---

## Maintenance

- Run `--mode=update` after adding/modifying documents
- Run `--mode=validate` weekly to check integrity
- Run `--mode=rebuild` after major reorganizations

**Last Updated:** [current date]
```

Write to: `{sidecarPath}/README.md`

### 6. Initialize Metadata Files

Create empty/initial metadata files:

**source-checksums.json:**
```json
{}
```

**processing-log.jsonl:**
```jsonl
{"timestamp":"[current ISO timestamp]","action":"init","status":"started","message":"Sidecar structure initialized"}
```

### 7. Display Setup Summary

Show completion status:

```
✅ Sidecar Setup Complete

Structure Created:
  ✓ Main directory: {sidecarPath}
  ✓ Subdirectories: 4 folders
  ✓ Extract folders: 3 agent types
  
Configuration Initialized:
  ✓ config.yaml
  ✓ README.md
  ✓ Metadata files

Ready for document scanning...
```

### 8. Auto-Proceed to Document Scanning

**DO NOT wait for user input.**

Display:
```
Proceeding to document scanning and ingestion...
```

Then immediately load, read entire file, and execute {nextStepFile}.

## SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS
- Directory structure created successfully
- Config files initialized
- Metadata files created
- Auto-proceeded to next step

### ❌ SYSTEM FAILURE
- Not checking for existing sidecar
- Not creating all required directories
- Not initializing config files
- Halting for user input (FORBIDDEN)

**Master Rule:** Initialization is automated. Create structure and auto-proceed.
