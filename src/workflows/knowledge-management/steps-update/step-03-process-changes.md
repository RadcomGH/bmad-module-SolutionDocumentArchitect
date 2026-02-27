---
name: 'step-03-process-changes'
description: 'Re-synthesize affected memories from changed/new documents'
nextStepFile: './step-03a-agent-extraction.md'
sharedKnowledgePath: '{shared_knowledge_path}'
sourceDocsPath: '{source_docs_path}'
workflowPath: '{workflow_path}'
---

# Update Step 3: Process Changes

## STEP GOAL

For changed and new documents, identify affected topics, re-synthesize those memories, and handle any conflicts that arise during update.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: When loading next step, ensure entire file is read
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ⏸️ HALT for human confirmation on significant conflicts
- ✅ Auto-proceed after conflict resolution to agent extraction
- 🎯 USE SUBPROCESS OPTIMIZATION for document processing

### Role Reinforcement
- You are a **Memory Re-Synthesis Specialist**
- Your role is to update affected memories with changed information
- Re-synthesize only the topics impacted by changes
- Preserve unaffected memories (incremental approach)
- Handle conflicts with human confirmation for significant issues
- Auto-proceed after memory updates complete

### Step-Specific Rules
- Load changed/new document lists from step-02
- Identify which topics are affected by these documents
- Re-synthesize ONLY affected memories
- For deleted documents, mark memories for review
- Apply conflict resolution as needed
- Update doc-to-topic-map with new mappings

## EXECUTION PROTOCOLS
- 🎯 Parse changed/new documents
- 🔍 Identify affected topics
- 🧬 Re-synthesize affected memories
- ⚠️ Handle conflicts with human confirmation
- ➡️ Auto-proceed to agent extraction after updates

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {sourceDocsPath}, {workflowPath}
- **Focus:** Memory re-synthesis for affected topics only
- **Limits:** DO NOT regenerate agent extracts (next step)
- **Dependencies:** Change lists from step-02

## MANDATORY SEQUENCE

### 1. Progress Message

Display:

```
🔄 Knowledge Base Update - Step 3/4

Processing changes and updating memories...
```

### 2. Load Configuration

Load synthesis rules and conflict resolution settings:

```bash
echo "Loading configuration..."

# Load grounding rules (synthesis settings, conflict resolution)
grounding_file="{workflowPath}/data/grounding-rules.yaml"

# Extract synthesis rules: smart filtering, recency bias, consolidation
# Extract conflict resolution: auto-resolve settings, severity triggers

echo "✓ Configuration loaded"
echo "  • Synthesis rules: Smart filtering ON (skip content < 100 chars)"
echo "  • Conflict resolution: MINOR auto-resolve, SIGNIFICANT requires confirmation"
echo "  • Recency bias: Prefer newer documents in conflicts"
```

### 3. Load Change Lists

Import change lists from step-02:

```bash
echo "Loading change lists..."

# Read changed documents
if [ -f "/tmp/km_changed_docs.txt" ]; then
  readarray -t changed_docs < /tmp/km_changed_docs.txt
  changed_count=${#changed_docs[@]}
else
  changed_docs=()
  changed_count=0
fi

# Read new documents
if [ -f "/tmp/km_new_docs.txt" ]; then
  readarray -t new_docs < /tmp/km_new_docs.txt
  new_count=${#new_docs[@]}
else
  new_docs=()
  new_count=0
fi

# Read deleted documents
if [ -f "/tmp/km_deleted_docs.txt" ]; then
  readarray -t deleted_docs < /tmp/km_deleted_docs.txt
  deleted_count=${#deleted_docs[@]}
else
  deleted_docs=()
  deleted_count=0
fi

echo "✓ Loaded $changed_count changed, $new_count new, $deleted_count deleted"
```

### 4. Load Topic Mapping

Load existing document-to-topic mappings:

```bash
echo "Loading topic mappings..."

topic_map_file="{sharedKnowledgePath}/metadata/doc-to-topic-map.json"

# Parse topic mapping into memory
# Format: { "doc/path.md": ["topic1", "topic2"], ... }
```

### 5. Identify Affected Topics

Determine which topics need re-synthesis:

```bash
echo ""
echo "Identifying affected topics..."

declare -A affected_topics

# For changed documents - get their existing topics
for doc in "${changed_docs[@]}"; do
  # Look up topics for this document
  topics=$(jq -r --arg doc "$doc" '.[$doc] // []' "$topic_map_file")
  
  # Add each topic to affected set
  while IFS= read -r topic; do
    if [ -n "$topic" ] && [ "$topic" != "null" ]; then
      affected_topics["$topic"]=1
    fi
  done < <(echo "$topics" | jq -r '.[]')
done

# For new documents - will scan for topics
echo "✓ Changed documents affect ${#affected_topics[@]} existing topics"
echo "✓ New documents will be scanned for topics"
```

