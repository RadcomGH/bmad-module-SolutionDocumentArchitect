---
name: 'step-02-content-check'
description: 'Verify memory and extract file format and completeness'
nextStepFile: './step-03-consistency-check.md'
sharedKnowledgePath: '{shared_knowledge_path}'
agentsMemoryPath: '{agents_memory_path}'
workflowPath: '{workflow_path}'
---

# Validate Step 2: Content Check

## STEP GOAL

Verify that memory files and agent extracts follow proper format with complete frontmatter and content.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: When loading next step, ensure entire file is read
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ✅ Auto-proceed after content verification complete
- 🚫 DO NOT modify content (validation only)
- ⚠️ Report malformed files but continue validation

### Role Reinforcement
- You are a **Content Validation Specialist**
- Your role is to verify file format compliance
- Check frontmatter completeness (YAML)
- Verify required fields exist
- Identify malformed or incomplete files
- Report findings without modification
- Auto-proceed to consistency validation

### Step-Specific Rules
- Verify memory files follow memory-schema.yaml
- Check frontmatter: memory_id, topic, category, sources, dates
- Verify agent extracts have proper frontmatter
- Check for empty or malformed YAML
- Report issues without fixing them

## EXECUTION PROTOCOLS
- 🔍 Verify file format
- 📊 Check frontmatter completeness
- ⚠️ Identify malformed files
- ➡️ Auto-proceed to consistency check

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {agentsMemoryPath}, {workflowPath}
- **Focus:** File format and content validation
- **Limits:** DO NOT check cross-file consistency (next step)
- **Dependencies:** Structure check from step-01

## MANDATORY SEQUENCE

### 1. Progress Message

Display:

```
🔍 Knowledge Base Validation - Step 2/4

Verifying file content and format...
Checking memory files and agent extracts...
```

### 2. Sample Memory Files from Each Category

Check memory file format:

```bash
echo ""
echo "Checking memory file format..."

categories=("requirements" "architecture" "integrations" "operations")

total_memories=0
valid_memories=0
invalid_memories=0
issues_found=()

for category in "${categories[@]}"; do
  category_dir="{sharedKnowledgePath}/memories/$category"
  
  if [ ! -d "$category_dir" ]; then
    echo "  ⚠️  $category: directory missing (skipped)"
    continue
  fi
  
  # Get all memory files
  mapfile -t memory_files < <(find "$category_dir" -name "*.md" 2>/dev/null)
  category_count=${#memory_files[@]}
  total_memories=$((total_memories + category_count))
  
  if [ "$category_count" -eq 0 ]; then
    echo "  ℹ️  $category: no memories to validate"
    continue
  fi
  
  echo "  📋 $category: validating $category_count memories..."
  
  # Sample up to 5 files per category for detailed validation
  sample_count=$(( category_count < 5 ? category_count : 5 ))
  
  for (( i=0; i<sample_count; i++ )); do
    file="${memory_files[$i]}"
    filename=$(basename "$file")
    
    # Check if file has frontmatter
    if ! grep -q "^---$" "$file"; then
      echo "    ❌ $filename: No YAML frontmatter"
      ((invalid_memories++))
      issues_found+=("$category/$filename: Missing frontmatter")
      continue
    fi
    
    # Extract frontmatter
    frontmatter=$(sed -n '/^---$/,/^---$/p' "$file" | head -n -1 | tail -n +2)
    
    # Check required fields
    has_memory_id=false
    has_topic=false
    has_category=false
    has_sources=false
    
    echo "$frontmatter" | grep -q "memory_id:" && has_memory_id=true
    echo "$frontmatter" | grep -q "topic:" && has_topic=true
    echo "$frontmatter" | grep -q "category:" && has_category=true
    echo "$frontmatter" | grep -q "sources:" && has_sources=true
    
    if [ "$has_memory_id" = true ] && [ "$has_topic" = true ] && \
       [ "$has_category" = true ] && [ "$has_sources" = true ]; then
      ((valid_memories++))
    else
      echo "    ⚠️  $filename: Incomplete frontmatter"
      ((invalid_memories++))
      
      missing_fields=""
      [ "$has_memory_id" = false ] && missing_fields="${missing_fields}memory_id "
      [ "$has_topic" = false ] && missing_fields="${missing_fields}topic "
      [ "$has_category" = false ] && missing_fields="${missing_fields}category "
      [ "$has_sources" = false ] && missing_fields="${missing_fields}sources "
      
      issues_found+=("$category/$filename: Missing fields: $missing_fields")
    fi
  done
  
  # Report category summary
  if [ "$sample_count" -lt "$category_count" ]; then
    echo "    ℹ️  Validated $sample_count/$category_count (sample)"
  else
    echo "    ✓ Validated all $category_count memories"
  fi
done

echo ""
echo "Memory Format Summary:"
echo "  Total memories: $total_memories"
echo "  Validated (sample): $((valid_memories + invalid_memories))"
echo "  Valid: $valid_memories"
echo "  Issues found: $invalid_memories"
```

