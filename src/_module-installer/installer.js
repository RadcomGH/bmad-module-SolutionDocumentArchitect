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
