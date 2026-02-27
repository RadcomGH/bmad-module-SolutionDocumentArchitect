---
name: 'step-04-verification'
description: 'Verify rebuild completeness and data integrity'
nextStepFile: './step-05-report-complete.md'
sharedKnowledgePath: '{shared_knowledge_path}'
agentsMemoryPath: '{agents_memory_path}'
sourceDocsPath: '{source_docs_path}'
---

# Rebuild Step 4: Verification

## STEP GOAL

Verify that all components of the knowledge base have been successfully rebuilt and are complete.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: When loading next step, ensure entire file is read
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ✅ Auto-proceed after verification complete
- ⚠️ Report any issues found but continue to report step
- 🚫 DO NOT halt for minor issues

### Role Reinforcement
- You are a **Rebuild Verification Specialist**
- Your role is to ensure rebuild completeness
- Check all directory structures exist
- Verify memories and extracts were created
- Count and validate metadata files
- Report findings and auto-proceed to report generation

### Step-Specific Rules
- Verify shared-knowledge structure (memories, indexes, metadata)
- Verify all 8 agent directories with knowledge/ subdirs
- Count memories by category
- Count agent extracts
- Check metadata file existence and validity
- DO NOT fix issues (report them for manual review if needed)

## EXECUTION PROTOCOLS
- 🔍 Verify directory structure
- 📊 Count generated content
- ✅ Validate metadata
- ➡️ Auto-proceed to reporting

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {agentsMemoryPath}, {sourceDocsPath}
- **Focus:** Verification and validation
- **Limits:** DO NOT regenerate or report complete (next step)
- **Dependencies:** All previous rebuild steps

## MANDATORY SEQUENCE

### 1. Progress Message

Display:

```
🔄 Knowledge Base Rebuild - Step 4/6

Verifying rebuild integrity...
Checking structure, content, and metadata...
```

### 2. Verify Shared Knowledge Structure

Check directory structure:

```bash
echo ""
echo "Verifying shared knowledge structure..."

shared_ok=true
categories=("requirements" "architecture" "integrations" "operations")

for category in "${categories[@]}"; do
  category_dir="{sharedKnowledgePath}/memories/$category"
  
  if [ -d "$category_dir" ]; then
    echo "  ✅ $category directory exists"
  else
    echo "  ❌ $category directory MISSING"
    shared_ok=false
  fi
done

# Check subdirectories
for subdir in "indexes" "metadata" "reports" "backups"; do
  if [ -d "{sharedKnowledgePath}/$subdir" ]; then
    echo "  ✅ $subdir directory exists"
  else
    echo "  ⚠️  $subdir directory missing (may be empty)"
  fi
done

[ "$shared_ok" = true ] && echo "✓ Shared knowledge structure OK"
```

### 3. Verify Agent Directories

Check all agent directories:

```bash
echo ""
echo "Verifying agent directories..."

agents=("chief-editor" "value-analyst" "value-narrator" "solution-consultant" "technical-wizard" "product-manager" "technical-scribe" "solution-designer")

agents_ok=true

for agent in "${agents[@]}"; do
  agent_dir="{agentsMemoryPath}/$agent"
  knowledge_dir="$agent_dir/knowledge"
  context_dir="$agent_dir/context"
  
  if [ -d "$agent_dir" ]; then
    # Check knowledge directory
    if [ -d "$knowledge_dir" ]; then
      echo "  ✅ $agent: knowledge/ exists"
    else
      echo "  ❌ $agent: knowledge/ MISSING"
      agents_ok=false
    fi
    
    # Check context directory (should exist, agent-managed)
    if [ -d "$context_dir" ]; then
      context_files=$(find "$context_dir" -type f | wc -l)
      echo "  ✅ $agent: context/ preserved ($context_files files)"
    else
      echo "  ℹ️  $agent: context/ (agent-managed, may not exist yet)"
    fi
  else
    echo "  ❌ $agent: directory MISSING"
    agents_ok=false
  fi
done

[ "$agents_ok" = true ] && echo "✓ All agent directories OK"
```

### 4. Count Memories by Category

Verify memories were created:

```bash
echo ""
echo "Counting shared memories..."

req_count=$(find "{sharedKnowledgePath}/memories/requirements" -name "*.md" 2>/dev/null | wc -l)
arch_count=$(find "{sharedKnowledgePath}/memories/architecture" -name "*.md" 2>/dev/null | wc -l)
int_count=$(find "{sharedKnowledgePath}/memories/integrations" -name "*.md" 2>/dev/null | wc -l)
ops_count=$(find "{sharedKnowledgePath}/memories/operations" -name "*.md" 2>/dev/null | wc -l)

total_memories=$((req_count + arch_count + int_count + ops_count))

echo "  Requirements: $req_count memories"
echo "  Architecture: $arch_count memories"
echo "  Integrations: $int_count memories"
echo "  Operations: $ops_count memories"
echo "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Total: $total_memories memories"

if [ "$total_memories" -eq 0 ]; then
  echo "  ⚠️  WARNING: No memories created (check source documents)"
  memories_ok=false
else
  echo "  ✓ Memories created successfully"
  memories_ok=true
fi
```

