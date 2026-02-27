# Error Messages and Solutions

**Standard error messages for knowledge management workflow with troubleshooting guidance**

---

## Prerequisites Errors

### ERR-001: Sidecar Directory Not Found

**Message:**
```
✗ Sidecar directory not found!

Knowledge base has not been initialized.
Please re-invoke workflow with mode=init
```

**Cause:** Attempting update/validate/rebuild on non-existent sidecar

**Solution:** Run init mode first
```bash
Re-invoke workflow with mode=init
```

**Exit Code:** 2 (prerequisites failed)

---

### ERR-002: Source Directory Not Found

**Message:**
```
✗ Source directory not found!
Location: {source_docs_path}

Cannot proceed without source documents.
Please ensure reference-docs/ directory exists.
```

**Cause:** Source directory missing or path misconfigured

**Solutions:**
1. Check source directory exists:
   ```bash
   ls -la bmad/reference-docs/
   ```
2. Create source directory:
   ```bash
   mkdir -p bmad/reference-docs
   ```
3. Check config.yaml for correct path

**Exit Code:** 2 (prerequisites failed)

---

### ERR-003: Critical Files Missing

**Message:**
```
✗ Sidecar Health Check FAILED

Missing or corrupted files:
  • indexes/doc-index.json
  • metadata/source-checksums.json

Sidecar is corrupted and cannot be updated incrementally.
Please re-invoke workflow with mode=rebuild
```

**Cause:** Essential sidecar files deleted or corrupted

**Solution:** Rebuild from source
```bash
Re-invoke workflow with mode=rebuild
```

**Exit Code:** 2 (prerequisites failed)

---

## Processing Errors

### ERR-010: JSON File Malformed

**Message:**
```
✗ doc-index.json is malformed

Cannot parse index file. Sidecar may be corrupted.
Recommendation: Run workflow with --mode=rebuild
```

**Cause:** Corrupted JSON file (manual edit, incomplete write, disk error)

**Solution:** Rebuild knowledge base
```bash
Re-invoke workflow with mode=rebuild
```

**Exit Code:** 4 (critical failure)

---

### ERR-011: Checksum Mismatch

**Message:**
```
⚠️ Checksum mismatch detected for multiple files

Files with checksum mismatches: 5
Knowledge base is out of sync.
Recommendation: Run --mode=update to synchronize
```

**Cause:** Source files modified but knowledge base not updated

**Solution:** Run update mode
```bash
Re-invoke workflow with mode=update
```

**Exit Code:** 0 (warning, not error) or 1 if severe

---

### ERR-012: No Documents Found

**Message:**
```
⚠️ No markdown documents found in source directory

Scanned: {source_docs_path}
Found: 0 documents

Ensure source directory contains .md files and not all in 99-* folders.
```

**Cause:** Empty source directory or all files excluded

**Solutions:**
1. Check source directory has .md files:
   ```bash
   find bmad/reference-docs/ -name "*.md" -type f
   ```
2. Check exclusion patterns aren't too broad
3. Ensure files aren't all in 99-* folders

**Exit Code:** 2 (prerequisites failed)

---

### ERR-013: Partial Processing Failure

**Message:**
```
⚠️ Processing completed with errors

Documents processed: 15 / 20 (75%)
Failed documents: 5

See processing log for details:
  {sidecar_path}/metadata/processing-log.jsonl
```

**Cause:** Some documents caused processing errors (encoding, format, etc.)

**Solutions:**
1. Check processing log:
   ```bash
   cat bmad/_memory/reference-docs-sidecar/metadata/processing-log.jsonl | jq -r 'select(.status == "error")'
   ```
2. Check failed documents for issues:
   - Invalid encoding
   - Malformed markdown
   - Binary data
3. Fix or move problematic files to 99-archive/

**Exit Code:** 3 (partial success)

---

## Backup Errors

### ERR-020: Backup Creation Failed

**Message:**
```
✗ Backup failed!

Cannot proceed without backup. Aborting.
```

**Cause:** Insufficient disk space, permission errors, or I/O error

**Solutions:**
1. Check disk space:
   ```bash
   df -h
   ```
2. Check permissions:
   ```bash
   ls -ld bmad/_memory/
   ```
3. Manually create backup:
   ```bash
   cp -r bmad/_memory/reference-docs-sidecar bmad/_memory/reference-docs-sidecar-backup-$(date +%Y%m%d-%H%M%S)
   ```

**Exit Code:** 4 (critical failure)

---

### ERR-021: Backup Verification Failed

**Message:**
```
✗ Backup verification failed!

Backup directory not found or incomplete.
Aborting rebuild for safety.
```

**Cause:** Backup created but verification check failed

**Solution:** Manually verify backup exists and is complete
```bash
ls -la bmad/_memory/reference-docs-sidecar-backup-*
```

**Exit Code:** 4 (critical failure)

---

## Permission Errors

### ERR-030: Write Permission Denied

**Message:**
```
✗ Permission error: Cannot write to _memory/

Insufficient permissions to create or modify sidecar.
Check directory permissions.
```

**Cause:** User lacks write permissions to _memory/ directory

**Solutions:**
1. Check permissions:
   ```bash
   ls -ld bmad/_memory/
   ```
