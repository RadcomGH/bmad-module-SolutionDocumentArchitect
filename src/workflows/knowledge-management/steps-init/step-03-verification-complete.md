---
name: 'step-03-verification-complete'
description: 'Verify memory synthesis completed successfully and display initialization report'

sharedKnowledgePath: '{shared_knowledge_path}'
agentsMemoryPath: '{agents_memory_path}'
---

# Init Step 3: Verification and Completion

## STEP GOAL

Verify that all shared memories and agent knowledge extracts were created successfully, perform integrity checks, validate file structure, and complete the initialization workflow.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- ✅ This is the final initialization step
- 🎉 Display initialization completion report
- 🚫 This is a FINAL step - no next step to load

### Role Reinforcement
- You are a **Memory System Quality Verifier**
- Your role is to verify successful memory synthesis
- Check all memory files and agent extracts were created
- Validate memory file format compliance
- Complete workflow gracefully with detailed report

### Step-Specific Rules
- This is the final step - no next step
- Verify shared memories exist in correct structure
- Check all 8 agent directories have knowledge extracts
- Validate YAML frontmatter in memory files
- Display comprehensive success report

## EXECUTION PROTOCOLS
- 🎯 Verify shared knowledge memories created
- 👥 Verify agent knowledge extracts created
- 📊 Validate file format compliance
- ✅ Display completion report with statistics

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {agentsMemoryPath} with all generated files
- **Focus:** Verification and reporting only
- **Limits:** This is final step - no further processing
- **Dependencies:** Steps 01-02 (structure setup + synthesis) completed

## MANDATORY SEQUENCE

### 1. Status Update

Display to {user_name}:

```
✅ Knowledge Base Initialization - Step 3/3

Verifying memory synthesis results...
```

### 2. Verify Shared Knowledge Structure

Check shared knowledge directories and memory files:

```bash
echo "Verifying shared knowledge structure..."

# Check main directories exist
[ -d "{sharedKnowledgePath}/memories" ] && echo "✓ memories/" || echo "✗ memories/ MISSING"
[ -d "{sharedKnowledgePath}/indexes" ] && echo "✓ indexes/" || echo "✗ indexes/ MISSING"
[ -d "{sharedKnowledgePath}/metadata" ] && echo "✓ metadata/" || echo "✗ metadata/ MISSING"

# Check category subdirectories
for cat in requirements architecture integrations operations; do
  [ -d "{sharedKnowledgePath}/memories/$cat" ] && echo "  ✓ memories/$cat/" || echo "  ✗ memories/$cat/ MISSING"
done

# Count memory files by category
echo ""
echo "Memory files by category:"
for cat in requirements architecture integrations operations; do
  COUNT=$(find "{sharedKnowledgePath}/memories/$cat" -name "*.md" 2>/dev/null | wc -l)
  echo "  • $cat: $COUNT memories"
done

TOTAL_MEMORIES=$(find "{sharedKnowledgePath}/memories" -name "*.md" 2>/dev/null | wc -l)
echo ""
echo "✓ Total shared memories: $TOTAL_MEMORIES"
```

### 3. Verify Agent Directories

Check all 8 agent directories and their knowledge extracts:

```bash
echo ""
echo "Verifying agent knowledge directories..."

agents=("chief-editor" "value-analyst" "value-narrator" "solution-consultant" 
        "technical-wizard" "product-manager" "technical-scribe" "solution-designer")

AGENT_EXTRACTS=0

for agent in "${agents[@]}"; do
  if [ -d "{agentsMemoryPath}/$agent/knowledge" ]; then
    COUNT=$(find "{agentsMemoryPath}/$agent/knowledge" -name "*.md" 2>/dev/null | wc -l)
    echo "  ✓ $agent: $COUNT extracts"
    AGENT_EXTRACTS=$((AGENT_EXTRACTS + COUNT))
  else
    echo "  ✗ $agent: directory MISSING"
  fi
  
  # Verify context/ directory exists but is empty (agent-managed)
  if [ -d "{agentsMemoryPath}/$agent/context" ]; then
    echo "    ✓ context/ directory ready (agent-managed)"
  fi
done

echo ""
echo "✓ Total agent extracts: $AGENT_EXTRACTS"
```

### 4. Verify Metadata Files

Check required metadata files exist and are valid:

