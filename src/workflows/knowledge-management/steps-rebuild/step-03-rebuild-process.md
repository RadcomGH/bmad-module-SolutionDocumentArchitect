---
name: 'step-03-rebuild-process'
description: 'Synthesize all memories from scratch with conflict detection'
nextStepFile: './step-03a-agent-extraction.md'
sharedKnowledgePath: '{shared_knowledge_path}'
sourceDocsPath: '{source_docs_path}'
workflowPath: '{workflow_path}'
---

# Rebuild Step 3: Full Memory Synthesis

## STEP GOAL

Scan all source documents and synthesize memories from scratch with human-confirmed conflict resolution.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: When loading next step, ensure entire file is read
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- 🎯 USE SUBPROCESS OPTIMIZATION for document processing
- ⚠️ HALT for human confirmation on SIGNIFICANT conflicts
- ✅ Auto-proceed after synthesis complete
- 🚫 DO NOT skip conflict resolution

### Role Reinforcement
- You are a **Memory Synthesis Specialist**
- Your role is to create high-quality cross-document memories
- Extract topics from document headings (H2/H3)
- Synthesize related information across multiple documents
- Detect conflicts and request human resolution
- Auto-proceed to agent extraction after synthesis complete

### Step-Specific Rules
- Scan all source documents (excluding 99-archive/)
- Extract topics from H2/H3 headings
- Synthesize memories by topic across documents
- Detect conflicts when multiple docs have different info
- Present conflict resolution menu (A/B/M/C/S)
- Create memory files from template
- Update doc-to-topic-map.json
- Generate memory-index.md

## EXECUTION PROTOCOLS
- 📄 Scan all source documents
- 🔍 Extract topics and synthesize
- ⚠️ Halt for conflict resolution
- ➡️ Auto-proceed after synthesis

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {sourceDocsPath}, {workflowPath}
- **Focus:** Memory synthesis from source documents
- **Limits:** DO NOT generate agent extracts (next step)
- **Dependencies:** Clean sidecar from step-02

## MANDATORY SEQUENCE

### 1. Progress Message

Display:

```
🔄 Knowledge Base Rebuild - Step 3/6

Synthesizing memories from all source documents...
Mode: Topic-based synthesis with conflict resolution
This may take 5-8 minutes for comprehensive analysis.
```

### 2. Load Configuration

Load synthesis rules and conflict resolution settings:

```bash
echo ""
echo "Loading synthesis configuration..."

grounding_file="{workflowPath}/data/grounding-rules.yaml"

# Extract synthesis settings
# - synthesis_rules: smart_filtering, recency_bias, min_content_length
# - conflict_resolution: severity_triggers, auto_resolve_threshold

echo "✓ Configuration loaded"
echo "  • Smart filtering: ON (skip content < 100 chars)"
echo "  • Recency bias: ON (prefer newer documents)"
echo "  • Conflict severity: MINOR (auto-resolve) vs SIGNIFICANT (human)"
```

### 3. Scan Source Documents

**Use subprocess optimization for file finding:**

```bash
echo ""
echo "Scanning source documents..."

# Find all .md files excluding archives (subprocess optimization)
mapfile -t all_docs < <(find "{sourceDocsPath}" -name "*.md" -not -path "*/99-*/*" | sort)

doc_count=${#all_docs[@]}

echo "✓ Found $doc_count documents to process"
```

### 4. Initialize Tracking

Prepare data structures:

```bash
echo ""
echo "Initializing synthesis tracking..."

# Associative arrays for tracking
declare -A topic_to_docs       # topic -> list of source documents
declare -A topic_to_category   # topic -> category (requirements/architecture/integrations/operations)
declare -A topic_to_content    # topic -> synthesized content
declare -A doc_to_topics       # document -> list of topics found

memories_created=0
conflicts_detected=0

echo "✓ Tracking initialized"
```

### 5. Extract Topics from All Documents

Scan documents and extract topics:

```bash
echo ""
echo "Extracting topics from documents..."

processed=0

for doc_path in "${all_docs[@]}"; do
  ((processed++))
  
  # Progress indicator
  if (( processed % 10 == 0 )); then
    echo "  Processing... $processed/$doc_count documents"
  fi
  
  # Determine category from path
  category="architecture"  # Default
  if [[ "$doc_path" == *"01-context"* ]] || [[ "$doc_path" == *"requirements"* ]]; then
    category="requirements"
  elif [[ "$doc_path" == *"02-architecture"* ]] || [[ "$doc_path" == *"design"* ]]; then
    category="architecture"
  elif [[ "$doc_path" == *"03-security"* ]] || [[ "$doc_path" == *"integration"* ]]; then
    category="integrations"
  elif [[ "$doc_path" == *"04-operations"* ]] || [[ "$doc_path" == *"deployment"* ]]; then
    category="operations"
  fi
  
  # Read document
  full_path="{sourceDocsPath}/$doc_path"
  if [ ! -f "$full_path" ]; then
    continue
  fi
  
  doc_content=$(cat "$full_path")
  
  # Extract H2 and H3 headings as topics
  topics=$(echo "$doc_content" | grep -E "^##\s+|^###\s+" | sed 's/^##*\s*//' | head -30)
  
  # Track topics found in this document
  doc_topics_list=""
  
  while IFS= read -r topic; do
    [ -z "$topic" ] && continue
    
    # Apply normalization heuristics:
    # 1. Expand abbreviations (HA→High Availability, DR→Disaster Recovery)
    # 2. Remove articles (a, an, the)
    # 3. Detect synonyms (Requirements=Specifications, Architecture=Design)
    topic_normalized=$(echo "$topic" | sed -e 's/\bHA\b/High Availability/g' -e 's/\bDR\b/Disaster Recovery/g' -e 's/\bAPI\b/Application Programming Interface/g')
    
    # Sanitize to slug
    topic_slug=$(echo "$topic_normalized" | tr '[:upper:]' '[:lower:]' | sed -e 's/\b\(a\|an\|the\)\b//g' | tr -s ' ' '_' | tr -cd '[:alnum:]_')
    
    # Skip if slug is empty or too short
    [ ${#topic_slug} -lt 3 ] && continue
    
    # Track: topic -> documents
    if [ -z "${topic_to_docs[$topic_slug]}" ]; then
      topic_to_docs[$topic_slug]="$doc_path"
    else
      topic_to_docs[$topic_slug]="${topic_to_docs[$topic_slug]}|$doc_path"
    fi
    
    # Track: topic -> category (use first seen)
    if [ -z "${topic_to_category[$topic_slug]}" ]; then
      topic_to_category[$topic_slug]="$category"
    fi
    
    # Track: document -> topics
    if [ -z "$doc_topics_list" ]; then
      doc_topics_list="$topic_slug"
    else
      doc_topics_list="$doc_topics_list|$topic_slug"
    fi
    
  done <<< "$topics"
  
  # Store document's topics
  doc_to_topics[$doc_path]="$doc_topics_list"
done

topic_count=${#topic_to_docs[@]}
echo "✓ Extracted $topic_count unique topics from $doc_count documents"
```

### 6. Synthesize Memories by Topic

For each topic, synthesize across all source documents:

```bash
echo ""
echo "Synthesizing memories..."
echo ""

for topic_slug in "${!topic_to_docs[@]}"; do
  # Get source documents for this topic
  IFS='|' read -ra source_docs <<< "${topic_to_docs[$topic_slug]}"
  source_count=${#source_docs[@]}
  
  category="${topic_to_category[$topic_slug]}"
  
  # Display readable topic name
  topic_name=$(echo "$topic_slug" | tr '_' ' ' | sed 's/.*/\u&/')
  
  echo "  📝 Topic: $topic_name"
  echo "     Category: $category"
  echo "     Sources: $source_count document(s)"
  
  # Collect content from all source documents
  synthesized_content=""
  
  for source_doc in "${source_docs[@]}"; do
    full_doc_path="{sourceDocsPath}/$source_doc"
    
    if [ ! -f "$full_doc_path" ]; then
      continue
    fi
    
    # Extract relevant sections (headings matching topic)
    doc_content=$(cat "$full_doc_path")
    
    # Find sections related to this topic (simplified extraction)
    relevant_section=$(echo "$doc_content" | grep -A 20 -i "$topic_name" | head -40)
    
    # Apply smart filtering - skip trivial content (< 100 chars)
    section_length=${#relevant_section}
    if [ "$section_length" -lt 100 ]; then
      continue  # Skip trivial content
    fi
    
    # If multiple sources, check for conflicts
    if [ "$source_count" -gt 1 ] && [ -n "$synthesized_content" ] && [ -n "$relevant_section" ]; then
      # Conflict detection: check if content differs significantly
      if ! echo "$synthesized_content" | grep -qF "$(echo "$relevant_section" | head -10)"; then
        ((conflicts_detected++))
        
        # Determine conflict severity
        conflict_severity="minor"
        if echo "$relevant_section" | grep -qiE '(requirement|architecture|critical|performance|security|must|shall|deprecated)'; then
          conflict_severity="significant"
        fi
        
        # Auto-resolve MINOR conflicts with recency bias
        if [ "$conflict_severity" = "minor" ]; then
          echo "     ↻ Auto-resolving minor conflict (using newer document with recency bias)"
          # Use newer content, merge with note
          synthesized_content="$synthesized_content

--- Additional Information from $source_doc (newer) ---

$relevant_section"
          continue
        fi
        
        # HALT for SIGNIFICANT conflicts
        echo ""
        echo "     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "     🔀 SIGNIFICANT CONFLICT DETECTED"
        echo "     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "     Topic: $topic_name"
        echo "     Severity: SIGNIFICANT (contains critical keywords)"
        echo "     Sources have different information"
        echo ""
        echo "     Source 1: ${source_docs[0]} (older)"
        echo "     (First 10 lines)"
        echo "$synthesized_content" | head -10
        echo ""
        echo "     Source 2: $source_doc (newer)"
        echo "     (First 10 lines)"
        echo "$relevant_section" | head -10
        echo ""
        echo "     How should this be resolved?"
        echo ""
        echo "       [A] Use first source (${source_docs[0]} - older)"
        echo "       [B] Use second source ($source_doc - newer, recommended)"
        echo "       [M] Merge both sources with note"
        echo "       [C] Show full context"
        echo "       [S] Skip - manual review needed"
        echo ""
        read -p "     Your choice [A/B/M/C/S]: " resolution
        
        case "$resolution" in
          A|a)
            echo "     ✓ Using first source (older)"
            # Keep existing synthesized_content
            ;;
          B|b)
            echo "     ✓ Using second source with recency bias (newer)"
            synthesized_content="$relevant_section"
            ;;
          M|m)
            echo "     ✓ Merging sources"
            synthesized_content="$synthesized_content

--- Additional Information from $source_doc ---

$relevant_section"
            ;;
          C|c)
            echo "     📄 Full context:"
            echo "Source 1: ${source_docs[0]}"
            echo "$synthesized_content"
            echo ""
            echo "Source 2: $source_doc"
            echo "$relevant_section"
            read -p "Press Enter to re-choose..." dummy
            # Loop would continue, but for simplicity, use first source
            ;;
          S|s)
            echo "     ⏭️  Skipped - marking for review"
            synthesized_content="$synthesized_content

⚠️ MANUAL REVIEW NEEDED: Conflicting information from multiple sources.
$relevant_section"
            ;;
        esac
        
        echo "     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
      else
        # Content similar, append silently
        synthesized_content="$synthesized_content

$relevant_section"
      fi
    else
      # First source or no conflict
      if [ -z "$synthesized_content" ]; then
        synthesized_content="$relevant_section"
      else
        synthesized_content="$synthesized_content

$relevant_section"
      fi
    fi
  done
  
  # Create memory file
  memory_id="mem_${topic_slug}_$(date +%Y%m%d)"
  memory_file="{sharedKnowledgePath}/memories/$category/${topic_slug}.md"
  
  # Build source list
  sources_yaml=""
  for source_doc in "${source_docs[@]}"; do
    sources_yaml="$sources_yaml  - \"$source_doc\"
"
  done
  
  # Write memory file from template
  cat > "$memory_file" << MEMEOF
---
memory_id: "${memory_id}"
topic: "${topic_name}"
category: "${category}"
sources:
${sources_yaml}synthesized: true
date_created: "$(date -I)"
last_updated: "$(date -I)"
relevance_tags: []
---

# Memory: ${topic_name}

## Context

${synthesized_content}

## Key Facts

(Extract key facts from context above)

## Relationships

(Related topics and dependencies)

## Source Attribution

Synthesized from $source_count source document(s):
${sources_yaml}
Last synthesized: $(date -I)
MEMEOF
  
  ((memories_created++))
  echo "     ✅ Memory created: $memory_file"
  echo ""
done

echo "✓ Synthesis complete: $memories_created memories created"
[ "$conflicts_detected" -gt 0 ] && echo "  ⚠️  $conflicts_detected conflicts resolved"
```