### 6. Process Changed Documents

Re-synthesize memories for changed documents:

```bash
echo ""
echo "Processing changed documents..."

for doc_path in "${changed_docs[@]}"; do
  echo "  ✎ $doc_path"
  
  full_doc_path="{sourceDocsPath}/$doc_path"
  
  # Read document content
  doc_content=$(cat "$full_doc_path")
  
  # Extract topics from H2/H3 headings
  topics=$(echo "$doc_content" | grep -E "^##\s+|^###\s+" | sed 's/^##*\s*//' | head -20)
  
  # For each affected topic, re-synthesize memory
  while IFS= read -r topic; do
    [ -z "$topic" ] && continue
    
    # Apply smart filtering: skip trivial content
    content_extract=$(echo "$doc_content" | grep -A 5 "$topic" | tr -d '\n')
    if [ ${#content_extract} -lt 100 ]; then
      echo "    ⊘ Skipped (content < 100 chars): $topic"
      continue
    fi
    
    # Normalize topic with advanced heuristics
    # Expand abbreviations: HA→High Availability, DR→Disaster Recovery
    # Remove articles: a, an, the
    # Detect synonyms: Requirements/Specifications, Architecture/Design
    topic_normalized="$topic"
    topic_normalized=$(echo "$topic_normalized" | sed 's/\bHA\b/High Availability/g')
    topic_normalized=$(echo "$topic_normalized" | sed 's/\bDR\b/Disaster Recovery/g')
    topic_normalized=$(echo "$topic_normalized" | sed 's/\bAPI\b/Application Programming Interface/g')
    topic_normalized=$(echo "$topic_normalized" | sed -E 's/\b(a|an|the)\s+//gi')
    
    # Sanitize topic for filename
    topic_slug=$(echo "$topic_normalized" | tr '[:upper:]' '[:lower:]' | tr -s ' ' '_' | tr -cd '[:alnum:]_')
    
    # Determine category from document path
    category="architecture"  # Default
    if [[ "$doc_path" == *"01-context"* ]]; then
      category="requirements"
    elif [[ "$doc_path" == *"02-architecture"* ]]; then
      category="architecture"
    elif [[ "$doc_path" == *"03-security"* ]] || [[ "$doc_path" == *"integration"* ]]; then
      category="integrations"
    elif [[ "$doc_path" == *"04-operations"* ]]; then
      category="operations"
    fi
    
    memory_file="{sharedKnowledgePath}/memories/$category/${topic_slug}.md"
    
    # Check if memory already exists
    if [ -f "$memory_file" ]; then
      echo "    ↻ Updating memory: $topic"
      
      # Load existing memory content
      existing_content=$(cat "$memory_file")
      
      # Extract new information from changed document
      # (In production, use more sophisticated extraction)
      new_info=$(echo "$doc_content" | grep -A 10 "$topic")
      
      # Check for conflicts - compare new vs existing info
      conflict_detected=false
      conflict_severity="MINOR"
      
      # Simple heuristic: if content differs significantly, flag as conflict
      if ! echo "$existing_content" | grep -qF "$new_info"; then
        conflict_detected=true
        
        # Classify conflict severity using trigger keywords
        if echo "$topic" | grep -qiE "(requirement|architecture|critical|performance|security|integration)"; then
          conflict_severity="SIGNIFICANT"
        fi
      fi
      
      if [ "$conflict_detected" = true ] && [ "$conflict_severity" = "MINOR" ]; then
        echo "    ↻ Auto-resolving MINOR conflict (recency bias): $topic"
        # Auto-resolve: accept newer document
      elif [ "$conflict_detected" = true ] && [ "$conflict_severity" = "SIGNIFICANT" ]; then
        echo "    ⚠️  SIGNIFICANT conflict detected in: $topic"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "🔀 SIGNIFICANT CONFLICT - RESOLUTION REQUIRED"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "Topic: $topic"
        echo "Document: $doc_path"
        echo "Severity: SIGNIFICANT (contains critical trigger keywords)"
        echo ""
        echo "Existing Memory Content:"
        echo "$existing_content" | head -20
        echo "..."
        echo ""
        echo "New Document Content:"
        echo "$new_info" | head -20
        echo ""
        echo "How should this conflict be resolved?"
        echo ""
            echo "  [A] Accept newer document (recommended - recency bias)"
            echo "  [B] Keep existing memory (ignore new)"
            echo "  [M] Merge both with note"
            echo "  [C] Show full context for clarification"
            echo "  [S] Skip - needs manual review"
            echo ""
            read -p "Your choice [A/B/M/C/S]: " resolution
        case "$resolution" in
          A|a)
            echo "    ✓ Accepted new content, updating memory..."
            # Replace memory with new synthesis
            ;;
          B|b)
            echo "    ✓ Keeping existing memory..."
            continue
            ;;
          M|m)
            echo "    ✓ Merging both versions..."
            # Append new info with note
            ;;
          C|c)
            echo "    📄 Full context:"
            echo "$existing_content"
            echo "--- NEW ---"
            echo "$new_info"
            read -p "Press Enter to re-choose..."
            # Loop back
            ;;
          S|s)
                echo "    ⏭️  Skipped for manual review"
                continue
                ;;
            esac
          fi
      
      # Update memory file with new information
      # (Re-synthesize with template)
      
    else
      echo "    ⊕ Creating new memory: $topic"
      
      # Create new memory file from template
      memory_id="mem_${topic_slug}_$(date +%Y%m%d)"
      
      cat > "$memory_file" << 'MEMEOF'
---
memory_id: "${memory_id}"
topic: "${topic}"
category: "${category}"
sources:
  - "${doc_path}"
synthesized: true
date_created: "$(date -I)"
last_updated: "$(date -I)"
relevance_tags: []
---

# Memory: ${topic}

## Context

${extracted_context}

## Key Facts

${extracted_facts}

## Relationships

${extracted_relationships}

## Source Attribution

Synthesized from:
- ${doc_path} ($(date -I))
MEMEOF
    fi
    
  done <<< "$topics"
done

echo "✓ Changed documents processed"
```

