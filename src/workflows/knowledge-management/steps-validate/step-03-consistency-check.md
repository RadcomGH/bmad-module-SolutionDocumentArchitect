---
name: 'step-03-consistency-check'
description: 'Verify cross-file consistency and data integrity'
nextStepFile: './step-04-report-complete.md'
sharedKnowledgePath: '{shared_knowledge_path}'
agentsMemoryPath: '{agents_memory_path}'
sourceDocsPath: '{source_docs_path}'
---

# Validate Step 3: Consistency Check

## STEP GOAL

Verify data consistency across memories, metadata, and source documents to detect orphans, duplicates, and integrity issues.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: When loading next step, ensure entire file is read
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ✅ Auto-proceed after consistency verification complete
- 🚫 DO NOT modify data (validation only)
- ⚠️ Report inconsistencies but continue validation

### Role Reinforcement
- You are a **Consistency Validation Specialist**
- Your role is to verify cross-file data integrity
- Check for orphaned memories (deleted source docs)
- Verify doc-to-topic mappings match actual memories
- Detect duplicate memory IDs
- Find missing source documents referenced in memories
- Report findings without modification
- Auto-proceed to final report

### Step-Specific Rules
- Verify all source documents in doc-to-topic-map still exist
- Check all memories reference existing source documents
- Detect duplicate memory_id values
- Verify memory index matches actual files
- Check agent extracts reference valid source documents

## EXECUTION PROTOCOLS
- 🔍 Verify cross-file references
- 📊 Detect orphans and duplicates
- ⚠️ Identify inconsistencies
- ➡️ Auto-proceed to report

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {agentsMemoryPath}, {sourceDocsPath}
- **Focus:** Cross-file consistency validation
- **Limits:** DO NOT fix issues (report only)
- **Dependencies:** Structure and content checks from steps 1-2

## MANDATORY SEQUENCE

### 1. Progress Message

Display:

```
🔍 Knowledge Base Validation - Step 3/4

Verifying data consistency...
Checking cross-file references and integrity...
```

### 2. Check for Orphaned Memories

Find memories whose source documents no longer exist:

```bash
echo ""
echo "Checking for orphaned memories..."

orphaned_memories=()
categories=("requirements" "architecture" "integrations" "operations")

for category in "${categories[@]}"; do
  category_dir="{sharedKnowledgePath}/memories/$category"
  
  if [ ! -d "$category_dir" ]; then
    continue
  fi
  
  mapfile -t memory_files < <(find "$category_dir" -name "*.md" 2>/dev/null)
  
  for memory_file in "${memory_files[@]}"; do
    # Extract source documents from frontmatter
    sources=$(sed -n '/^sources:$/,/^[a-z_]*:/p' "$memory_file" | grep '  - "' | sed 's/.*"\(.*\)".*/\1/')
    
    # Check each source document
    while IFS= read -r source_doc; do
      [ -z "$source_doc" ] && continue
      
      full_source_path="{sourceDocsPath}/$source_doc"
      
      if [ ! -f "$full_source_path" ]; then
        filename=$(basename "$memory_file")
        orphaned_memories+=("$category/$filename: Missing source $source_doc")
      fi
    done <<< "$sources"
  done
done

orphan_count=${#orphaned_memories[@]}

if [ "$orphan_count" -eq 0 ]; then
  echo "  ✅ No orphaned memories found"
else
  echo "  ⚠️  Found $orphan_count orphaned memories:"
  for orphan in "${orphaned_memories[@]:0:10}"; do
    echo "    - $orphan"
  done
  [ "$orphan_count" -gt 10 ] && echo "    ... and $((orphan_count - 10)) more"
fi
```

### 3. Verify Doc-to-Topic Map Accuracy

Check if mapped documents exist and topics match:

