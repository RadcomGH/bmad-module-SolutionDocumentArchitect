---
name: 'step-03a-agent-extraction'
description: 'Regenerate agent knowledge extracts for affected documents'
nextStepFile: './step-04-finalize-complete.md'
agentsMemoryPath: '{agents_memory_path}'
sharedKnowledgePath: '{shared_knowledge_path}'
workflowPath: '{workflow_path}'
---

# Update Step 3a: Agent Knowledge Extraction

## STEP GOAL

**CRITICAL - Phase 2 of Two-Tier Knowledge Architecture (MANDATORY)**

Step 03 created shared cross-agent memories. This step creates agent-specific knowledge extracts.

**Both phases must complete for proper knowledge management:**
- ✅ Phase 1 (Step 03): Shared topic memories - COMPLETED
- ⚙️  Phase 2 (Step 03a): Agent role-filtered extracts - IN PROGRESS

For documents processed in Step 03, generate role-filtered knowledge extracts for each of the 8 agents based on their focus areas and responsibilities.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: When loading next step, ensure entire file is read
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ✅ Auto-proceed after all agent extracts updated
- 🚫 DO NOT halt for user input
- ⚠️ DO NOT touch agent context/ directories (agent-managed)

### Role Reinforcement
- You are an **Agent Knowledge Update Specialist**
- Your role is to update agent-specific knowledge extracts
- Filter content by agent roles and keywords
- Update ONLY affected extracts (incremental)
- Preserve agent context/ directories untouched
- Auto-proceed after extraction complete

### Step-Specific Rules
- Load changed/new document lists from previous step
- For each of 8 agents, regenerate extracts for affected documents
- Apply relevance filters from grounding-rules.yaml
- Do NOT modify agent context/ directories
- Update agent-coverage.md index

## EXECUTION PROTOCOLS
- 🎯 Load agent role configurations
- 📄 Process changed/new documents for each agent
- 🔍 Apply relevance filters and keyword matching
- ➡️ Auto-proceed to finalization after updates

## CONTEXT BOUNDARIES
- **Available:** {agentsMemoryPath}, {sharedKnowledgePath}, {workflowPath}
- **Focus:** Agent knowledge/ directory updates only
- **Limits:** DO NOT modify context/ directories or finalize checksums (next step)
- **Dependencies:** Change lists from step-02, updated memories from step-03

## MANDATORY SEQUENCE

### 1. Progress Message

Display:

```
🔄 Knowledge Base Update - Step 3a/4

Two-Tier Knowledge Architecture:
✅ Shared Memories (Step 3): COMPLETE
⚙️  Agent Knowledge (Step 3a): PROCESSING

Generating role-filtered extracts for 8 agents...
```

### 2. Load Agent Configurations

Load agent roles and relevance filters:

```bash
echo "Loading agent configurations..."

grounding_file="{workflowPath}/data/grounding-rules.yaml"

# Parse agent roles and keywords (simplified - in production use yq or similar)
agents=("chief-editor" "value-analyst" "value-narrator" "solution-consultant" "technical-wizard" "product-manager" "technical-scribe" "solution-designer")

echo "✓ Loaded configurations for ${#agents[@]} agents"
```

### 3. Load Change Lists

Import affected documents:

```bash
echo "Loading affected documents..."

# Read changed and new documents
if [ -f "/tmp/km_changed_docs.txt" ]; then
  readarray -t changed_docs < /tmp/km_changed_docs.txt
else
  changed_docs=()
fi

if [ -f "/tmp/km_new_docs.txt" ]; then
  readarray -t new_docs < /tmp/km_new_docs.txt
else
  new_docs=()
fi

# Combine into affected_docs array
affected_docs=("${changed_docs[@]}" "${new_docs[@]}")
affected_count=${#affected_docs[@]}

echo "✓ $affected_count documents need extract regeneration"
```

### 4. Process Each Agent

