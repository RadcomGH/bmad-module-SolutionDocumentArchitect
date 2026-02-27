---
name: 'step-02-clean-sidecar'
description: 'Delete existing memories and agent knowledge (preserving contexts)'
nextStepFile: './step-03-rebuild-process.md'
sharedKnowledgePath: '{shared_knowledge_path}'
agentsMemoryPath: '{agents_memory_path}'
---

# Rebuild Step 2: Clean Sidecar

## STEP GOAL

Delete all existing memories and agent knowledge extracts while preserving directory structure and agent context directories.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: When loading next step, ensure entire file is read
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ⚠️ CRITICAL: Preserve agent context/ directories (NEVER delete)
- ✅ Auto-proceed after cleaning complete
- 🚫 DO NOT prompt user (backup already confirmed in step-01)

### Role Reinforcement
- You are a **Data Cleaning Specialist**
- Your role is to safely delete old memories
- Preserve directory structure (delete files, keep directories)
- NEVER touch agent context/ directories (agent-managed)
- Delete only .md files in memories/ and knowledge/ directories
- Auto-proceed to rebuild after cleaning complete

### Step-Specific Rules
- Delete all .md files in shared-knowledge/memories/*
- Delete all .md files in agents/{agent-name}/knowledge/
- Preserve all directories (do not delete directories)
- Clear metadata files (reset content, keep files)
- NEVER delete or touch context/ directories

## EXECUTION PROTOCOLS
- 🗑️ Delete memory files
- 🗑️ Delete agent extract files  
- 🔒 Preserve directory structure and contexts
- ➡️ Auto-proceed to rebuild

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {agentsMemoryPath}
- **Focus:** Safe file deletion
- **Limits:** DO NOT regenerate (next step)
- **Dependencies:** Backup confirmed in step-01

## MANDATORY SEQUENCE

### 1. Progress Message

Display:

```
🔄 Knowledge Base Rebuild - Step 2/6

Cleaning existing data...
Note: Agent contexts preserved (agent-managed)
```

### 2. Clean Shared Memories

Delete all memory files while preserving structure:

```bash
echo ""
echo "Cleaning shared memories..."

categories=("requirements" "architecture" "integrations" "operations")
total_deleted=0

for category in "${categories[@]}"; do
  category_dir="{sharedKnowledgePath}/memories/$category"
  
  if [ -d "$category_dir" ]; then
    # Count files before deletion
    file_count=$(find "$category_dir" -name "*.md" | wc -l)
    
    if [ "$file_count" -gt 0 ]; then
      echo "  🗑️  $category: deleting $file_count memories..."
      
      # Delete all .md files
      find "$category_dir" -name "*.md" -type f -delete
      
      total_deleted=$((total_deleted + file_count))
    else
      echo "  ℹ️  $category: already empty"
    fi
    
    # Verify deletion
    remaining=$(find "$category_dir" -name "*.md" | wc -l)
    if [ "$remaining" -gt 0 ]; then
      echo "    ⚠️  Warning: $remaining files remain"
    fi
  else
    echo "  ℹ️  $category: directory missing, will be created"
  fi
done

echo "  ✅ Deleted $total_deleted shared memories"
```

### 3. Clean Agent Knowledge Extracts

Delete all agent knowledge files while preserving contexts:

```bash
echo ""
echo "Cleaning agent knowledge extracts..."

agents=("chief-editor" "value-analyst" "value-narrator" "solution-consultant" "technical-wizard" "product-manager" "technical-scribe" "solution-designer")
total_extracts_deleted=0

for agent in "${agents[@]}"; do
  knowledge_dir="{agentsMemoryPath}/$agent/knowledge"
  context_dir="{agentsMemoryPath}/$agent/context"
  
  if [ -d "$knowledge_dir" ]; then
    # Count extract files
    extract_count=$(find "$knowledge_dir" -name "*.md" 2>/dev/null | wc -l)
    
    if [ "$extract_count" -gt 0 ]; then
      echo "  🗑️  $agent: deleting $extract_count extracts..."
      
      # Delete all .md files in knowledge/ only
      find "$knowledge_dir" -name "*.md" -type f -delete
      
      total_extracts_deleted=$((total_extracts_deleted + extract_count))
    else
      echo "  ℹ️  $agent: already empty"
    fi
  else
    echo "  ℹ️  $agent: knowledge/ missing, will be created"
  fi
  
  # Verify context/ directory preserved
  if [ -d "$context_dir" ]; then
    context_files=$(find "$context_dir" -type f | wc -l)
    echo "    ✅ Context preserved ($context_files files)"
  fi
done

echo "  ✅ Deleted $total_extracts_deleted agent extracts"
echo "  ✅ All agent contexts preserved"
```

### 4. Clear Metadata Files

Reset metadata while preserving structure:

```bash
echo ""
echo "Clearing metadata files..."

metadata_dir="{sharedKnowledgePath}/metadata"

# Clear source-checksums.json
checksums_file="$metadata_dir/source-checksums.json"
echo '{}' > "$checksums_file"
echo "  ✅ Cleared checksums"

# Clear doc-to-topic-map.json
topic_map_file="$metadata_dir/doc-to-topic-map.json"
echo '{}' > "$topic_map_file"
echo "  ✅ Cleared topic mappings"

# Keep synthesis-log.jsonl (append-only history)
# Do not delete or clear - it's an audit trail
log_file="$metadata_dir/synthesis-log.jsonl"
if [ -f "$log_file" ]; then
  log_lines=$(wc -l < "$log_file")
  echo "  ℹ️  Synthesis log preserved ($log_lines entries)"
fi
```

### 5. Clear Index Files

Remove generated indexes:

```bash
echo ""
echo "Clearing index files..."

indexes_dir="{sharedKnowledgePath}/indexes"

# Delete memory-index.md
memory_index="$indexes_dir/memory-index.md"
if [ -f "$memory_index" ]; then
  rm "$memory_index"
  echo "  ✅ Deleted memory index"
fi

# Delete agent-coverage.md
agent_coverage="$indexes_dir/agent-coverage.md"
if [ -f "$agent_coverage" ]; then
  rm "$agent_coverage"
  echo "  ✅ Deleted agent coverage index"
fi
```

### 6. Verify Cleaning Complete

Confirm all files deleted:

```bash
echo ""
echo "Verifying cleaning..."

# Count remaining memory files
remaining_memories=$(find "{sharedKnowledgePath}/memories" -name "*.md" 2>/dev/null | wc -l)

# Count remaining agent extracts
remaining_extracts=0
for agent in "${agents[@]}"; do
  count=$(find "{agentsMemoryPath}/$agent/knowledge" -name "*.md" 2>/dev/null | wc -l)
  remaining_extracts=$((remaining_extracts + count))
done

# Verify structure preserved
structure_ok=true
for category in "${categories[@]}"; do
  if [ ! -d "{sharedKnowledgePath}/memories/$category" ]; then
    structure_ok=false
  fi
done

if [ "$remaining_memories" -eq 0 ] && [ "$remaining_extracts" -eq 0 ] && [ "$structure_ok" = true ]; then
  echo "  ✅ Cleaning verified:"
  echo "    - All memory files deleted"
  echo "    - All agent extract files deleted"
  echo "    - Directory structure preserved"
  echo "    - Agent contexts preserved"
else
  echo "  ⚠️  Verification issues:"
  [ "$remaining_memories" -gt 0 ] && echo "    - $remaining_memories memories remain"
  [ "$remaining_extracts" -gt 0 ] && echo "    - $remaining_extracts extracts remain"
  [ "$structure_ok" = false ] && echo "    - Directory structure incomplete"
fi
```

### 7. Display Cleaning Summary

Show completion status:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Cleaning Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Deleted:
  🗑️  {total_deleted} shared memories
  🗑️  {total_extracts_deleted} agent extracts
  🗑️  Metadata cleared
  🗑️  Indexes cleared

Preserved:
  ✅ Directory structure
  ✅ Agent context directories
  ✅ Synthesis log (audit trail)
  ✅ Backup (from step-01)

Ready for full rebuild...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 8. Auto-Proceed to Rebuild

Load and execute next step:

```
Loading step-03-rebuild-process.md...
```

**Read complete file {nextStepFile}, then execute it.**