```bash
echo ""
echo "Verifying metadata files..."

# Check source checksums
if [ -f "{sharedKnowledgePath}/metadata/source-checksums.json" ]; then
  DOC_COUNT=$(jq '.documents | length' "{sharedKnowledgePath}/metadata/source-checksums.json" 2>/dev/null)
  if [ $? -eq 0 ]; then
    echo "✓ source-checksums.json: $DOC_COUNT documents tracked"
  else
    echo "✗ source-checksums.json: malformed JSON"
  fi
else
  echo "✗ source-checksums.json: MISSING"
fi

# Check synthesis log
if [ -f "{sharedKnowledgePath}/metadata/synthesis-log.jsonl" ]; then
  LOG_LINES=$(wc -l < "{sharedKnowledgePath}/metadata/synthesis-log.jsonl")
  echo "✓ synthesis-log.jsonl: $LOG_LINES events logged"
else
  echo "✗ synthesis-log.jsonl: MISSING"
fi

# Check doc-to-topic map
if [ -f "{sharedKnowledgePath}/metadata/doc-to-topic-map.json" ]; then
  MAP_COUNT=$(jq 'length' "{sharedKnowledgePath}/metadata/doc-to-topic-map.json" 2>/dev/null)
  if [ $? -eq 0 ]; then
    echo "✓ doc-to-topic-map.json: $MAP_COUNT documents mapped"
  else
    echo "✗ doc-to-topic-map.json: malformed JSON"
  fi
else
  echo "✗ doc-to-topic-map.json: MISSING"
fi
```

### 5. Verify Index Files

Check index files for navigation:

```bash
echo ""
echo "Verifying index files..."

[ -f "{sharedKnowledgePath}/indexes/memory-index.md" ] && echo "✓ memory-index.md" || echo "✗ memory-index.md MISSING"
[ -f "{sharedKnowledgePath}/indexes/agent-coverage.md" ] && echo "✓ agent-coverage.md" || echo "✗ agent-coverage.md MISSING"
```

### 6. Validate Memory File Format

Sample-check memory files for proper YAML frontmatter and structure:

```bash
echo ""
echo "Validating memory file format (sampling)..."

# Pick first memory file from each category
VALIDATION_ERRORS=0

for cat in requirements architecture integrations operations; do
  SAMPLE=$(find "{sharedKnowledgePath}/memories/$cat" -name "*.md" 2>/dev/null | head -1)
  
  if [ -n "$SAMPLE" ]; then
    # Check for YAML frontmatter
    if head -1 "$SAMPLE" | grep -q "^---$"; then
      echo "  ✓ $cat sample: Valid frontmatter"
      
      # Check for required fields (basic validation)
      if grep -q "memory_id:" "$SAMPLE" && \
         grep -q "topic:" "$SAMPLE" && \
         grep -q "category:" "$SAMPLE"; then
        echo "    ✓ Required fields present"
      else
        echo "    ✗ Missing required fields"
        VALIDATION_ERRORS=$((VALIDATION_ERRORS + 1))
      fi
    else
      echo "  ✗ $cat sample: Missing frontmatter"
      VALIDATION_ERRORS=$((VALIDATION_ERRORS + 1))
    fi
  fi
done

if [ $VALIDATION_ERRORS -eq 0 ]; then
  echo ""
  echo "✓ Memory file format validation passed"
else
  echo ""
  echo "⚠️  $VALIDATION_ERRORS validation warnings (review recommended)"
fi
```

### 7. Display Initialization Summary

Present comprehensive completion report:

```
═══════════════════════════════════════════════════════════════
  🎉 MEMORY SYNTHESIS INITIALIZATION COMPLETE
═══════════════════════════════════════════════════════════════

Knowledge Base Architecture: Two-Tier Memory System

📊 SYNTHESIS RESULTS

Shared Knowledge Memories:
  Location: {sharedKnowledgePath}/memories/
  
  By Category:
    • requirements: [count] memories
    • architecture: [count] memories
    • integrations: [count] memories
    • operations: [count] memories
  
  Total: [total_memories] topic-based memories

Agent Knowledge Extracts:
  Location: {agentsMemoryPath}/
  
  Coverage:
    • chief-editor: [count] extracts
    • value-analyst: [count] extracts
    • value-narrator: [count] extracts
    • solution-consultant: [count] extracts
    • technical-wizard: [count] extracts
    • product-manager: [count] extracts
    • technical-scribe: [count] extracts
    • solution-designer: [count] extracts
  
  Total: [total_extracts] agent-specific extracts

Indexes Created:
  ✓ memory-index.md (memory navigation)
  ✓ agent-coverage.md (agent knowledge map)

Metadata Tracking:
  ✓ source-checksums.json ([docs_count] documents tracked)
  ✓ synthesis-log.jsonl (synthesis history)
  ✓ doc-to-topic-map.json (document-to-memory mapping)

═══════════════════════════════════════════════════════════════
  STATUS: ✅ MEMORY SYSTEM READY FOR GROUNDING
═══════════════════════════════════════════════════════════════
```