2. Fix permissions:
   ```bash
   chmod u+w bmad/_memory/
   ```
   or
   ```bash
   sudo chown $USER bmad/_memory/
   ```

**Exit Code:** 4 (critical failure)

---

### ERR-031: Read Permission Denied for Source

**Message:**
```
✗ Permission error: Cannot read source documents

Cannot access: {source_docs_path}
Check directory permissions.
```

**Cause:** User lacks read permissions to reference-docs/

**Solution:** Fix permissions
```bash
chmod -R u+r bmad/reference-docs/
```

**Exit Code:** 4 (critical failure)

---

## Validation Errors

### ERR-040: Document Count Mismatch

**Message:**
```
✗ Document count mismatch

Source documents: 42
Indexed documents: 38
Difference: 4 documents not indexed

Recommendation: Run --mode=update to synchronize
```

**Cause:** New documents added but knowledge base not updated

**Solution:** Run update mode
```bash
Re-invoke workflow with mode=update
```

**Exit Code:** 1 (warning)

---

### ERR-041: Orphaned Index Entries

**Message:**
```
⚠️ Orphaned index entries detected

Documents in index but not in source: 3
  • old-document.md (source file deleted)
  • deprecated-spec.md (source file deleted)
  • moved-file.md (source file deleted)

Recommendation: Run --mode=update to clean up
```

**Cause:** Source files deleted but index not updated

**Solution:** Run update mode to clean orphaned entries
```bash
Re-invoke workflow with mode=update
```

**Exit Code:** 1 (warning)

---

### ERR-042: Stale Knowledge Base

**Message:**
```
⚠️ Knowledge base has not been updated recently.

Last update: 15 days ago
Checksums may be stale.

Recommendation: Run --mode=update
```

**Cause:** Knowledge base hasn't been updated in > 7 days

**Solution:** Run update mode
```bash
Re-invoke workflow with mode=update
```

**Exit Code:** 1 (warning)

---

## Rebuild Errors

### ERR-050: Sidecar Already Exists (Init Mode)

**Message:**
```
⚠️ Sidecar directory already exists!
Location: {sidecar_path}

If you want to rebuild, use: --mode=rebuild
To update existing knowledge, use: --mode=update
```

**Cause:** Attempting init when sidecar already exists

**Solutions:**
- For incremental update: `--mode=update`
- For complete rebuild: `--mode=rebuild`
- To force init: Delete sidecar first (⚠️ destroys existing knowledge)

**Exit Code:** 1 (user error)

---

### ERR-051: User Aborted Rebuild

**Message:**
```
═══════════════════════════════════════════════
  REBUILD ABORTED
═══════════════════════════════════════════════

Rebuild operation cancelled by user.

Backup created: [backup_location]

Your existing knowledge base remains unchanged.
```

**Cause:** User selected [A] Abort during rebuild confirmation

**Solution:** This is intentional user action. No fix needed.

**Exit Code:** 1 (user abort)

---

## System Errors

### ERR-060: Disk Space Insufficient

**Message:**
```
✗ Insufficient disk space

Required: ~50 MB
Available: 10 MB

Free up disk space and try again.
```

**Cause:** Insufficient disk space for sidecar creation

**Solution:** Free up disk space
```bash
# Check disk usage
df -h

# Remove old backups
rm -rf bmad/_memory/reference-docs-sidecar-backup-*

# Check for large files
du -sh bmad/* | sort -h
```

**Exit Code:** 4 (critical failure)

---

### ERR-061: Command Not Found

**Message:**
```
✗ Required command not found: jq

Please install jq:
  Ubuntu/Debian: sudo apt install jq
  macOS: brew install jq
```

**Cause:** Missing required system command (jq, sha256sum, etc.)

**Solution:** Install missing command
```bash
# Ubuntu/Debian
sudo apt install jq

# macOS
brew install jq
```

**Exit Code:** 4 (critical failure)

---

## Troubleshooting Commands

### View Processing Errors
```bash
# View all errors from processing log
cat bmad/_memory/reference-docs-sidecar/metadata/processing-log.jsonl | jq -r 'select(.status == "error")'

# View last 10 log entries
tail -10 bmad/_memory/reference-docs-sidecar/metadata/processing-log.jsonl | jq .
```

### Check Sidecar Health
```bash
# Run validation
Re-invoke workflow with mode=validate

# Check JSON validity
jq empty bmad/_memory/reference-docs-sidecar/indexes/doc-index.json
jq empty bmad/_memory/reference-docs-sidecar/metadata/source-checksums.json
```

### Force Recovery
```bash
# Nuclear option: Delete and rebuild
rm -rf bmad/_memory/reference-docs-sidecar
Re-invoke workflow with mode=init
```

---

## Exit Code Reference

| Code | Meaning | Action |
|------|---------|--------|
| 0 | Success | Continue normally |
| 1 | User abort or warning | Review message, take corrective action if needed |
| 2 | Prerequisites failed | Fix prerequisites (init sidecar, check source) |
| 3 | Partial success | Review processing log, fix source documents |
| 4 | Critical failure | Review error message, fix underlying issue |

---

For more troubleshooting, see:
- workflow-plan.md
- Processing log: `{sidecar_path}/metadata/processing-log.jsonl`
- Quick reference: `../../knowledge/reference-knowledge-quickref.md`
