---
name: 'step-04-finalize-complete'
description: 'Save updated metadata and generate processing report'
nextStepFile: null
sharedKnowledgePath: '{shared_knowledge_path}'
sourceDocsPath: '{source_docs_path}'
workflowPath: '{workflow_path}'
---

# Update Step 4: Finalize and Report

## STEP GOAL

Save updated checksums, append to synthesis log, generate processing report, and display completion summary.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: This is the final step (nextStepFile: null)
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ✅ Display completion message with statistics
- 🚫 DO NOT auto-proceed (end of workflow)

### Role Reinforcement
- You are an **Update Finalization Specialist**
- Your role is to save metadata and generate reports
- Persist updated checksums for future comparisons
- Log processing details to synthesis history
- Generate comprehensive processing report
- Display completion summary to user

### Step-Specific Rules
- Save current checksums to metadata/source-checksums.json
- Append processing entry to metadata/synthesis-log.jsonl
- Generate processing-report.md from template
- Display summary with document and memory counts
- Mark workflow complete

## EXECUTION PROTOCOLS
- 💾 Save updated checksums
- 📝 Log synthesis activity
- 📊 Generate processing report
- ✅ Display completion message

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {sourceDocsPath}, {workflowPath}
- **Focus:** Metadata persistence and reporting
- **Limits:** This is final step, no auto-proceed
- **Dependencies:** Updated checksums from step-02, processing results from step-03/03a

## MANDATORY SEQUENCE

### 1. Progress Message

Display:

```
🔄 Knowledge Base Update - Step 4/4

Finalizing update process...
Saving metadata and generating report...
```

### 2. Save Updated Checksums

Persist current checksums for future comparisons:

```bash
echo "Saving updated checksums..."

checksums_file="{sharedKnowledgePath}/metadata/source-checksums.json"

# Load current checksums from temp file (created by step-02)
if [ -f "/tmp/current_checksums.json" ]; then
  cp /tmp/current_checksums.json "$checksums_file"
  
  # Count checksums
  checksum_count=$(jq 'length' "$checksums_file")
  
  echo "✓ Saved $checksum_count document checksums"
else
  echo "⚠️  Warning: Current checksums not found in /tmp"
fi
```

### 3. Append to Synthesis Log

Log this processing session:

```bash
echo "Logging synthesis activity..."

log_file="{sharedKnowledgePath}/metadata/synthesis-log.jsonl"

# Load processing statistics
if [ -f "/tmp/km_changed_docs.txt" ]; then
  changed_count=$(wc -l < /tmp/km_changed_docs.txt)
else
  changed_count=0
fi

if [ -f "/tmp/km_new_docs.txt" ]; then
  new_count=$(wc -l < /tmp/km_new_docs.txt)
else
  new_count=0
fi

if [ -f "/tmp/km_deleted_docs.txt" ]; then
  deleted_count=$(wc -l < /tmp/km_deleted_docs.txt)
else
  deleted_count=0
fi

# Count memories by category
req_count=$(find "{sharedKnowledgePath}/memories/requirements" -name "*.md" 2>/dev/null | wc -l)
arch_count=$(find "{sharedKnowledgePath}/memories/architecture" -name "*.md" 2>/dev/null | wc -l)
int_count=$(find "{sharedKnowledgePath}/memories/integrations" -name "*.md" 2>/dev/null | wc -l)
ops_count=$(find "{sharedKnowledgePath}/memories/operations" -name "*.md" 2>/dev/null | wc -l)
total_memories=$((req_count + arch_count + int_count + ops_count))

# Append log entry (JSONL format - one JSON object per line)
cat >> "$log_file" << LOGEOF
{"timestamp":"$(date -Iseconds)","mode":"update","documents_changed":${changed_count},"documents_new":${new_count},"documents_deleted":${deleted_count},"memories_total":${total_memories},"categories":{"requirements":${req_count},"architecture":${arch_count},"integrations":${int_count},"operations":${ops_count}},"status":"complete"}
LOGEOF

echo "✓ Synthesis activity logged"
```

### 4. Generate Processing Report

Create comprehensive report from template:

```bash
echo "Generating processing report..."

report_file="{sharedKnowledgePath}/reports/processing-report-$(date +%Y%m%d-%H%M%S).md"

# Get agent extract counts
agent_extracts_total=0
agents=("chief-editor" "value-analyst" "value-narrator" "solution-consultant" "technical-wizard" "product-manager" "technical-scribe" "solution-designer")

agent_breakdown=""
for agent in "${agents[@]}"; do
  count=$(find "{agentsMemoryPath}/$agent/knowledge" -name "*.md" 2>/dev/null | wc -l)
  agent_extracts_total=$((agent_extracts_total + count))
  agent_breakdown+="  - $agent: $count extracts\n"
done

# Generate report
cat > "$report_file" << 'REPORTEOF'
# Knowledge Base Update Report

**Date:** $(date -I)
**Time:** $(date +%H:%M:%S)
**Mode:** Update (Incremental)
**Status:** ✅ Complete

---

## Processing Summary

### Source Documents

- **Changed:** ${changed_count} documents
- **New:** ${new_count} documents
- **Deleted:** ${deleted_count} documents
- **Total Affected:** $((changed_count + new_count + deleted_count)) documents

### Memory Synthesis

**Total Memories:** ${total_memories}

By Category:
- **Requirements:** ${req_count} memories
- **Architecture:** ${arch_count} memories
- **Integrations:** ${int_count} memories
- **Operations:** ${ops_count} memories

### Agent Knowledge Extracts

**Total Extracts:** ${agent_extracts_total}

By Agent:
${agent_breakdown}

---

## Workflow Execution

**Steps Completed:**

1. ✅ Prerequisites verification
   - Verified memory structure
   - Loaded metadata (checksums, mappings, log)

2. ✅ Change detection
   - Scanned source documents
   - Calculated checksums
   - Identified ${changed_count} changed, ${new_count} new, ${deleted_count} deleted

3. ✅ Memory re-synthesis
   - Re-synthesized affected memories
   - Handled conflicts with human confirmation
   - Updated doc-to-topic mappings

4. ✅ Agent extraction
   - Regenerated knowledge extracts for affected documents
   - Applied role-based relevance filters
   - Updated all 8 agent knowledge directories

5. ✅ Finalization
   - Saved updated checksums
   - Logged synthesis activity
   - Generated processing report

---

## Data Integrity

- ✅ Checksums saved: ${checksum_count} documents
- ✅ Topic mappings updated
- ✅ Memory index regenerated
- ✅ Agent coverage index updated
- ✅ Synthesis log appended

---

## Next Actions

**Recommendations:**

- Run `--mode=validate` to verify data integrity
- Review any memories marked for manual review (if conflicts were skipped)
- Check agent knowledge extracts for relevance and completeness

**For Future Updates:**

- This update baseline established: $(date -I)
- Next update will detect changes since this run
- Incremental updates preserve unaffected memories

---

## Metadata

- **Workflow Version:** 3.0.0
- **Report Generated:** $(date -Iseconds)
- **Report Location:** ${report_file}

REPORTEOF

echo "✓ Processing report generated"
echo "  📄 Location: $report_file"
```

### 5. Clean Up Temporary Files

Remove temporary processing files:

```bash
echo ""
echo "Cleaning up temporary files..."

rm -f /tmp/km_changed_docs.txt
rm -f /tmp/km_new_docs.txt
rm -f /tmp/km_deleted_docs.txt
rm -f /tmp/current_checksums.json

echo "✓ Temporary files cleaned"
```

### 6. Display Completion Summary

Show final statistics:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 KNOWLEDGE BASE UPDATE COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Source Documents Processed:
  ✎ Changed: {changed_count}
  ⊕ New: {new_count}
  ⊖ Deleted: {deleted_count}
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Total: {total_affected}

Memory Synthesis:
  📚 Total Memories: {total_memories}
    • Requirements: {req_count}
    • Architecture: {arch_count}
    • Integrations: {int_count}
    • Operations: {ops_count}

Agent Knowledge Extracts:
  🤖 Total Extracts: {agent_extracts_total}
  👥 Agents Updated: 8

Processing Details:
  ✅ Checksums saved: {checksum_count} documents
  ✅ Synthesis logged
  ✅ Report generated

Report: {report_file}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your knowledge base is up to date! Next update will detect
changes against this baseline.

Run --mode=validate to verify data integrity.
```

### 7. Workflow End

**This is the final step. Do not auto-proceed.**

Display:

```
Update workflow complete. Standing by for next command.
```
