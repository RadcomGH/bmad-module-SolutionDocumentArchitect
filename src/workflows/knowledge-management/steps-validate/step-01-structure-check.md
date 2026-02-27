---
name: 'step-01-structure-check'
description: 'Verify knowledge base directory structure and organization'
nextStepFile: './step-02-content-check.md'
sharedKnowledgePath: '{shared_knowledge_path}'
agentsMemoryPath: '{agents_memory_path}'
---

# Validate Step 1: Structure Check

## STEP GOAL

Verify that all required directories and subdirectories exist with proper organization.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: When loading next step, ensure entire file is read
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ✅ Auto-proceed after structure verification complete
- 🚫 DO NOT modify structure (validation only)
- ⚠️ Report issues but continue validation

### Role Reinforcement
- You are a **Structure Validation Specialist**
- Your role is to verify directory organization
- Check all required directories exist
- Identify missing or unexpected directories
- Report findings without modification
- Auto-proceed to content validation

### Step-Specific Rules
- Verify shared-knowledge structure (memories, indexes, metadata, reports)
- Verify all 4 category subdirectories
- Verify all 8 agent directories with knowledge/ and context/
- Report any missing or unexpected directories
- DO NOT create or modify directories

## EXECUTION PROTOCOLS
- 🔍 Verify directory existence
- 📊 Report structure status
- ⚠️ Identify issues
- ➡️ Auto-proceed to content check

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {agentsMemoryPath}
- **Focus:** Directory structure validation
- **Limits:** DO NOT check content or consistency (next steps)
- **Dependencies:** None (first validation step)

## MANDATORY SEQUENCE

### 1. Progress Message

Display:

```
🔍 Knowledge Base Validation - Step 1/4

Verifying directory structure...
Checking shared knowledge and agent directories...
```

### 2. Verify Shared Knowledge Root

Check root structure:

```bash
echo ""
echo "Checking shared knowledge root..."

root_ok=true

if [ -d "{sharedKnowledgePath}" ]; then
  echo "  ✅ Shared knowledge root exists"
else
  echo "  ❌ Shared knowledge root MISSING"
  root_ok=false
fi
```

### 3. Verify Memory Categories

Check all category directories:

```bash
echo ""
echo "Checking memory category directories..."

categories=("requirements" "architecture" "integrations" "operations")
categories_ok=true
missing_categories=()

for category in "${categories[@]}"; do
  category_dir="{sharedKnowledgePath}/memories/$category"
  
  if [ -d "$category_dir" ]; then
    file_count=$(find "$category_dir" -name "*.md" 2>/dev/null | wc -l)
    echo "  ✅ $category ($file_count memories)"
  else
    echo "  ❌ $category directory MISSING"
    categories_ok=false
    missing_categories+=("$category")
  fi
done

if [ "$categories_ok" = true ]; then
  echo "✓ All 4 category directories exist"
else
  echo "⚠️  ${#missing_categories[@]} category directories missing:"
  for cat in "${missing_categories[@]}"; do
    echo "    - $cat"
  done
fi
```

### 4. Verify Supporting Directories

Check indexes, metadata, reports, backups:

```bash
echo ""
echo "Checking supporting directories..."

support_dirs=("indexes" "metadata" "reports" "backups")
support_ok=true
missing_support=()

for dir in "${support_dirs[@]}"; do
  full_path="{sharedKnowledgePath}/$dir"
  
  if [ -d "$full_path" ]; then
    file_count=$(find "$full_path" -type f 2>/dev/null | wc -l)
    echo "  ✅ $dir ($file_count files)"
  else
    echo "  ⚠️  $dir directory missing"
    support_ok=false
    missing_support+=("$dir")
  fi
done

if [ "$support_ok" = true ]; then
  echo "✓ All supporting directories exist"
else
  echo "⚠️  ${#missing_support[@]} supporting directories missing (may be empty/new install)"
fi
```

### 5. Verify Agent Directories

Check all 8 agent directories:

```bash
echo ""
echo "Checking agent directories..."

agents=("chief-editor" "value-analyst" "value-narrator" "solution-consultant" "technical-wizard" "product-manager" "technical-scribe" "solution-designer")

agents_ok=true
missing_agents=()
missing_knowledge=()
agent_context_status=()

for agent in "${agents[@]}"; do
  agent_dir="{agentsMemoryPath}/$agent"
  knowledge_dir="$agent_dir/knowledge"
  context_dir="$agent_dir/context"
  
  # Check agent directory
  if [ ! -d "$agent_dir" ]; then
    echo "  ❌ $agent: directory MISSING"
    agents_ok=false
    missing_agents+=("$agent")
    continue
  fi
  
  # Check knowledge directory
  if [ -d "$knowledge_dir" ]; then
    extract_count=$(find "$knowledge_dir" -name "*.md" 2>/dev/null | wc -l)
    echo "  ✅ $agent: knowledge/ exists ($extract_count extracts)"
  else
    echo "  ❌ $agent: knowledge/ MISSING"
    agents_ok=false
    missing_knowledge+=("$agent")
  fi
  
  # Check context directory (agent-managed, may not exist)
  if [ -d "$context_dir" ]; then
    context_files=$(find "$context_dir" -type f 2>/dev/null | wc -l)
    echo "    ℹ️  $agent: context/ exists ($context_files files, agent-managed)"
  else
    echo "    ℹ️  $agent: context/ not yet created (agent-managed, OK)"
  fi
done

if [ "$agents_ok" = true ]; then
  echo "✓ All 8 agent directories configured correctly"
else
  echo "⚠️  Agent directory issues found:"
  [ ${#missing_agents[@]} -gt 0 ] && echo "    Missing agent dirs: ${missing_agents[*]}"
  [ ${#missing_knowledge[@]} -gt 0 ] && echo "    Missing knowledge/ dirs: ${missing_knowledge[*]}"
fi
```

### 6. Check for Unexpected Directories

Identify any unexpected directories:

```bash
echo ""
echo "Checking for unexpected directories..."

# Check shared-knowledge for unexpected subdirs
unexpected_shared=()
if [ -d "{sharedKnowledgePath}" ]; then
  for dir in {sharedKnowledgePath}/*/; do
    dirname=$(basename "$dir")
    
    # Skip expected directories
    if [[ "$dirname" != "memories" ]] && [[ "$dirname" != "indexes" ]] && \
       [[ "$dirname" != "metadata" ]] && [[ "$dirname" != "reports" ]] && \
       [[ "$dirname" != "backups" ]]; then
      unexpected_shared+=("$dirname")
    fi
  done
fi

if [ ${#unexpected_shared[@]} -gt 0 ]; then
  echo "  ⚠️  Unexpected directories in shared-knowledge:"
  for dir in "${unexpected_shared[@]}"; do
    echo "    - $dir"
  done
else
  echo "  ✓ No unexpected directories in shared-knowledge"
fi

# Check for unexpected agents
unexpected_agents=()
if [ -d "{agentsMemoryPath}" ]; then
  for dir in {agentsMemoryPath}/*/; do
    agent_name=$(basename "$dir")
    
    # Check if agent is in expected list
    if [[ ! " ${agents[@]} " =~ " ${agent_name} " ]]; then
      unexpected_agents+=("$agent_name")
    fi
  done
fi

if [ ${#unexpected_agents[@]} -gt 0 ]; then
  echo "  ⚠️  Unexpected agent directories:"
  for dir in "${unexpected_agents[@]}"; do
    echo "    - $dir"
  done
else
  echo "  ✓ No unexpected agent directories"
fi
```

### 7. Structure Validation Summary

Display validation results:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Structure Validation Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Core Structure:
  {root_status} Shared knowledge root
  {categories_status} Category directories (4/4)
  {support_status} Supporting directories
  {agents_status} Agent directories (8/8)

Issues Found:
  {missing_categories_count} Missing category directories
  {missing_support_count} Missing support directories
  {missing_agents_count} Missing/misconfigured agents
  {unexpected_count} Unexpected directories

Overall: {overall_status}

{issues_summary}

Proceeding to content validation...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 8. Auto-Proceed to Content Check

Load and execute next step:

```
Loading step-02-content-check.md...
```

**Read complete file {nextStepFile}, then execute it.**
