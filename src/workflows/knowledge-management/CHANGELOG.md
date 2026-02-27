# Changelog: Knowledge Management Workflow

## [3.0.0] - 2026-02-19

### Major Architecture Changes

**Two-Tier Memory System:**
- Migrated from sidecar indexing pattern to two-tier memory architecture
- `shared-knowledge/memories/` - Topic-based synthesis across documents
- `agents/{agent-name}/knowledge/` - Agent-specific knowledge extracts
- Eliminated document-centric indexing in favor of knowledge synthesis

### Performance Improvements

**5-Phase Batch Processing Pipeline:**
1. **Bulk Topic Discovery** - Single grep search across all documents
2. **Targeted Document Reading** - Parallel reading of 5-7 documents
3. **Bulk Memory Creation** - Batch creation of 3-5 memories per iteration
4. **Comprehensive Agent Extract Generation** - 2-3 extracts per memory
5. **Batch Metadata Update** - Deferred updates in single operation

**Efficiency Gains:**
- **3-4x improvement** in processing speed vs sequential approach
- **50-60% token usage** for complete corpus (vs 100%+ for sequential)
- Memory depth increased from 300-400 lines to 750-1000 lines
- Agent extract density increased to 2-3 per memory (vs 0-1)

### Content Quality Enhancements

**Cross-Document Synthesis:**
- Each memory synthesizes 2-4 source documents (not 1:1 mapping)
- Comparative analyses across customers/deployments
- Complete architectural specifications vs summaries
- ASCII diagrams, examples, formulas, benchmarks included

**Agent Extract Improvements:**
- Comprehensive coverage: 50-70 extracts for 23-26 memories
- Role-filtered content via grounding-rules.yaml
- Preserves technical depth while focusing on agent's domain

### Best Practices Documentation

**Added Sections:**
- Optimization Strategies with 5-phase pipeline details
- Performance Benchmarks with baseline vs optimized metrics
- Best Practices and Lessons Learned
- Common Pitfalls to Avoid
- Version History

### Breaking Changes

**Memory Structure:**
- Old location: `_memory/reference-docs-sidecar/`
- New location: `_memory/shared-knowledge/memories/` + `_memory/agents/{agent}/knowledge/`
- Migration: Run `@knowledge-management --mode=rebuild` to convert

**Processing Model:**
- Old: Document indexing with summaries and metadata
- New: Topic-based memory synthesis with agent extracts
- Impact: Workflow now produces fewer, deeper memories instead of many shallow indexes

### Migration Guide

For projects using v2.0.0:

1. **Backup existing sidecar:**
   ```bash
   cp -r bmad/_memory/reference-docs-sidecar bmad/_memory/reference-docs-sidecar-backup-v2
   ```

2. **Run rebuild in v3.0.0:**
   ```
   @knowledge-management --mode=rebuild
   ```

3. **Validate new structure:**
   ```
   @knowledge-management --mode=validate
   ```

4. **Remove old sidecar (if validation passes):**
   ```bash
   rm -rf bmad/_memory/reference-docs-sidecar-backup-v2
   ```

---

## [2.0.0] - 2026-02-09

### Initial V6 Compliant Release

**Multi-Modal Operation:**
- Added init/update/rebuild/validate modes
- Mode-specific step folders
- Step-file architecture

**Subprocess Optimization:**
- Parallel file operations
- Batch processing for checksums
- Optimized directory scanning

---

## [1.0.0] - 2026-01-15

### Initial Release

**Features:**
- Sidecar pattern for reference document management
- Document indexing and metadata extraction
- Summary generation
- Basic agent extract creation