For each agent, regenerate extracts for affected documents:

```bash
echo ""
echo "Processing agents..."

for agent in "${agents[@]}"; do
  echo ""
  echo "  Agent: $agent"
  
  agent_knowledge_dir="{agentsMemoryPath}/$agent/knowledge"
  
  # Verify knowledge directory exists
  if [ ! -d "$agent_knowledge_dir" ]; then
    echo "    ⚠️  Knowledge directory missing, creating..."
    mkdir -p "$agent_knowledge_dir"
  fi
  
  # Get agent's relevance filters from grounding-rules.yaml
  # (Simplified - in production parse YAML properly)
  case "$agent" in
    "chief-editor")
      keywords="quality standards review approval format synthesis"
      categories="all"
      ;;
    "value-analyst")
      keywords="value benefit ROI business cost savings"
      categories="requirements operations"
      ;;
    "value-narrator")
      keywords="story narrative communication presentation stakeholder"
      categories="requirements operations"
      ;;
    "solution-consultant")
      keywords="architecture design technical implementation integration"
      categories="architecture integrations"
      ;;
    "technical-wizard")
      keywords="technical implementation code system platform configuration"
      categories="architecture integrations operations"
      ;;
    "product-manager")
      keywords="requirements roadmap features priority scope timeline"
      categories="requirements operations"
      ;;
    "technical-scribe")
      keywords="documentation content writing structure clarity"
      categories="all"
      ;;
    "solution-designer")
      keywords="solution architecture design patterns framework structure"
      categories="architecture integrations"
      ;;
  esac
  
  extracts_updated=0
  
  # Process each affected document
  for doc_path in "${affected_docs[@]}"; do
    # Determine document category
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
    
    # Check if this category is relevant to agent
    if [ "$categories" != "all" ] && ! echo "$categories" | grep -q "$category"; then
      continue  # Skip if category not relevant
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
    
    # Create/update extract
    echo "    ↻ Updating extract: $doc_basename"
    
    # Extract relevant sections (simplified - in production use better extraction)
    relevant_content=$(echo "$doc_content" | head -100)  # First 100 lines as example
    
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
Last Updated: $(date -I)
EXTRACTEOF
    
    ((extracts_updated++))
  done
  
  echo "    ✓ Updated $extracts_updated extracts for $agent"
done

echo ""
echo "✓ All agent extracts updated"
```

### 5. Update Agent Coverage Index

Regenerate agent-coverage.md showing extract distribution:

```bash
echo ""
echo "Updating agent coverage index..."

cat > "{sharedKnowledgePath}/indexes/agent-coverage.md" << 'COVERAGEOF'
# Agent Knowledge Coverage

Last Updated: $(date -I)

## Coverage by Agent

COVERAGEOF

for agent in "${agents[@]}"; do
  extract_count=$(find "{agentsMemoryPath}/$agent/knowledge" -name "*.md" | wc -l)
  
  cat >> "{sharedKnowledgePath}/indexes/agent-coverage.md" << AGENTEOF

### $agent ($extract_count extracts)

Coverage: ${extract_count} knowledge extracts

AGENTEOF
done

echo "✓ Agent coverage index updated"
```

### 6. Summary

Display extraction summary:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Agent Knowledge Extraction Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Agents Updated: 8
Documents Processed: {affected_count}
Extracts Regenerated: {total_extracts}

Per-Agent Breakdown:
  chief-editor: {count} extracts
  value-analyst: {count} extracts
  value-narrator: {count} extracts
  solution-consultant: {count} extracts
  technical-wizard: {count} extracts
  product-manager: {count} extracts
  technical-scribe: {count} extracts
  solution-designer: {count} extracts

Note: Agent context/ directories preserved (agent-managed)

Finalizing update...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 7. Auto-Proceed to Finalization

Load and execute next step:

```
Loading step-04-finalize-complete.md...
```

**Read complete file {nextStepFile}, then execute it.**