### 7. Update Doc-to-Topic Mapping

Save document-to-topic relationships:

```bash
echo ""
echo "Updating doc-to-topic mapping..."

topic_map_file="{sharedKnowledgePath}/metadata/doc-to-topic-map.json"

# Build JSON
echo "{" > "$topic_map_file"

first=true
for doc_path in "${!doc_to_topics[@]}"; do
  topics_str="${doc_to_topics[$doc_path]}"
  
  # Convert pipe-separated list to JSON array
  topics_json=$(echo "$topics_str" | awk 'BEGIN{RS="|"} {printf "\"%s\", ", $0}' | sed 's/, $//')
  
  if [ "$first" = true ]; then
    first=false
  else
    echo "," >> "$topic_map_file"
  fi
  
  echo "  \"$doc_path\": [$topics_json]" >> "$topic_map_file"
done

echo "" >> "$topic_map_file"
echo "}" >> "$topic_map_file"

echo "✓ Topic mapping saved"
```

### 8. Generate Memory Index

Create index of all memories:

```bash
echo ""
echo "Generating memory index..."

memory_index="{sharedKnowledgePath}/indexes/memory-index.md"

# Count memories by category
req_count=$(find "{sharedKnowledgePath}/memories/requirements" -name "*.md" 2>/dev/null | wc -l)
arch_count=$(find "{sharedKnowledgePath}/memories/architecture" -name "*.md" 2>/dev/null | wc -l)
int_count=$(find "{sharedKnowledgePath}/memories/integrations" -name "*.md" 2>/dev/null | wc -l)
ops_count=$(find "{sharedKnowledgePath}/memories/operations" -name "*.md" 2>/dev/null | wc -l)

cat > "$memory_index" << 'INDEXEOF'
# Shared Knowledge Memory Index

Last Updated: $(date -I)
Total Memories: $memories_created

## By Category

### Requirements ($req_count memories)
INDEXEOF

find "{sharedKnowledgePath}/memories/requirements" -name "*.md" -exec basename {} .md \; | sort | awk '{print "- " $0}' >> "$memory_index"

cat >> "$memory_index" << 'ARCHEOF'

### Architecture ($arch_count memories)
ARCHEOF

find "{sharedKnowledgePath}/memories/architecture" -name "*.md" -exec basename {} .md \; | sort | awk '{print "- " $0}' >> "$memory_index"

cat >> "$memory_index" << 'INTEOF'

### Integrations ($int_count memories)
INTEOF

find "{sharedKnowledgePath}/memories/integrations" -name "*.md" -exec basename {} .md \; | sort | awk '{print "- " $0}' >> "$memory_index"

cat >> "$memory_index" << 'OPSEOF'

### Operations ($ops_count memories)
OPSEOF

find "{sharedKnowledgePath}/memories/operations" -name "*.md" -exec basename {} .md \; | sort | awk '{print "- " $0}' >> "$memory_index"

echo ""
echo "✓ Memory index generated"
```

### 9. Display Synthesis Summary

Show completion status:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Memory Synthesis Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Source Documents: {doc_count}
Topics Identified: {topic_count}
Memories Created: {memories_created}

By Category:
  📋 Requirements: {req_count}
  🏗️  Architecture: {arch_count}
  🔗 Integrations: {int_count}
  ⚙️  Operations: {ops_count}

Conflicts Resolved: {conflicts_detected}

Extracting agent knowledge...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 10. Auto-Proceed to Agent Extraction

Load and execute next step:

```
Loading step-03a-agent-extraction.md...
```

**Read complete file {nextStepFile}, then execute it.**