### 7. Process New Documents

Scan new documents and create memories:

```bash
echo ""
echo "Processing new documents..."

for doc_path in "${new_docs[@]}"; do
  echo "  ⊕ $doc_path"
  
  # Similar to changed documents, but all topics are new
  # Extract topics and create new memory files
done

echo "✓ New documents processed"
```

### 8. Handle Deleted Documents

Mark memories from deleted documents for review:

```bash
echo ""
echo "Processing deleted documents..."

for doc_path in "${deleted_docs[@]}"; do
  echo "  ⊖ $doc_path"
  
  # Find memories that sourced from this document
  affected_memories=$(grep -r "source.*$doc_path" "{sharedKnowledgePath}/memories/" | cut -d: -f1)
  
  # Add warning note to these memories
  while IFS= read -r memory_file; do
    echo "    ⚠️  Marking for review: $(basename "$memory_file")"
    
    # Add note to memory frontmatter
    # warning: "Source document deleted: $doc_path"
  done <<< "$affected_memories"
done

echo "✓ Deleted documents handled"
```

### 9. Update Topic Mapping

Save updated document-to-topic mappings:

```bash
echo ""
echo "Updating topic mappings..."

# Update doc-to-topic-map.json with new mappings
# Remove deleted documents
# Add new documents
# Update changed documents

echo "✓ Topic mappings updated"
```

### 10. Update Memory Index

Regenerate memory index:

```bash
echo ""
echo "Updating memory index..."

# Count memories by category
req_count=$(find "{sharedKnowledgePath}/memories/requirements" -name "*.md" | wc -l)
arch_count=$(find "{sharedKnowledgePath}/memories/architecture" -name "*.md" | wc -l)
int_count=$(find "{sharedKnowledgePath}/memories/integrations" -name "*.md" | wc -l)
ops_count=$(find "{sharedKnowledgePath}/memories/operations" -name "*.md" | wc -l)

# Generate index from template
cat > "{sharedKnowledgePath}/indexes/memory-index.md" << 'INDEXEOF'
# Shared Knowledge Memory Index

Generated: $(date -I)
Total Memories: $((req_count + arch_count + int_count + ops_count))

## By Category

### Requirements (${req_count})
...

### Architecture (${arch_count})
...

### Integrations (${int_count})
...

### Operations (${ops_count})
...
INDEXEOF

echo "✓ Memory index updated"
```

### 11. Summary

Display processing summary:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Memory Updates Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Documents Processed:
  ✎ Changed: {changed_count}
  ⊕ New: {new_count}
  ⊖ Deleted: {deleted_count}

Memories Updated:
  ↻ Updated: {updated_count}
  ⊕ Created: {created_count}
  ⚠️  Marked for review: {review_count}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Phase 1 Complete: Shared Knowledge Memories

⚠️  CRITICAL: Two-Tier Knowledge Architecture

Phase 1 (Shared Memories): COMPLETE ✅
  • Topic-based memories synthesized
  • Cross-document consolidation applied
  • Conflicts resolved

Phase 2 (Agent Knowledge): STARTING NEXT ⚙️
  • Agent-specific extracts will be generated
  • Role-filtered knowledge per agent
  • Both phases are REQUIRED for complete knowledge management

Auto-proceeding to agent extraction...
```

### 12. Auto-Proceed to Agent Extraction

Load and execute next step:

```
Loading step-03a-agent-extraction.md...
```

**Read complete file {nextStepFile}, then execute it.**
