---
name: 'step-01-confirm-backup'
description: 'Confirm rebuild intention and backup existing memories'
nextStepFile: './step-02-clean-sidecar.md'
sharedKnowledgePath: '{shared_knowledge_path}'
agentsMemoryPath: '{agents_memory_path}'
workflowPath: '{workflow_path}'
---

# Rebuild Step 1: Confirm and Backup

## STEP GOAL

Display rebuild warning, require explicit user confirmation, and backup existing memories before full regeneration.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: When loading next step, ensure entire file is read
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ⚠️ HALT for user confirmation (rebuild is destructive)
- ✅ Auto-proceed ONLY after backup complete and user confirms
- 🚫 DO NOT proceed without explicit "REBUILD" confirmation

### Role Reinforcement
- You are a **Rebuild Confirmation and Backup Specialist**
- Your role is to prevent accidental data loss
- Require explicit user confirmation before proceeding
- Create comprehensive backups before any deletion
- Preserve agent context/ directories (never backed up or touched)
- Auto-proceed to cleaning ONLY after successful backup

### Step-Specific Rules
- Display warning about full regeneration
- Require user to type "REBUILD" (case-sensitive)
- Backup shared-knowledge/memories/ to backup/memories-{timestamp}/
- Backup agents/{agent-name}/knowledge/ to backup/agents-knowledge-{timestamp}/
- DO NOT backup or touch agent context/ directories (agent-managed)
- Verify backup integrity before proceeding

## EXECUTION PROTOCOLS
- ⚠️ Display rebuild warning
- 🔐 Require explicit confirmation
- 💾 Backup existing memories
- ➡️ Auto-proceed ONLY after backup verified

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {agentsMemoryPath}, {workflowPath}
- **Focus:** User confirmation and data backup
- **Limits:** DO NOT clean or regenerate (next steps)
- **Dependencies:** None (first step)

## MANDATORY SEQUENCE

### 1. Display Rebuild Warning

Show prominent warning message:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  WARNING: FULL REBUILD REQUESTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rebuild mode will:

  🗑️  DELETE all existing memories
  🗑️  DELETE all agent knowledge extracts
  🔄 REGENERATE everything from source documents
  ⏱️  Take 5-10 minutes to complete

What will be preserved:
  ✅ Source documents (read-only)
  ✅ Agent context directories (agent-managed)
  ✅ Backup copies (created before deletion)

What will be regenerated:
  🔄 All shared memories (requirements/architecture/integrations/operations)
  🔄 All agent knowledge extracts (8 agents)
  🔄 All metadata (checksums, mappings, indexes)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This operation is useful when:
- Memory structure changed
- Source documents restructured significantly
- Data corruption detected
- Fresh synthesis needed

IMPORTANT: A backup will be created before any deletion.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2. Require Explicit Confirmation

Halt for user input:

```bash
echo ""
echo "To proceed with full rebuild, type: REBUILD"
echo ""
read -p "Confirmation: " confirmation

if [ "$confirmation" != "REBUILD" ]; then
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "❌ Rebuild Cancelled"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "Confirmation not received. No changes made."
  echo ""
  echo "To rebuild, run: --mode=rebuild"
  echo "To update incrementally, run: --mode=update"
  echo ""
  exit 0
fi

echo ""
echo "✅ Rebuild confirmed. Proceeding with backup..."
echo ""
```

### 3. Create Backup Directory

Prepare timestamped backup location:

```bash
timestamp=$(date +%Y%m%d-%H%M%S)
backup_root="{sharedKnowledgePath}/backups/rebuild-$timestamp"

echo "Creating backup location..."
echo "  📁 $backup_root"
echo ""

mkdir -p "$backup_root/memories"
mkdir -p "$backup_root/agents-knowledge"
mkdir -p "$backup_root/metadata"

echo "✓ Backup directories created"
```

### 4. Backup Shared Memories

Copy all shared knowledge memories:

```bash
echo ""
echo "Backing up shared memories..."

memories_source="{sharedKnowledgePath}/memories"
memories_backup="$backup_root/memories"

if [ -d "$memories_source" ]; then
  # Count files to backup
  mem_count=$(find "$memories_source" -name "*.md" | wc -l)
  echo "  📚 Found $mem_count memory files to backup"
  
  # Copy all memories preserving structure
  cp -r "$memories_source"/* "$memories_backup"/ 2>/dev/null || true
  
  # Verify backup
  backed_up_count=$(find "$memories_backup" -name "*.md" | wc -l)
  
  if [ "$backed_up_count" -eq "$mem_count" ]; then
    echo "  ✅ Backed up $backed_up_count memories"
  else
    echo "  ⚠️  Warning: Backup count mismatch ($backed_up_count vs $mem_count)"
  fi
else
  echo "  ℹ️  No shared memories found (fresh start)"
fi
```

### 5. Backup Agent Knowledge Extracts

Copy all agent knowledge directories:

```bash
echo ""
echo "Backing up agent knowledge extracts..."

agents=("chief-editor" "value-analyst" "value-narrator" "solution-consultant" "technical-wizard" "product-manager" "technical-scribe" "solution-designer")

total_extracts=0

for agent in "${agents[@]}"; do
  agent_knowledge_source="{agentsMemoryPath}/$agent/knowledge"
  agent_knowledge_backup="$backup_root/agents-knowledge/$agent"
  
  if [ -d "$agent_knowledge_source" ]; then
    extract_count=$(find "$agent_knowledge_source" -name "*.md" 2>/dev/null | wc -l)
    
    if [ "$extract_count" -gt 0 ]; then
      echo "  👤 $agent: $extract_count extracts"
      
      mkdir -p "$agent_knowledge_backup"
      cp -r "$agent_knowledge_source"/* "$agent_knowledge_backup"/ 2>/dev/null || true
      
      total_extracts=$((total_extracts + extract_count))
    fi
  fi
done

echo "  ✅ Backed up $total_extracts agent extracts"
echo ""
echo "  ℹ️  Note: Agent context/ directories NOT backed up (agent-managed)"
```

### 6. Backup Metadata Files

Copy metadata for reference:

```bash
echo ""
echo "Backing up metadata..."

metadata_source="{sharedKnowledgePath}/metadata"
metadata_backup="$backup_root/metadata"

if [ -d "$metadata_source" ]; then
  cp -r "$metadata_source"/* "$metadata_backup"/ 2>/dev/null || true
  
  file_count=$(find "$metadata_backup" -type f | wc -l)
  echo "  ✅ Backed up $file_count metadata files"
else
  echo "  ℹ️  No metadata found"
fi
```

### 7. Verify Backup Integrity

Confirm backup successful:

```bash
echo ""
echo "Verifying backup integrity..."

# Count backed up files
backed_up_memories=$(find "$backup_root/memories" -name "*.md" 2>/dev/null | wc -l)
backed_up_extracts=$(find "$backup_root/agents-knowledge" -name "*.md" 2>/dev/null | wc -l)
backed_up_metadata=$(find "$backup_root/metadata" -type f 2>/dev/null | wc -l)

total_backed_up=$((backed_up_memories + backed_up_extracts + backed_up_metadata))

if [ "$total_backed_up" -eq 0 ]; then
  echo "  ℹ️  No existing data found (fresh rebuild)"
  backup_status="clean_start"
else
  echo "  ✅ Backup verified:"
  echo "    - Memories: $backed_up_memories files"
  echo "    - Agent extracts: $backed_up_extracts files"
  echo "    - Metadata: $backed_up_metadata files"
  echo "    - Total: $total_backed_up files"
  backup_status="backup_complete"
fi

echo ""
echo "  📁 Backup location: $backup_root"
```

### 8. Display Backup Summary

Show completion status:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Backup Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Backed up {total_backed_up} files:
  📚 Shared memories: {backed_up_memories}
  👤 Agent extracts: {backed_up_extracts}
  📄 Metadata files: {backed_up_metadata}

Backup location:
  📁 {backup_root}

Safe to proceed with rebuild.
Proceeding to cleaning phase...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 9. Auto-Proceed to Cleaning

Load and execute next step:

```
Loading step-02-clean-sidecar.md...
```

**Read complete file {nextStepFile}, then execute it.**
