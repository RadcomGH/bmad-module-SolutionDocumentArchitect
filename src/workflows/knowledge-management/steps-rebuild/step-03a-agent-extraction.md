---
name: 'step-03a-agent-extraction'
description: 'Generate agent knowledge extracts for all documents'
nextStepFile: './step-04-verification.md'
agentsMemoryPath: '{agents_memory_path}'
sharedKnowledgePath: '{shared_knowledge_path}'
sourceDocsPath: '{source_docs_path}'
workflowPath: '{workflow_path}'
---

# Rebuild Step 3a: Agent Knowledge Extraction

## STEP GOAL

Generate agent-specific knowledge extracts from all source documents filtered by each agent's role and focus areas.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: When loading next step, ensure entire file is read
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ✅ Auto-proceed after all agent extracts generated
- 🚫 DO NOT halt for user input
- ⚠️ DO NOT touch agent context/ directories (agent-managed)

### Role Reinforcement
- You are an **Agent Knowledge Generation Specialist**
- Your role is to create agent-specific knowledge extracts
- Filter content by agent roles and keywords
- Generate extracts for ALL documents (fresh rebuild)
- Preserve agent context/ directories untouched
- Auto-proceed to verification after extraction complete

### Step-Specific Rules
- Process ALL source documents for each of 8 agents
- Apply relevance filters from grounding-rules.yaml
- Create agent knowledge/ directories if missing
- Do NOT modify agent context/ directories
- Update agent-coverage.md index

## EXECUTION PROTOCOLS
- 🎯 Load agent role configurations
- 📄 Process all documents for each agent
- 🔍 Apply relevance filters and keyword matching
- ➡️ Auto-proceed to verification

## CONTEXT BOUNDARIES
- **Available:** {agentsMemoryPath}, {sharedKnowledgePath}, {sourceDocsPath}, {workflowPath}
- **Focus:** Agent knowledge/ directory generation
- **Limits:** DO NOT verify or report (next steps)
- **Dependencies:** Synthesized memories from step-03

## MANDATORY SEQUENCE

### 1. Progress Message

Display:

```
🔄 Knowledge Base Rebuild - Step 3a/6

Generating agent knowledge extracts...
Agents: 8
Processing all source documents...
```

### 2. Scan All Source Documents

Get full document list:

```bash
echo ""
echo "Scanning source documents..."

mapfile -t all_docs < <(find "{sourceDocsPath}" -name "*.md" -not -path "*/99-*/*" | sort)
doc_count=${#all_docs[@]}

echo "✓ Found $doc_count documents"
```

### 3. Load Agent Configurations

Configure agent filtering:

```bash
echo ""
echo "Loading agent configurations..."

agents=("chief-editor" "value-analyst" "value-narrator" "solution-consultant" "technical-wizard" "product-manager" "technical-scribe" "solution-designer")

# Define agent focus (from grounding-rules.yaml)
declare -A agent_keywords
declare -A agent_categories

agent_keywords["chief-editor"]="quality standards review approval format synthesis"
agent_categories["chief-editor"]="all"

agent_keywords["value-analyst"]="value benefit ROI business cost savings"
agent_categories["value-analyst"]="requirements operations"

agent_keywords["value-narrator"]="story narrative communication presentation stakeholder"
agent_categories["value-narrator"]="requirements operations"

agent_keywords["solution-consultant"]="architecture design technical implementation integration"
agent_categories["solution-consultant"]="architecture integrations"

agent_keywords["technical-wizard"]="technical implementation code system platform configuration"
agent_categories["technical-wizard"]="architecture integrations operations"

agent_keywords["product-manager"]="requirements roadmap features priority scope timeline"
agent_categories["product-manager"]="requirements operations"

agent_keywords["technical-scribe"]="documentation content writing structure clarity"
agent_categories["technical-scribe"]="all"

agent_keywords["solution-designer"]="solution architecture design patterns framework structure"
agent_categories["solution-designer"]="architecture integrations"

echo "✓ Loaded configurations for ${#agents[@]} agents"
```

### 4. Process Each Agent

Generate extracts for each agent:

