const fs = require('node:fs').promises;
const path = require('node:path');

/**
 * SDA Module Installer
 * Standard module installer function that executes after IDE installations
 *
 * @param {Object} options - Installation options
 * @param {string} options.projectRoot - The root directory of the target project
 * @param {Object} options.config - Module configuration from module.yaml
 * @param {Array<string>} options.installedIDEs - Array of IDE codes that were installed
 * @param {Object} options.logger - Logger instance for output
 * @returns {Promise<boolean>} - Success status
 */
async function install(options) {
  const { projectRoot, config, installedIDEs, logger } = options;

  try {
    logger.log('📝 Installing SDA Module...');

    // Create reference-docs directory structure
    const refDocsPath = path.join(projectRoot, 'reference-docs');
    const refDocsStructure = [
      'requirements/customer',
      'requirements/internal',
      'design/architecture',
      'design/technical',
      'design/decisions',
      'systems/current',
      'systems/legacy',
      'solutions/templates',
      'solutions/archives',
      'context/domain',
      'context/business',
      'context/compliance',
    ];

    logger.log('Creating reference-docs directory structure...');
    for (const subdir of refDocsStructure) {
      const dirPath = path.join(refDocsPath, subdir);
      await fs.mkdir(dirPath, { recursive: true });
    }

    // Create reference-docs README
    const readmePath = path.join(refDocsPath, 'README.md');
    try {
      await fs.access(readmePath);
    } catch {
      const readmeContent = `# Reference Documents

This directory contains reference materials used by the Solution Document Architect agents.

## Directory Structure

- **requirements/** - Customer and internal requirements documents
  - **customer/** - External customer requirements
  - **internal/** - Internal requirements & specifications
  
- **design/** - Internal design documents
  - **architecture/** - System architecture documents
  - **technical/** - Technical design specifications
  - **decisions/** - Architecture Decision Records (ADRs)
  
- **systems/** - System descriptions & documentation
  - **current/** - Current system state documentation
  - **legacy/** - Legacy system documentation
  
- **solutions/** - Prior solution documents
  - **templates/** - Solution document templates
  - **archives/** - Historical/reference solutions
  
- **context/** - Business & domain context
  - **domain/** - Domain knowledge documents
  - **business/** - Business requirements/context
  - **compliance/** - Regulatory & compliance documents

## Usage

Agents reference these documents to gather context when creating solution documents. Place relevant reference materials in the appropriate subdirectory.

**Index File:** The \`index.yaml\` file provides a queryable catalog of all reference documents, automatically maintained by the Weaver agent.

## Guidelines

1. Keep documents organized by category
2. Use descriptive filenames
3. Include metadata (date, author, version) in documents
4. Archive outdated documents rather than deleting them
5. Update this README if adding new categories
6. The index is auto-generated - no manual updates needed
`;
      await fs.writeFile(readmePath, readmeContent, 'utf8');
      logger.log('✓ Created reference-docs/README.md');
    }
    logger.log('✓ Reference documentation structure ready');

    // Create output directory if configured
    if (config['output_folder']) {
      // Strip {project-root}/ prefix if present
      const outputConfig = config['output_folder'].replace('{project-root}/', '');
      const outputPath = path.join(projectRoot, outputConfig);

      try {
        await fs.access(outputPath);
      } catch {
        logger.log(`Creating SDA output directory: ${outputConfig}`);
        await fs.mkdir(outputPath, { recursive: true });

        // Add any default SDA templates or assets here
        const templatesSource = path.join(__dirname, 'assets');
        try {
          const templateFiles = await fs.readdir(templatesSource);

          for (const file of templateFiles) {
            const source = path.join(templatesSource, file);
            const dest = path.join(outputPath, file);

            try {
              await fs.access(dest);
            } catch {
              await fs.copyFile(source, dest);
              logger.log(`✓ Added ${file}`);
            }
          }
        } catch {
          // No templates directory, skip
        }
      }
    }

    // Handle IDE-specific configurations if needed
    if (installedIDEs && installedIDEs.length > 0) {
      logger.log(`Configuring SDA for IDEs: ${installedIDEs.join(', ')}`);

      // Add any IDE-specific SDA configurations here
      for (const ide of installedIDEs) {
        await configureForIDE(ide, projectRoot, config, logger);
      }
    }

    logger.log('✓ SDA Module installation complete');
    return true;
  } catch (error) {
    logger.error(`Error installing SDA module: ${error.message}`);
    return false;
  }
}

/**
 * Configure SDA module for specific IDE
 * @private
 */
async function configureForIDE(ide) {
  // Add IDE-specific configurations here
  switch (ide) {
    case 'claude-code': {
      // Claude Code specific SDA configurations
      break;
    }
    case 'cursor': {
      // Cursor specific SDA configurations
      break;
    }
    case 'windsurf': {
      // Windsurf specific SDA configurations
      break;
    }
    // Add more IDEs as needed
    default: {
      // No specific configuration needed
      break;
    }
  }
}

module.exports = { install };
