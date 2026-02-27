---
name: 'step-04-report-complete'
description: 'Generate comprehensive validation report and display results'
nextStepFile: null
sharedKnowledgePath: '{shared_knowledge_path}'
agentsMemoryPath: '{agents_memory_path}'
---

# Validate Step 4: Validation Report

## STEP GOAL

Aggregate all validation results and generate comprehensive validation report with remediation recommendations.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: This is the final step (nextStepFile: null)
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ✅ Display validation summary with pass/fail status
- 🚫 DO NOT auto-proceed (end of workflow)
- 📊 Provide actionable remediation recommendations

### Role Reinforcement
- You are a **Validation Reporting Specialist**
- Your role is to aggregate validation results
- Generate comprehensive validation report
- Provide clear pass/fail assessment
- Recommend remediation actions for issues
- Display summary to user

### Step-Specific Rules
- Aggregate results from all validation steps
- Calculate overall validation status (pass/warnings/fail)
- Generate detailed validation report
- Provide specific remediation recommendations
- Display comprehensive summary

## EXECUTION PROTOCOLS
- 📊 Aggregate validation results
- 📝 Generate validation report
- ✅ Calculate overall status
- 💡 Provide remediation recommendations

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {agentsMemoryPath}
- **Focus:** Report generation and summary
- **Limits:** This is final step, no auto-proceed
- **Dependencies:** All validation steps (1-3) complete

## MANDATORY SEQUENCE

### 1. Progress Message

Display:

```
🔍 Knowledge Base Validation - Step 4/4

Generating validation report...
Aggregating results and calculating status...
```

### 2. Aggregate Validation Results

Collect counts from previous steps:

```bash
echo ""
echo "Aggregating validation results..."

# Re-count for report accuracy

# Structure counts
categories=("requirements" "architecture" "integrations" "operations")
req_count=$(find "{sharedKnowledgePath}/memories/requirements" -name "*.md" 2>/dev/null | wc -l)
arch_count=$(find "{sharedKnowledgePath}/memories/architecture" -name "*.md" 2>/dev/null | wc -l)
int_count=$(find "{sharedKnowledgePath}/memories/integrations" -name "*.md" 2>/dev/null | wc -l)
ops_count=$(find "{sharedKnowledgePath}/memories/operations" -name "*.md" 2>/dev/null | wc -l)
total_memories=$((req_count + arch_count + int_count + ops_count))

# Agent extract counts
agents=("chief-editor" "value-analyst" "value-narrator" "solution-consultant" "technical-wizard" "product-manager" "technical-scribe" "solution-designer")
total_extracts=0
for agent in "${agents[@]}"; do
  count=$(find "{agentsMemoryPath}/$agent/knowledge" -name "*.md" 2>/dev/null | wc -l)
  total_extracts=$((total_extracts + count))
done

# Metadata status
checksums_file="{sharedKnowledgePath}/metadata/source-checksums.json"
topic_map_file="{sharedKnowledgePath}/metadata/doc-to-topic-map.json"

checksums_valid=false
topic_map_valid=false

[ -f "$checksums_file" ] && jq empty "$checksums_file" 2>/dev/null && checksums_valid=true
[ -f "$topic_map_file" ] && jq empty "$topic_map_file" 2>/dev/null && topic_map_valid=true

# Index file status
memory_index_exists=false
agent_coverage_exists=false

[ -f "{sharedKnowledgePath}/indexes/memory-index.md" ] && memory_index_exists=true
[ -f "{sharedKnowledgePath}/indexes/agent-coverage.md" ] && agent_coverage_exists=true

echo "✓ Results aggregated"
```

### 3. Calculate Overall Validation Status

Determine pass/warning/fail status:

```bash
echo ""
echo "Calculating overall status..."

critical_issues=0
warnings=0

# Critical checks
[ ! -d "{sharedKnowledgePath}/memories" ] && ((critical_issues++))
[ "$total_memories" -eq 0 ] && ((critical_issues++))
[ "$checksums_valid" = false ] && ((warnings++))
[ "$topic_map_valid" = false ] && ((warnings++))
[ "$memory_index_exists" = false ] && ((warnings++))

# Determine overall status
if [ "$critical_issues" -eq 0 ] && [ "$warnings" -eq 0 ]; then
  overall_status="✅ PASSED"
  status_color="green"
elif [ "$critical_issues" -eq 0 ] && [ "$warnings" -gt 0 ]; then
  overall_status="⚠️  PASSED WITH WARNINGS"
  status_color="yellow"
else
  overall_status="❌ FAILED"
  status_color="red"
fi

echo "  Overall Status: $overall_status"
echo "  Critical Issues: $critical_issues"
echo "  Warnings: $warnings"
```

### 4. Generate Validation Report

Create comprehensive validation report:

```bash
echo ""
echo "Generating validation report..."

report_file="{sharedKnowledgePath}/reports/validation-report-$(date +%Y%m%d-%H%M%S).md"
mkdir -p "$(dirname "$report_file")"

# Build agent breakdown
agent_breakdown=""
for agent in "${agents[@]}"; do
  count=$(find "{agentsMemoryPath}/$agent/knowledge" -name "*.md" 2>/dev/null | wc -l)
  context_files=$(find "{agentsMemoryPath}/$agent/context" -type f 2>/dev/null | wc -l)
  agent_breakdown="${agent_breakdown}  - **$agent**: $count extracts, $context_files context files\n"
done

cat > "$report_file" << 'REPORTEOF'
# Knowledge Base Validation Report

**Date:** $(date -I)
**Time:** $(date +%H:%M:%S)
**Mode:** Validate (Integrity Check)
**Overall Status:** ${overall_status}

---

## Executive Summary

This validation report provides a comprehensive assessment of the knowledge base integrity, covering directory structure, file format, and data consistency.

**Key Findings:**
- **Critical Issues:** ${critical_issues}
- **Warnings:** ${warnings}
- **Memories:** ${total_memories}
- **Agent Extracts:** ${total_extracts}

---

## Validation Results

### 1. Structure Validation ✅

**Directory Structure:**
- ✅ Shared knowledge root exists
- ✅ All 4 category directories present
- ✅ Supporting directories (indexes, metadata, reports) present
- ✅ All 8 agent directories configured

**Memory Distribution:**
| Category | Count |
|----------|-------|
| Requirements | ${req_count} |
| Architecture | ${arch_count} |
| Integrations | ${int_count} |
| Operations | ${ops_count} |
| **TOTAL** | **${total_memories}** |

**Agent Configuration:**
${agent_breakdown}

### 2. Content Validation

**Memory Files:**
- Format validation: Sample-based
- Frontmatter completeness: Checked
- Required fields: memory_id, topic, category, sources
- Status: (Details from step-02 validation)

**Agent Extracts:**
- Format validation: Sample-based
- Frontmatter completeness: Checked
- Required fields: extract_id, agent_name, source_document
- Status: (Details from step-02 validation)

**Metadata Files:**
- source-checksums.json: ${checksums_valid}
- doc-to-topic-map.json: ${topic_map_valid}
- synthesis-log.jsonl: (Check results)

**Index Files:**
- memory-index.md: ${memory_index_exists}
- agent-coverage.md: ${agent_coverage_exists}

### 3. Consistency Validation

**Data Integrity:**
- Orphaned memories: (Count from step-03)
- Missing source documents: (Count from step-03)
- Duplicate memory IDs: (Count from step-03)
- Memory index accuracy: (Assessment from step-03)

**Cross-References:**
- Invalid agent extract references: (Count from step-03)
- Unprocessed source documents: (Count from step-03)

---

## Issues Identified

### Critical Issues (${critical_issues})

(List critical issues that prevent normal operation)

### Warnings (${warnings})

(List warnings that should be addressed but don't prevent operation)

---

## Recommendations

### Immediate Actions

(Based on critical issues found)

### Suggested Improvements

1. **If orphaned memories found:**
   - Run `--mode=update` to re-synchronize with source documents
   - Or manually review and delete orphaned memories

2. **If unprocessed documents found:**
   - Run `--mode=update` to process new documents
   - Verify documents are in correct category folders

3. **If metadata issues found:**
   - Run `--mode=rebuild` for full regeneration (backs up existing data)
   - Or manually fix metadata files

4. **If format issues found:**
   - Review malformed files listed in validation
   - Regenerate affected files using rebuild mode

### Maintenance Recommendations

- Run validation weekly to catch issues early
- Run updates immediately after adding new source documents
- Keep backups before running rebuild operations
- Monitor synthesis log for processing history

---

## Validation Checklist

- [ ] ✅ Directory structure complete
- [ ] ${checksums_valid} Checksums file valid
- [ ] ${topic_map_valid} Topic mappings valid
- [ ] ${memory_index_exists} Memory index present
- [ ] ${agent_coverage_exists} Agent coverage index present
- [ ] (✅/⚠️) No orphaned memories
- [ ] (✅/⚠️) No duplicate memory IDs
- [ ] (✅/⚠️) All agent extracts valid

---

## Next Steps

**Based on validation results:**

1. **If PASSED:** Knowledge base is healthy, no action needed
2. **If PASSED WITH WARNINGS:** Review warnings and apply recommended actions
3. **If FAILED:** Address critical issues immediately:
   - Missing structure: Run `--mode=init`
   - Data corruption: Run `--mode=rebuild` (backs up first)
   - Missing files: Run `--mode=update`

**Routine Maintenance:**
- Use `--mode=update` for incremental changes (daily/weekly)
- Use `--mode=validate` to check integrity (weekly)
- Use `--mode=rebuild` only when needed (major restructuring)

---

## Metadata

- **Workflow Version:** 3.0.0
- **Validation Timestamp:** $(date -Iseconds)
- **Report Location:** ${report_file}
- **Total Validation Time:** ~2-3 minutes

---

## Conclusion

${overall_status}

(Summary statement based on overall status)

REPORTEOF

echo "✓ Validation report generated"
echo "  📄 Location: $report_file"
```

### 5. Display Validation Summary

Show final results to user:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 KNOWLEDGE BASE VALIDATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall Status: {overall_status}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Validation Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Structure:
  ✅ Directory organization verified
  📚 Memories: {total_memories}
    • Requirements: {req_count}
    • Architecture: {arch_count}
    • Integrations: {int_count}
    • Operations: {ops_count}
  🤖 Agent Extracts: {total_extracts}
    • 8 agents configured

Content:
  {content_status} File format validation
  {metadata_status} Metadata files
  {index_status} Index files

Consistency:
  {orphan_status} Orphaned memories
  {duplicate_status} Duplicate IDs
  {reference_status} Cross-references

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  Issues Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Critical Issues: {critical_issues}
Warnings: {warnings}

{issues_details}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 Recommendations
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{recommendations}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Full Report: {report_file}

Validation complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 6. Workflow End

**This is the final step. Do not auto-proceed.**

Display:

```
Validation workflow complete. Standing by for next command.
```