### 3. Sample Agent Extract Files

Check agent extract format:

```bash
echo ""
echo "Checking agent extract format..."

agents=("chief-editor" "value-analyst" "value-narrator" "solution-consultant" "technical-wizard" "product-manager" "technical-scribe" "solution-designer")

total_extracts=0
valid_extracts=0
invalid_extracts=0

for agent in "${agents[@]}"; do
  knowledge_dir="{agentsMemoryPath}/$agent/knowledge"
  
  if [ ! -d "$knowledge_dir" ]; then
    echo "  ⚠️  $agent: knowledge/ missing (skipped)"
    continue
  fi
  
  # Get all extract files
  mapfile -t extract_files < <(find "$knowledge_dir" -name "*.md" 2>/dev/null)
  extract_count=${#extract_files[@]}
  total_extracts=$((total_extracts + extract_count))
  
  if [ "$extract_count" -eq 0 ]; then
    echo "  ℹ️  $agent: no extracts to validate"
    continue
  fi
  
  echo "  👤 $agent: validating $extract_count extracts..."
  
  # Sample up to 3 files per agent
  sample_count=$(( extract_count < 3 ? extract_count : 3 ))
  
  for (( i=0; i<sample_count; i++ )); do
    file="${extract_files[$i]}"
    filename=$(basename "$file")
    
    # Check frontmatter
    if ! grep -q "^---$" "$file"; then
      echo "    ❌ $filename: No frontmatter"
      ((invalid_extracts++))
      issues_found+=("$agent/$filename: Missing frontmatter")
      continue
    fi
    
    # Extract frontmatter
    frontmatter=$(sed -n '/^---$/,/^---$/p' "$file" | head -n -1 | tail -n +2)
    
    # Check required fields for extracts
    has_extract_id=false
    has_agent_name=false
    has_source_doc=false
    
    echo "$frontmatter" | grep -q "extract_id:" && has_extract_id=true
    echo "$frontmatter" | grep -q "agent_name:" && has_agent_name=true
    echo "$frontmatter" | grep -q "source_document:" && has_source_doc=true
    
    if [ "$has_extract_id" = true ] && [ "$has_agent_name" = true ] && \
       [ "$has_source_doc" = true ]; then
      ((valid_extracts++))
    else
      echo "    ⚠️  $filename: Incomplete frontmatter"
      ((invalid_extracts++))
      
      missing_fields=""
      [ "$has_extract_id" = false ] && missing_fields="${missing_fields}extract_id "
      [ "$has_agent_name" = false ] && missing_fields="${missing_fields}agent_name "
      [ "$has_source_doc" = false ] && missing_fields="${missing_fields}source_document "
      
      issues_found+=("$agent/$filename: Missing fields: $missing_fields")
    fi
  done
  
  if [ "$sample_count" -lt "$extract_count" ]; then
    echo "    ℹ️  Validated $sample_count/$extract_count (sample)"
  else
    echo "    ✓ Validated all $extract_count extracts"
  fi
done

echo ""
echo "Agent Extract Format Summary:"
echo "  Total extracts: $total_extracts"
echo "  Validated (sample): $((valid_extracts + invalid_extracts))"
echo "  Valid: $valid_extracts"
echo "  Issues found: $invalid_extracts"
```

### 4. Check Metadata File Format

Verify metadata files are valid JSON:

```bash
echo ""
echo "Checking metadata files..."

metadata_ok=true

# Check source-checksums.json
checksums_file="{sharedKnowledgePath}/metadata/source-checksums.json"
if [ -f "$checksums_file" ]; then
  if jq empty "$checksums_file" 2>/dev/null; then
    checksum_count=$(jq 'length' "$checksums_file")
    echo "  ✅ source-checksums.json: Valid JSON ($checksum_count entries)"
  else
    echo "  ❌ source-checksums.json: INVALID JSON"
    metadata_ok=false
    issues_found+=("source-checksums.json: Invalid JSON format")
  fi
else
  echo "  ⚠️  source-checksums.json: Missing"
  metadata_ok=false
  issues_found+=("source-checksums.json: File missing")
fi

# Check doc-to-topic-map.json
topic_map_file="{sharedKnowledgePath}/metadata/doc-to-topic-map.json"
if [ -f "$topic_map_file" ]; then
  if jq empty "$topic_map_file" 2>/dev/null; then
    mapping_count=$(jq 'length' "$topic_map_file")
    echo "  ✅ doc-to-topic-map.json: Valid JSON ($mapping_count entries)"
  else
    echo "  ❌ doc-to-topic-map.json: INVALID JSON"
    metadata_ok=false
    issues_found+=("doc-to-topic-map.json: Invalid JSON format")
  fi
else
  echo "  ⚠️  doc-to-topic-map.json: Missing"
  metadata_ok=false
  issues_found+=("doc-to-topic-map.json: File missing")
fi

# Check synthesis-log.jsonl
log_file="{sharedKnowledgePath}/metadata/synthesis-log.jsonl"
if [ -f "$log_file" ]; then
  log_lines=$(wc -l < "$log_file")
  
  # Validate each line is valid JSON
  invalid_lines=0
  while IFS= read -r line; do
    if ! echo "$line" | jq empty 2>/dev/null; then
      ((invalid_lines++))
    fi
  done < "$log_file"
  
  if [ "$invalid_lines" -eq 0 ]; then
    echo "  ✅ synthesis-log.jsonl: Valid JSONL ($log_lines entries)"
  else
    echo "  ⚠️  synthesis-log.jsonl: $invalid_lines invalid lines out of $log_lines"
    issues_found+=("synthesis-log.jsonl: $invalid_lines invalid JSON lines")
  fi
else
  echo "  ℹ️  synthesis-log.jsonl: Not yet created (OK for new installs)"
fi
```

### 5. Check Index Files

Verify index files exist and are not empty:

```bash
echo ""
echo "Checking index files..."

# Check memory-index.md
memory_index="{sharedKnowledgePath}/indexes/memory-index.md"
if [ -f "$memory_index" ]; then
  index_lines=$(wc -l < "$memory_index")
  if [ "$index_lines" -gt 10 ]; then
    echo "  ✅ memory-index.md: Exists ($index_lines lines)"
  else
    echo "  ⚠️  memory-index.md: Exists but may be incomplete ($index_lines lines)"
    issues_found+=("memory-index.md: May be incomplete")
  fi
else
  echo "  ⚠️  memory-index.md: Missing"
  issues_found+=("memory-index.md: File missing")
fi

# Check agent-coverage.md
agent_coverage="{sharedKnowledgePath}/indexes/agent-coverage.md"
if [ -f "$agent_coverage" ]; then
  coverage_lines=$(wc -l < "$agent_coverage")
  if [ "$coverage_lines" -gt 10 ]; then
    echo "  ✅ agent-coverage.md: Exists ($coverage_lines lines)"
  else
    echo "  ⚠️  agent-coverage.md: Exists but may be incomplete ($coverage_lines lines)"
    issues_found+=("agent-coverage.md: May be incomplete")
  fi
else
  echo "  ⚠️  agent-coverage.md: Missing"
  issues_found+=("agent-coverage.md: File missing")
fi
```

### 6. Content Validation Summary

Display validation results:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Content Validation Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Memory Files:
  Total: {total_memories}
  Validated (sample): {validated_count}
  Valid format: {valid_memories}
  Issues found: {invalid_memories}

Agent Extracts:
  Total: {total_extracts}
  Validated (sample): {validated_count}
  Valid format: {valid_extracts}
  Issues found: {invalid_extracts}

Metadata:
  {metadata_status}

Indexes:
  {indexes_status}

Total Issues: {total_issues}

{issues_list}

Proceeding to consistency validation...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 7. Auto-Proceed to Consistency Check

Load and execute next step:

```
Loading step-03-consistency-check.md...
```

**Read complete file {nextStepFile}, then execute it.**
