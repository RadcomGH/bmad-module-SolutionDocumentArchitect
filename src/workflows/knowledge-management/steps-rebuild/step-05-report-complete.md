---
name: 'step-05-report-complete'
description: 'Save checksums, log rebuild, and generate final report'
nextStepFile: null
sharedKnowledgePath: '{shared_knowledge_path}'
sourceDocsPath: '{source_docs_path}'
workflowPath: '{workflow_path}'
---

# Rebuild Step 5: Finalize and Report

## STEP GOAL

Save document checksums, log rebuild activity, and generate comprehensive rebuild report.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: This is the final step (nextStepFile: null)
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ✅ Display completion message with full statistics
- 🚫 DO NOT auto-proceed (end of workflow)

### Role Reinforcement
- You are a **Rebuild Finalization and Reporting Specialist**
- Your role is to persist metadata and generate reports
- Save document checksums for future updates
- Log rebuild activity to synthesis history
- Generate comprehensive rebuild report
- Display completion summary with statistics

### Step-Specific Rules
- Calculate and save checksums for all source documents
- Append rebuild entry to synthesis-log.jsonl
- Generate detailed rebuild report
- Display completion summary with counts
- Mark workflow complete (no auto-proceed)

## EXECUTION PROTOCOLS
- 💾 Calculate and save checksums
- 📝 Log rebuild activity
- 📊 Generate comprehensive report
- ✅ Display completion message

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {sourceDocsPath}, {workflowPath}
- **Focus:** Metadata persistence and final reporting
- **Limits:** This is final step, no auto-proceed
- **Dependencies:** All rebuild steps complete, verification passed

## MANDATORY SEQUENCE

### 1. Progress Message

Display:

```
🔄 Knowledge Base Rebuild - Step 5/6

Finalizing rebuild...
Saving metadata and generating report...
```

### 2. Calculate and Save Checksums

Generate checksums for all source documents:

```bash
echo ""
echo "Calculating document checksums..."

# Find all source documents
mapfile -t all_docs < <(find "{sourceDocsPath}" -name "*.md" -not -path "*/99-*/*" | sort)
doc_count=${#all_docs[@]}

echo "  Processing $doc_count documents..."

# Initialize JSON
checksums_file="{sharedKnowledgePath}/metadata/source-checksums.json"
echo "{" > "$checksums_file"

processed=0
first=true

for doc_path in "${all_docs[@]}"; do
  ((processed++))
  
  # Progress indicator
  if (( processed % 20 == 0 )); then
    echo "    Processed $processed/$doc_count..."
  fi
  
  # Calculate SHA256 checksum (matches init mode)
  checksum=$(sha256sum "$doc_path" | awk '{print $1}')
  
  # Get relative path
  rel_path=${doc_path#"{sourceDocsPath}/"}
  
  # Add to JSON
  if [ "$first" = true ]; then
    first=false
  else
    echo "," >> "$checksums_file"
  fi
  
  echo "  \"$rel_path\": \"$checksum\"" >> "$checksums_file"
done

echo "" >> "$checksums_file"
echo "}" >> "$checksums_file"

echo "✓ Checksums saved for $doc_count documents"
```

### 3. Append to Synthesis Log

Log rebuild activity:

```bash
echo ""
echo "Logging rebuild activity..."

log_file="{sharedKnowledgePath}/metadata/synthesis-log.jsonl"

# Count memories by category
req_count=$(find "{sharedKnowledgePath}/memories/requirements" -name "*.md" 2>/dev/null | wc -l)
arch_count=$(find "{sharedKnowledgePath}/memories/architecture" -name "*.md" 2>/dev/null | wc -l)
int_count=$(find "{sharedKnowledgePath}/memories/integrations" -name "*.md" 2>/dev/null | wc -l)
ops_count=$(find "{sharedKnowledgePath}/memories/operations" -name "*.md" 2>/dev/null | wc -l)
total_memories=$((req_count + arch_count + int_count + ops_count))

# Count agent extracts
agents=("chief-editor" "value-analyst" "value-narrator" "solution-consultant" "technical-wizard" "product-manager" "technical-scribe" "solution-designer")
total_extracts=0
for agent in "${agents[@]}"; do
  count=$(find "{agentsMemoryPath}/$agent/knowledge" -name "*.md" 2>/dev/null | wc -l)
  total_extracts=$((total_extracts + count))
done

# Append log entry (JSONL format)
cat >> "$log_file" << LOGEOF
{"timestamp":"$(date -Iseconds)","mode":"rebuild","documents_processed":${doc_count},"memories_created":${total_memories},"agent_extracts_created":${total_extracts},"categories":{"requirements":${req_count},"architecture":${arch_count},"integrations":${int_count},"operations":${ops_count}},"status":"complete"}
LOGEOF

echo "✓ Rebuild activity logged"
```

### 4. Generate Comprehensive Rebuild Report

Create detailed report:

```bash
echo ""
echo "Generating rebuild report..."

report_file="{sharedKnowledgePath}/reports/rebuild-report-$(date +%Y%m%d-%H%M%S).md"

# Get backup location (from step-01)
latest_backup=$(find "{sharedKnowledgePath}/backups" -maxdepth 1 -name "rebuild-*" -type d | sort -r | head -1)
backup_name=$(basename "$latest_backup" 2>/dev/null || echo "none")

# Count agent extracts per agent
agent_breakdown=""
for agent in "${agents[@]}"; do
  count=$(find "{agentsMemoryPath}/$agent/knowledge" -name "*.md" 2>/dev/null | wc -l)
  agent_breakdown="${agent_breakdown}  - $agent: $count extracts\n"
done

# Generate report
cat > "$report_file" << 'REPORTEOF'
# Knowledge Base Rebuild Report

**Date:** $(date -I)
**Time:** $(date +%H:%M:%S)
**Mode:** Rebuild (Full Regeneration)
**Status:** ✅ Complete

---

## Executive Summary

The knowledge base has been completely rebuilt from source documents. All existing memories and agent knowledge extracts were backed up, then deleted and regenerated from scratch.

**Key Statistics:**
- **Source Documents:** ${doc_count}
- **Memories Created:** ${total_memories}
- **Agent Extracts Generated:** ${total_extracts}
- **Backup Created:** ${backup_name}

---

## Rebuild Process

### Phase 1: Confirmation and Backup

- ✅ User confirmation received ("REBUILD")
- ✅ Backup created: ${latest_backup}
- ✅ Agent context/ directories preserved (agent-managed)

### Phase 2: Cleaning

- ✅ All existing memories deleted
- ✅ All agent extracts deleted
- ✅ Directory structure preserved
- ✅ Metadata cleared (checksums, mappings)

### Phase 3: Memory Synthesis

- ✅ Scanned ${doc_count} source documents
- ✅ Extracted topics from document headings
- ✅ Synthesized memories across related documents
- ✅ Resolved conflicts with human confirmation
- ✅ Created ${total_memories} memories

### Phase 4: Agent Knowledge Extraction

- ✅ Applied relevance filters for 8 agents
- ✅ Generated ${total_extracts} agent-specific extracts
- ✅ Updated agent coverage index

### Phase 5: Verification

- ✅ Verified directory structure
- ✅ Verified memory creation (${total_memories} memories)
- ✅ Verified agent extracts (${total_extracts} extracts)
- ✅ Verified metadata files
- ✅ Verified index files

### Phase 6: Finalization

- ✅ Calculated and saved document checksums
- ✅ Logged rebuild activity to synthesis history
- ✅ Generated this comprehensive report

---

## Memory Distribution

### By Category

| Category | Memories |
|----------|----------|
| **Requirements** | ${req_count} |
| **Architecture** | ${arch_count} |
| **Integrations** | ${int_count} |
| **Operations** | ${ops_count} |
| **TOTAL** | **${total_memories}** |

---

## Agent Knowledge Distribution

### By Agent

${agent_breakdown}

**Total:** ${total_extracts} extracts

---

## Data Integrity

- ✅ Checksums saved: ${doc_count} documents
- ✅ Topic mappings generated
- ✅ Memory index created
- ✅ Agent coverage index created
- ✅ Synthesis log updated
- ✅ Backup preserved: ${latest_backup}

---

## Next Steps

**Recommendations:**

1. **Review Backup:** Backup preserved at ${latest_backup}
2. **Validate Rebuild:** Run `--mode=validate` to verify data integrity
3. **Compare Changes:** Review backup vs new memories to see what changed
4. **Test Agent Access:** Verify agents can access and utilize knowledge extracts

**For Future Updates:**

- Use `--mode=update` for incremental changes (faster)
- This rebuild establishes baseline: $(date -I)
- Next update will detect changes against this baseline
- Rebuild only needed for major restructuring

---

## Metadata

- **Workflow Version:** 3.0.0
- **Rebuild Timestamp:** $(date -Iseconds)
- **Report Location:** ${report_file}
- **Backup Location:** ${latest_backup}

---

## Comparison with Previous State

(If backup exists, compare counts)

**Before Rebuild:**
- Memories: (from backup metadata)
- Agent Extracts: (from backup metadata)

**After Rebuild:**
- Memories: ${total_memories}
- Agent Extracts: ${total_extracts}

**Net Change:**
- Memories: (calculated difference)
- Agent Extracts: (calculated difference)

---

## Conclusion

✅ Knowledge base rebuild completed successfully.

All source documents have been re-processed, memories re-synthesized, and agent knowledge extracts regenerated. The knowledge base is now fully updated and ready for agent use.

Previous state backed up at: ${latest_backup}

REPORTEOF

echo "✓ Rebuild report generated"
echo "  📄 Location: $report_file"
```

### 5. Display Completion Summary

Show final statistics:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 KNOWLEDGE BASE REBUILD COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rebuild Summary:
  📄 Source Documents: {doc_count}
  📚 Memories Created: {total_memories}
    • Requirements: {req_count}
    • Architecture: {arch_count}
    • Integrations: {int_count}
    • Operations: {ops_count}
  
  🤖 Agent Extracts: {total_extracts}
    • 8 agents configured
    • Role-based filtering applied

Data Integrity:
  ✅ Checksums saved ({doc_count} docs)
  ✅ Metadata updated
  ✅ Indexes generated
  ✅ Synthesis logged
  ✅ Backup preserved

Report: {report_file}
Backup: {latest_backup}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Next Steps:
  • Run --mode=validate to verify integrity
  • Review backup if needed: {backup_name}
  • Use --mode=update for future incremental changes

Your knowledge base is fully rebuilt and ready!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 6. Workflow End

**This is the final step. Do not auto-proceed.**

Display:

```
Rebuild workflow complete. Standing by for next command.
```