```bash
echo ""
echo "Verifying doc-to-topic mapping..."

topic_map_file="{sharedKnowledgePath}/metadata/doc-to-topic-map.json"

if [ ! -f "$topic_map_file" ]; then
  echo "  ⚠️  doc-to-topic-map.json missing (cannot verify)"
else
  # Count documents in map
  mapped_docs=$(jq 'length' "$topic_map_file")
  echo "  📄 Documents in map: $mapped_docs"
  
  # Check if mapped documents still exist
  missing_source_docs=()
  
  # Get all document paths from map
  doc_paths=$(jq -r 'keys[]' "$topic_map_file")
  
  while IFS= read -r doc_path; do
    [ -z "$doc_path" ] && continue
    
    full_path="{sourceDocsPath}/$doc_path"
    
    if [ ! -f "$full_path" ]; then
      missing_source_docs+=("$doc_path")
    fi
  done <<< "$doc_paths"
  
  missing_count=${#missing_source_docs[@]}
  
  if [ "$missing_count" -eq 0 ]; then
    echo "  ✅ All mapped documents exist"
  else
    echo "  ⚠️  $missing_count mapped documents no longer exist:"
    for doc in "${missing_source_docs[@]:0:10}"; do
      echo "    - $doc"
    done
    [ "$missing_count" -gt 10 ] && echo "    ... and $((missing_count - 10)) more"
  fi
fi
```

### 4. Check for Duplicate Memory IDs

Detect duplicate memory_id values:

```bash
echo ""
echo "Checking for duplicate memory IDs..."

# Collect all memory IDs
declare -A memory_id_map
duplicate_ids=()

for category in "${categories[@]}"; do
  category_dir="{sharedKnowledgePath}/memories/$category"
  
  if [ ! -d "$category_dir" ]; then
    continue
  fi
  
  mapfile -t memory_files < <(find "$category_dir" -name "*.md" 2>/dev/null)
  
  for memory_file in "${memory_files[@]}"; do
    # Extract memory_id from frontmatter
    memory_id=$(grep "^memory_id:" "$memory_file" | head -1 | sed 's/memory_id: *"\?\([^"]*\)"\?/\1/')
    
    if [ -n "$memory_id" ]; then
      if [ -n "${memory_id_map[$memory_id]}" ]; then
        # Duplicate found
        duplicate_ids+=("$memory_id: ${memory_id_map[$memory_id]} AND $(basename "$memory_file")")
      else
        memory_id_map[$memory_id]="$(basename "$memory_file")"
      fi
    fi
  done
done

duplicate_count=${#duplicate_ids[@]}

if [ "$duplicate_count" -eq 0 ]; then
  echo "  ✅ No duplicate memory IDs found"
else
  echo "  ⚠️  Found $duplicate_count duplicate memory IDs:"
  for dup in "${duplicate_ids[@]:0:10}"; do
    echo "    - $dup"
  done
  [ "$duplicate_count" -gt 10 ] && echo "    ... and $((duplicate_count - 10)) more"
fi
```

### 5. Verify Memory Index Accuracy

Check if memory index matches actual files:

```bash
echo ""
echo "Verifying memory index accuracy..."

memory_index="{sharedKnowledgePath}/indexes/memory-index.md"

if [ ! -f "$memory_index" ]; then
  echo "  ⚠️  memory-index.md missing (cannot verify)"
else
  # Count memories listed in index (rough estimate)
  indexed_count=$(grep -c "^- " "$memory_index" 2>/dev/null || echo 0)
  
  # Count actual memory files
  actual_count=0
  for category in "${categories[@]}"; do
    count=$(find "{sharedKnowledgePath}/memories/$category" -name "*.md" 2>/dev/null | wc -l)
    actual_count=$((actual_count + count))
  done
  
  echo "  📄 Memories in index: $indexed_count (approx)"
  echo "  📄 Actual memory files: $actual_count"
  
  difference=$((actual_count - indexed_count))
  if [ "${difference#-}" -lt 5 ]; then
    echo "  ✅ Index matches actual files (±$difference)"
  else
    echo "  ⚠️  Index mismatch: $difference file difference"
    echo "      (Index may need regeneration)"
  fi
fi
```

### 6. Check Agent Extract References

Verify agent extracts reference valid source documents:

```bash
echo ""
echo "Checking agent extract references..."

agents=("chief-editor" "value-analyst" "value-narrator" "solution-consultant" "technical-wizard" "product-manager" "technical-scribe" "solution-designer")

invalid_references=()
total_extracts_checked=0

for agent in "${agents[@]}"; do
  knowledge_dir="{agentsMemoryPath}/$agent/knowledge"
  
  if [ ! -d "$knowledge_dir" ]; then
    continue
  fi
  
  mapfile -t extract_files < <(find "$knowledge_dir" -name "*.md" 2>/dev/null)
  
  for extract_file in "${extract_files[@]}"; do
    ((total_extracts_checked++))
    
    # Extract source_document from frontmatter
    source_doc=$(grep "^source_document:" "$extract_file" | head -1 | sed 's/source_document: *"\?\([^"]*\)"\?/\1/')
    
    if [ -n "$source_doc" ]; then
      full_source_path="{sourceDocsPath}/$source_doc"
      
      if [ ! -f "$full_source_path" ]; then
        filename=$(basename "$extract_file")
        invalid_references+=("$agent/$filename: Missing source $source_doc")
      fi
    fi
  done
done

invalid_ref_count=${#invalid_references[@]}

echo "  📄 Agent extracts checked: $total_extracts_checked"

if [ "$invalid_ref_count" -eq 0 ]; then
  echo "  ✅ All agent extracts reference valid sources"
else
  echo "  ⚠️  Found $invalid_ref_count invalid references:"
  for ref in "${invalid_references[@]:0:10}"; do
    echo "    - $ref"
  done
  [ "$invalid_ref_count" -gt 10 ] && echo "    ... and $((invalid_ref_count - 10)) more"
fi
```

### 7. Check for Unprocessed Source Documents

Find source documents not in doc-to-topic-map:

```bash
echo ""
echo "Checking for unprocessed source documents..."

if [ ! -f "$topic_map_file" ]; then
  echo "  ⚠️  Cannot check (doc-to-topic-map.json missing)"
else
  # Get all current source documents
  mapfile -t current_docs < <(find "{sourceDocsPath}" -name "*.md" -not -path "*/99-*/*" 2>/dev/null | sed "s|{sourceDocsPath}/||")
  
  # Get mapped documents
  mapfile -t mapped_docs < <(jq -r 'keys[]' "$topic_map_file")
  
  # Find unprocessed documents
  unprocessed_docs=()
  
  for doc in "${current_docs[@]}"; do
    if ! printf '%s\n' "${mapped_docs[@]}" | grep -qF "$doc"; then
      unprocessed_docs+=("$doc")
    fi
  done
  
  unprocessed_count=${#unprocessed_docs[@]}
  
  echo "  📄 Total source documents: ${#current_docs[@]}"
  echo "  📄 Processed documents: ${#mapped_docs[@]}"
  
  if [ "$unprocessed_count" -eq 0 ]; then
    echo "  ✅ All source documents processed"
  else
    echo "  ⚠️  $unprocessed_count unprocessed documents:"
    for doc in "${unprocessed_docs[@]:0:10}"; do
      echo "    - $doc"
    done
    [ "$unprocessed_count" -gt 10 ] && echo "    ... and $((unprocessed_count - 10)) more"
    echo "      (Run --mode=update to process new documents)"
  fi
fi
```

### 8. Consistency Validation Summary

Display validation results:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Consistency Validation Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Data Integrity:
  {orphaned_status} Orphaned memories: {orphan_count}
  {missing_status} Missing source docs in map: {missing_count}
  {duplicate_status} Duplicate memory IDs: {duplicate_count}
  {index_status} Memory index accuracy: {index_accuracy}

Cross-References:
  {extract_status} Invalid extract references: {invalid_ref_count}
  {unprocessed_status} Unprocessed documents: {unprocessed_count}

Total Consistency Issues: {total_consistency_issues}

{consistency_recommendations}

Generating final validation report...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 9. Auto-Proceed to Report

Load and execute next step:

```
Loading step-04-report-complete.md...
```

**Read complete file {nextStepFile}, then execute it.**