```bash
echo ""
echo "Processing agents..."

total_extracts_created=0

for agent in "${agents[@]}"; do
  echo ""
  echo "  Agent: $agent"
  echo "  Role: $(echo "${agent_keywords[$agent]}" | awk '{print $1, $2, $3}')"
  
  agent_knowledge_dir="{agentsMemoryPath}/$agent/knowledge"
  
  # Ensure knowledge directory exists
  mkdir -p "$agent_knowledge_dir"
  
  keywords="${agent_keywords[$agent]}"
  categories="${agent_categories[$agent]}"
  
  extracts_created=0
  
  # Process each document
  for doc_path in "${all_docs[@]}"; do
    # Determine document category
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
    
    # Check if category is relevant to agent
    if [ "$categories" != "all" ]; then
      if ! echo "$categories" | grep -qw "$category"; then
        continue  # Skip if category not relevant
      fi
    fi
    
    # Read document content
    full_doc_path="{sourceDocsPath}/$doc_path"
    if [ ! -f "$full_doc_path" ]; then
      continue
    fi
    
    doc_content=$(cat "$full_doc_path")
    
    # Check if document contains relevant keywords
    relevant=false
    for keyword in $keywords; do
      if echo "$doc_content" | grep -qi "$keyword"; then
        relevant=true
        break
      fi
    done
    
    if [ "$relevant" = false ]; then
      continue  # Skip if no relevant keywords found
    fi
    
    # Generate extract filename
    doc_basename=$(basename "$doc_path" .md)
    extract_slug=$(echo "$doc_basename" | tr '[:upper:]' '[:lower:]' | tr -s ' ' '_' | tr -cd '[:alnum:]_')
    extract_file="$agent_knowledge_dir/${extract_slug}.md"
    
    # Extract relevant content (first 100 lines as comprehensive sample)
    relevant_content=$(echo "$doc_content" | head -100)
    
    # Generate extract from template
    extract_id="ext_${agent}_${extract_slug}_$(date +%Y%m%d)"
    
    cat > "$extract_file" << EXTRACTEOF
---
extract_id: "${extract_id}"
agent_name: "${agent}"
agent_role: "$(echo ${agent} | tr '_' ' ' | sed 's/.*/\u&/')"
source_document: "${doc_path}"
category: "${category}"
created: "$(date -I)"
last_updated: "$(date -I)"
related_memories: []
---

# Agent Knowledge Extract: ${doc_basename}

**For:** ${agent}

## Relevant Content

${relevant_content}

## Why This Matters to You

Based on your role focus (${keywords}), this content is relevant for:
- ${category} domain knowledge
- Key information extraction
- Context grounding

## Related Shared Memories

(Link to related memories in shared-knowledge/)

## Source Information

Document: ${doc_path}
Category: ${category}
Last Generated: $(date -I)
EXTRACTEOF
    
    ((extracts_created++))
  done
  
  echo "    ✓ Generated $extracts_created extracts"
  total_extracts_created=$((total_extracts_created + extracts_created))
done

echo ""
echo "✓ All agent extracts generated: $total_extracts_created total"
```

### 5. Update Agent Coverage Index

Generate coverage report:

```bash
echo ""
echo "Updating agent coverage index..."

coverage_file="{sharedKnowledgePath}/indexes/agent-coverage.md"

cat > "$coverage_file" << 'COVERAGEOF'
# Agent Knowledge Coverage

Last Updated: $(date -I)
Total Extracts: $total_extracts_created

## Coverage by Agent

COVERAGEOF

for agent in "${agents[@]}"; do
  extract_count=$(find "{agentsMemoryPath}/$agent/knowledge" -name "*.md" 2>/dev/null | wc -l)
  
  echo "" >> "$coverage_file"
  echo "### $agent ($extract_count extracts)" >> "$coverage_file"
  echo "" >> "$coverage_file"
  echo "Coverage: ${extract_count} knowledge extracts" >> "$coverage_file"
done

echo "✓ Agent coverage index updated"
```

### 6. Summary

Display extraction summary:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Agent Knowledge Extraction Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Source Documents: {doc_count}
Agents Configured: 8
Total Extracts Generated: {total_extracts_created}

Note: Agent context/ directories preserved (agent-managed)

Verifying rebuild integrity...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 7. Auto-Proceed to Verification

Load and execute next step:

```
Loading step-04-verification.md...
```

**Read complete file {nextStepFile}, then execute it.**