### 5. Count Agent Extracts

Verify agent extracts were generated:

```bash
echo ""
echo "Counting agent knowledge extracts..."

total_extracts=0
extracts_ok=true

for agent in "${agents[@]}"; do
  extract_count=$(find "{agentsMemoryPath}/$agent/knowledge" -name "*.md" 2>/dev/null | wc -l)
  
  echo "  $agent: $extract_count extracts"
  
  total_extracts=$((total_extracts + extract_count))
done

echo "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Total: $total_extracts extracts"

if [ "$total_extracts" -eq 0 ]; then
  echo "  ⚠️  WARNING: No agent extracts created"
  extracts_ok=false
else
  echo "  ✓ Agent extracts generated successfully"
fi
```

### 6. Verify Metadata Files

Check metadata existence and validity:

```bash
echo ""
echo "Verifying metadata files..."

metadata_ok=true

# Check source-checksums.json
checksums_file="{sharedKnowledgePath}/metadata/source-checksums.json"
if [ -f "$checksums_file" ]; then
  # Validate JSON
  if jq empty "$checksums_file" 2>/dev/null; then
    checksum_count=$(jq 'length' "$checksums_file")
    echo "  ✅ source-checksums.json ($checksum_count documents)"
  else
    echo "  ❌ source-checksums.json INVALID JSON"
    metadata_ok=false
  fi
else
  echo "  ⚠️  source-checksums.json missing"
  metadata_ok=false
fi

# Check doc-to-topic-map.json
topic_map_file="{sharedKnowledgePath}/metadata/doc-to-topic-map.json"
if [ -f "$topic_map_file" ]; then
  if jq empty "$topic_map_file" 2>/dev/null; then
    mapping_count=$(jq 'length' "$topic_map_file")
    echo "  ✅ doc-to-topic-map.json ($mapping_count documents)"
  else
    echo "  ❌ doc-to-topic-map.json INVALID JSON"
    metadata_ok=false
  fi
else
  echo "  ⚠️  doc-to-topic-map.json missing"
  metadata_ok=false
fi

# Check synthesis-log.jsonl
log_file="{sharedKnowledgePath}/metadata/synthesis-log.jsonl"
if [ -f "$log_file" ]; then
  log_lines=$(wc -l < "$log_file")
  echo "  ✅ synthesis-log.jsonl ($log_lines entries)"
else
  echo "  ℹ️  synthesis-log.jsonl (will be created on finalize)"
fi

[ "$metadata_ok" = true ] && echo "✓ Metadata files OK"
```

### 7. Verify Index Files

Check generated indexes:

```bash
echo ""
echo "Verifying index files..."

indexes_ok=true

# Check memory-index.md
memory_index="{sharedKnowledgePath}/indexes/memory-index.md"
if [ -f "$memory_index" ]; then
  index_lines=$(wc -l < "$memory_index")
  echo "  ✅ memory-index.md ($index_lines lines)"
else
  echo "  ⚠️  memory-index.md missing"
  indexes_ok=false
fi

# Check agent-coverage.md
agent_coverage="{sharedKnowledgePath}/indexes/agent-coverage.md"
if [ -f "$agent_coverage" ]; then
  coverage_lines=$(wc -l < "$agent_coverage")
  echo "  ✅ agent-coverage.md ($coverage_lines lines)"
else
  echo "  ⚠️  agent-coverage.md missing"
  indexes_ok=false
fi

[ "$indexes_ok" = true ] && echo "✓ Index files OK"
```

### 8. Overall Verification Status

Summarize verification results:

```bash
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Verification Results"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check critical components
critical_ok=true

if [ "$shared_ok" = true ]; then
  echo "  ✅ Shared knowledge structure"
else
  echo "  ❌ Shared knowledge structure"
  critical_ok=false
fi

if [ "$agents_ok" = true ]; then
  echo "  ✅ Agent directories"
else
  echo "  ❌ Agent directories"
  critical_ok=false
fi

if [ "$memories_ok" = true ]; then
  echo "  ✅ Memories created ($total_memories)"
else
  echo "  ⚠️  Memories ($total_memories - may be low)"
fi

if [ "$extracts_ok" = true ]; then
  echo "  ✅ Agent extracts ($total_extracts)"
else
  echo "  ⚠️  Agent extracts ($total_extracts - may be low)"
fi

if [ "$metadata_ok" = true ]; then
  echo "  ✅ Metadata files"
else
  echo "  ⚠️  Metadata files (some missing)"
fi

if [ "$indexes_ok" = true ]; then
  echo "  ✅ Index files"
else
  echo "  ⚠️  Index files (some missing)"
fi

echo ""

if [ "$critical_ok" = true ]; then
  echo "✅ Rebuild verification: PASSED"
  echo ""
  echo "All critical components verified successfully."
else
  echo "⚠️  Rebuild verification: WARNINGS"
  echo ""
  echo "Some components have issues. Review above for details."
  echo "Proceeding to final report..."
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

### 9. Auto-Proceed to Report

Load and execute next step:

```
Loading step-05-report-complete.md...
```

**Read complete file {nextStepFile}, then execute it.**