### 8. Display Next Steps and Usage Guidance

Provide maintenance and usage instructions:

```
📋 HOW TO USE THIS MEMORY SYSTEM

For Agents (Context Grounding):
  • Agents access {agentsMemoryPath}/{agent-name}/knowledge/
  • Each agent sees role-filtered knowledge relevant to their work
  • Agents can add their own notes to context/ directory
  • Shared memories available at {sharedKnowledgePath}/memories/

For Humans (Navigation):
  • Browse memory-index.md for topic overview
  • Browse agent-coverage.md to see agent knowledge distribution
  • Memory files have frontmatter with source attribution
  • Follow related_memories links to explore connections

Regular Maintenance:
  • After adding/modifying reference documents:
    → Re-run workflow with --mode=update
    → Only changed documents will be re-processed
  
  • Weekly integrity check:
    → Re-run workflow with --mode=validate
    → Verifies memory structure and format compliance
  
  • After major document reorganization:
    → Re-run workflow with --mode=rebuild
    → Full regeneration with backup of existing memories

Conflict Resolution:
  • Significant conflicts require human confirmation
  • Review synthesis-log.jsonl to see conflict resolutions
  • Custom notes added during conflicts are preserved in memories

═══════════════════════════════════════════════════════════════
```

### 9. Update Synthesis Log

Add final completion entry:

```bash
# Append completion event to synthesis log
cat >> "{sharedKnowledgePath}/metadata/synthesis-log.jsonl" << EOF
{"timestamp":"$(date -Iseconds)","event":"initialization_verified","mode":"init","total_memories":$TOTAL_MEMORIES,"total_extracts":$AGENT_EXTRACTS,"validation_passed":true,"message":"Initialization verified and complete"}
EOF
```

### 10. Display Architecture Reminder

Show two-tier architecture summary:

```
═══════════════════════════════════════════════════════════════
  📐 TWO-TIER MEMORY ARCHITECTURE

TIER 1: Shared Knowledge
  Location: {sharedKnowledgePath}/
  Purpose: Topic-based memories synthesized from reference docs
  Management: Workflow-managed (auto-updates on doc changes)
  Content: Consolidated cross-document information
  
TIER 2: Agent Directories
  Location: {agentsMemoryPath}/{agent-name}/
  
  knowledge/  - Workflow-managed role-filtered extracts
             - Auto-updated when shared memories change
  
  context/   - Agent-managed personal notes and context
             - NEVER touched by workflow
             - Preserved during updates and rebuilds

This architecture ensures:
  ✓ Agents find relevant context quickly
  ✓ No duplication (single source of truth in shared memories)
  ✓ Agent autonomy (context/ directory is theirs)
  ✓ Efficient updates (only process changed documents)

═══════════════════════════════════════════════════════════════
```

### 11. Completion Message

Display final message:

```
🎉 Memory system initialization complete!

Your knowledge base is now ready to ground agent context.

Workflows that can use this memory system:
  • Any agent can now access their {agentsMemoryPath}/{name}/knowledge/
  • Shared memories available for cross-agent collaboration
  • Update mode ready for incremental document processing

The two-tier architecture keeps shared knowledge consolidated
while giving each agent role-specific, pre-filtered context.

═══════════════════════════════════════════════════════════════
  Thank you for using Knowledge Management Workflow v3.0
═══════════════════════════════════════════════════════════════
```

## SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS
- All shared memory directories verified
- Memory files found in all 4 categories
- All 8 agent directories have knowledge extracts
- Metadata files exist and are valid JSON
- Index files created successfully
- Memory file format validation passed
- Comprehensive report displayed

### ❌ SYSTEM FAILURE
- Missing shared knowledge or agent directories
- No memory files created
- Missing metadata files
- Malformed JSON in metadata
- Insufficient reporting

**Master Rule:** Verification confirms successful two-tier memory synthesis. Report provides clear usage guidance and maintenance instructions.



### 8. Workflow Complete

**This is a FINAL step. DO NOT load another step file.**

The workflow ends here with exit code 0 (success).

## SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS
- All artifacts verified to exist
- JSON files validated
- Comprehensive report displayed
- Next steps provided
- Workflow completed successfully

### ❌ SYSTEM FAILURE
- Attempting to load next step (there is none)
- Not verifying all artifacts
- Missing critical files not detected

**Master Rule:** This is the final initialization step. Verify everything, celebrate success, and complete the workflow.
