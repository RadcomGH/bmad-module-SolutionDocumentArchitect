---
name: 'step-01-prerequisites'
description: 'Verify structure and load metadata for incremental updates'
nextStepFile: './step-02-detect-changes.md'
sharedKnowledgePath: '{shared_knowledge_path}'
agentsMemoryPath: '{agents_memory_path}'
sourceDocsPath: '{source_docs_path}'
workflowPath: '{workflow_path}'
---

# Update Step 1: Prerequisites Check

## STEP GOAL

Verify memory structure exists, load existing metadata (checksums, topic mappings), and prepare for incremental knowledge base updates.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: When loading next step, ensure entire file is read
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ✅ Auto-proceed after verification completes
- 🚫 DO NOT halt for user input unless critical errors found

### Role Reinforcement
- You are an **Incremental Update Verification Specialist**
- Your role is to verify the memory structure is ready for updates
- Load existing metadata to understand current state
- Identify any structural issues before proceeding
- Auto-proceed if all prerequisites met

### Step-Specific Rules
- Verify both shared knowledge and agent directories exist
- Load source-checksums.json (track document changes)
- Load doc-to-topic-map.json (track document-to-memory mappings)
- Load synthesis-log.jsonl (processing history)
- Abort if critical structure missing

## EXECUTION PROTOCOLS
- 🎯 Verify directory structure integrity
- 📂 Load all required metadata files
- 🔍 Validate metadata file formats
- ➡️ Auto-proceed to change detection step

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {agentsMemoryPath}, {sourceDocsPath}, {workflowPath}
- **Focus:** Verification and metadata loading only
- **Limits:** DO NOT scan documents or detect changes (next step)
- **Dependencies:** Requires init mode to have been run previously

## MANDATORY SEQUENCE

### 1. Welcome Message

Display to {user_name}:

```
🔄 Knowledge Base Update - Step 1/4

Verifying memory structure and loading metadata...
Shared Knowledge: {sharedKnowledgePath}
Agent Knowledge: {agentsMemoryPath}
Source Documents: {sourceDocsPath}
```

### 2. Verify Shared Knowledge Structure

Check shared knowledge directories exist:

```bash
echo "Checking shared knowledge structure..."

if [ ! -d "{sharedKnowledgePath}/memories" ]; then
  echo "❌ ERROR: Shared knowledge memories directory not found"
  echo "Expected: {sharedKnowledgePath}/memories"
  echo ""
  echo "Please run initialization first: --mode=init"
  exit 1
fi

# Verify category subdirectories
for category in requirements architecture integrations operations; do
  if [ ! -d "{sharedKnowledgePath}/memories/$category" ]; then
    echo "❌ ERROR: Category directory missing: $category"
    exit 1
  fi
done

# Verify indexes directory
if [ ! -d "{sharedKnowledgePath}/indexes" ]; then
  echo "❌ ERROR: Indexes directory not found"
  exit 1
fi

# Verify metadata directory
if [ ! -d "{sharedKnowledgePath}/metadata" ]; then
  echo "❌ ERROR: Metadata directory not found"
  exit 1
fi

echo "✅ Shared knowledge structure verified"
```

### 3. Verify Agent Directories

Check all 8 agent directories exist with proper structure:

```bash
echo "Checking agent directories..."

agents=("chief-editor" "value-analyst" "value-narrator" "solution-consultant" "technical-wizard" "product-manager" "technical-scribe" "solution-designer")

for agent in "${agents[@]}"; do
  if [ ! -d "{agentsMemoryPath}/$agent" ]; then
    echo "❌ ERROR: Agent directory missing: $agent"
    exit 1
  fi
  
  if [ ! -d "{agentsMemoryPath}/$agent/knowledge" ]; then
    echo "❌ ERROR: Agent knowledge directory missing: $agent/knowledge"
    exit 1
  fi
  
  # Note: context/ directory may be empty but should exist
  if [ ! -d "{agentsMemoryPath}/$agent/context" ]; then
    echo "⚠️  WARNING: Agent context directory missing: $agent/context"
    echo "   Creating it now..."
    mkdir -p "{agentsMemoryPath}/$agent/context"
  fi
done

echo "✅ All 8 agent directories verified"
```

### 4. Load Source Checksums

Load existing checksums to detect changes:

```bash
echo "Loading document checksums..."

checksum_file="{sharedKnowledgePath}/metadata/source-checksums.json"

if [ ! -f "$checksum_file" ]; then
  echo "❌ ERROR: Checksum file not found: $checksum_file"
  echo "Cannot perform incremental update without checksum history"
  exit 1
fi

# Load and validate JSON format
if ! jq empty "$checksum_file" 2>/dev/null; then
  echo "❌ ERROR: Invalid JSON in checksum file"
  exit 1
fi

checksum_count=$(jq 'length' "$checksum_file")
echo "✅ Loaded checksums for $checksum_count documents"
```

Store checksums in memory for next step.

### 5. Load Topic Mapping

Load document-to-topic mappings:

```bash
echo "Loading topic mappings..."

topic_map_file="{sharedKnowledgePath}/metadata/doc-to-topic-map.json"

if [ ! -f "$topic_map_file" ]; then
  echo "❌ ERROR: Topic mapping file not found: $topic_map_file"
  exit 1
fi

if ! jq empty "$topic_map_file" 2>/dev/null; then
  echo "❌ ERROR: Invalid JSON in topic mapping file"
  exit 1
fi

mapping_count=$(jq 'length' "$topic_map_file")
echo "✅ Loaded mappings for $mapping_count documents"
```

Store mappings in memory for next step.

### 6. Load Synthesis Log

Load processing history:

```bash
echo "Loading synthesis log..."

log_file="{sharedKnowledgePath}/metadata/synthesis-log.jsonl"

if [ ! -f "$log_file" ]; then
  echo "⚠️  WARNING: Synthesis log not found (will create new one)"
  touch "$log_file"
else
  log_lines=$(wc -l < "$log_file")
  echo "✅ Loaded synthesis log ($log_lines entries)"
fi
```

### 7. Verify Source Documents Path

Ensure source documents directory is accessible:

```bash
echo "Verifying source documents..."

if [ ! -d "{sourceDocsPath}" ]; then
  echo "❌ ERROR: Source documents directory not found"
  echo "Expected: {sourceDocsPath}"
  exit 1
fi

doc_count=$(find "{sourceDocsPath}" -name "*.md" -not -path "*/99-*/*" | wc -l)
echo "✅ Found $doc_count markdown documents in source"
```

### 8. Summary and Continue

Display prerequisite check summary:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Prerequisites Check Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Structure:
✓ Shared knowledge directory with 4 categories
✓ All 8 agent directories with knowledge/context
✓ Indexes and metadata directories present

Metadata:
✓ Source checksums loaded ({checksum_count} documents)
✓ Topic mappings loaded ({mapping_count} documents)
✓ Synthesis log accessible

Ready to detect changes and update memories...
```

### 9. Auto-Proceed to Next Step

Load and execute next step (change detection):

```
Loading step-02-detect-changes.md...
```

**Read complete file {nextStepFile}, then execute it.**
