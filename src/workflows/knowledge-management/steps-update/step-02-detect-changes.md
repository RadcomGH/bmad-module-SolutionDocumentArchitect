---
name: 'step-02-detect-changes'
description: 'Compare checksums to identify changed, new, and deleted documents'
nextStepFile: './step-03-process-changes.md'
sharedKnowledgePath: '{shared_knowledge_path}'
sourceDocsPath: '{source_docs_path}'
---

# Update Step 2: Detect Changes

## STEP GOAL

Calculate current document checksums, compare with stored checksums, and identify which documents have changed, been added, or been deleted since last processing.

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules
- 📖 CRITICAL: Read complete step file before taking action
- 🔄 CRITICAL: When loading next step, ensure entire file is read
- ⚙️ If subprocess/tool unavailable, achieve outcome in main context
- ✅ Auto-proceed after change detection completes
- 🚫 DO NOT halt for user input
- 🎯 USE SUBPROCESS OPTIMIZATION for document processing

### Role Reinforcement
- You are a **Change Detection Specialist**
- Your role is to identify exactly what has changed since last run
- Calculate checksums for all current documents
- Compare with stored checksums to detect changes
- Categorize changes: MODIFIED, NEW, DELETED
- Auto-proceed with change report

### Step-Specific Rules
- Calculate SHA256 checksums for all source documents
- Compare with stored checksums from metadata
- Build lists: changed_docs, new_docs, deleted_docs
- If NO changes detected, skip processing and report
- If changes detected, proceed to re-synthesis

## EXECUTION PROTOCOLS
- 🎯 Scan all source documents
- 🔐 Calculate checksums for each file
- 📊 Compare with stored checksums
- ➡️ Auto-proceed to processing or skip if no changes

## CONTEXT BOUNDARIES
- **Available:** {sharedKnowledgePath}, {sourceDocsPath}
- **Focus:** Change detection only
- **Limits:** DO NOT process documents (next step)
- **Dependencies:** Checksums loaded from step-01

## MANDATORY SEQUENCE

### 1. Progress Message

Display:

```
🔄 Knowledge Base Update - Step 2/4

Detecting changes in source documents...
Scanning: {sourceDocsPath}
```

### 2. Scan Current Documents

Find all markdown documents:

```bash
echo "Scanning for markdown documents..."

# Find all .md files excluding 99-archive folders
current_docs=$(find "{sourceDocsPath}" -name "*.md" -not -path "*/99-*/*" | sort)

doc_array=()
while IFS= read -r doc; do
  doc_array+=("$doc")
done <<< "$current_docs"

current_count=${#doc_array[@]}
echo "✓ Found $current_count documents"
```

### 3. Calculate Current Checksums

Compute checksums for all current documents:

```bash
echo ""
echo "Calculating checksums..."

declare -A current_checksums

for doc in "${doc_array[@]}"; do
  # Get relative path from source docs root
  rel_path="${doc#"{sourceDocsPath}/"}"
  
  # Calculate SHA256 checksum (more secure, matches init mode)
  checksum=$(sha256sum "$doc" | awk '{print $1}')
  
  current_checksums["$rel_path"]="$checksum"
  
  # Progress indicator
  ((processed++))
  if (( processed % 10 == 0 )); then
    echo "  Processed $processed/$current_count..."
  fi
done

echo "✓ Checksums calculated for $current_count documents"
```

### 4. Load Stored Checksums

Load checksums from previous run:

```bash
echo ""
echo "Loading stored checksums..."

checksum_file="{sharedKnowledgePath}/metadata/source-checksums.json"

# Parse JSON into associative array
declare -A stored_checksums

while IFS= read -r line; do
  doc_path=$(echo "$line" | jq -r '.path')
  checksum=$(echo "$line" | jq -r '.checksum')
  stored_checksums["$doc_path"]="$checksum"
done < <(jq -c '.[]' "$checksum_file")

stored_count=${#stored_checksums[@]}
echo "✓ Loaded $stored_count stored checksums"
```

### 5. Compare and Identify Changes

Determine MODIFIED, NEW, and DELETED documents:

```bash
echo ""
echo "Comparing checksums..."

changed_docs=()
new_docs=()
deleted_docs=()

# Check for MODIFIED and NEW documents
for doc_path in "${!current_checksums[@]}"; do
  current_sum="${current_checksums[$doc_path]}"
  
  if [[ -n "${stored_checksums[$doc_path]}" ]]; then
    # Document existed before
    stored_sum="${stored_checksums[$doc_path]}"
    
    if [[ "$current_sum" != "$stored_sum" ]]; then
      # Checksum changed - MODIFIED
      changed_docs+=("$doc_path")
    fi
  else
    # Document is new
    new_docs+=("$doc_path")
  fi
done

# Check for DELETED documents
for doc_path in "${!stored_checksums[@]}"; do
  if [[ -z "${current_checksums[$doc_path]}" ]]; then
    # Document was removed
    deleted_docs+=("$doc_path")
  fi
done

changed_count=${#changed_docs[@]}
new_count=${#new_docs[@]}
deleted_count=${#deleted_docs[@]}

total_changes=$((changed_count + new_count + deleted_count))

echo "✓ Change detection complete"
```

### 6. Display Change Summary

Show what changed:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Change Detection Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Documents Scanned: {current_count}
Total Changes Detected: {total_changes}

MODIFIED: {changed_count} documents
NEW: {new_count} documents  
DELETED: {deleted_count} documents
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

If total_changes > 0, list the changed files:

```bash
if [ $changed_count -gt 0 ]; then
  echo ""
  echo "Modified Documents:"
  for doc in "${changed_docs[@]}"; do
    echo "  ✎ $doc"
  done
fi

if [ $new_count -gt 0 ]; then
  echo ""
  echo "New Documents:"
  for doc in "${new_docs[@]}"; do
    echo "  ⊕ $doc"
  done
fi

if [ $deleted_count -gt 0 ]; then
  echo ""
  echo "Deleted Documents:"
  for doc in "${deleted_docs[@]}"; do
    echo "  ⊖ $doc"
  done
fi
```

### 7. Decision: Process or Skip

If NO changes detected:

```bash
if [ $total_changes -eq 0 ]; then
  echo ""
  echo "✓ Knowledge base is up-to-date!"
  echo "No processing needed."
  echo ""
  echo "Update workflow complete."
  exit 0
fi
```

If changes detected, proceed:

```bash
echo ""
echo "Proceeding to process changes and update memories..."
```

### 8. Export Change Lists

Save change lists for next step:

```bash
# Export to temp files for next step to read
echo "${changed_docs[@]}" > /tmp/km_changed_docs.txt
echo "${new_docs[@]}" > /tmp/km_new_docs.txt
echo "${deleted_docs[@]}" > /tmp/km_deleted_docs.txt

# Also export current checksums for final save
jq -n --argjson data "$(declare -p current_checksums)" \
  '$data' > /tmp/km_current_checksums.json
```

### 9. Auto-Proceed to Processing

Load and execute next step:

```
Loading step-03-process-changes.md...
```

**Read complete file {nextStepFile}, then execute it.**
