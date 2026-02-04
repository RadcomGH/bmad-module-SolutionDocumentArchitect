const fs = require('fs-extra');
const path = require('node:path');
const chalk = require('chalk');

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
    logger.log(chalk.blue('📝 Installing SDA Module...'));

    // Create output directory if configured
    if (config['output_folder']) {
      // Strip {project-root}/ prefix if present
      const outputConfig = config['output_folder'].replace('{project-root}/', '');
      const outputPath = path.join(projectRoot, outputConfig);
      if (!(await fs.pathExists(outputPath))) {
        logger.log(chalk.yellow(`Creating SDA output directory: ${outputConfig}`));
        await fs.ensureDir(outputPath);

        // Add any default SDA templates or assets here
        const templatesSource = path.join(__dirname, 'assets');
        const templateFiles = await fs.readdir(templatesSource).catch(() => []);

        for (const file of templateFiles) {
          const source = path.join(templatesSource, file);
          const dest = path.join(outputPath, file);

          if (!(await fs.pathExists(dest))) {
            await fs.copy(source, dest);
            logger.log(chalk.green(`✓ Added ${file}`));
          }
        }
      }
    }

    // Handle IDE-specific configurations if needed
    if (installedIDEs && installedIDEs.length > 0) {
      logger.log(chalk.cyan(`Configuring SDA for IDEs: ${installedIDEs.join(', ')}`));

      // Add any IDE-specific SDA configurations here
      for (const ide of installedIDEs) {
        await configureForIDE(ide, projectRoot, config, logger);
      }
    }

    logger.log(chalk.green('✓ SDA Module installation complete'));
    return true;
  } catch (error) {
    logger.error(chalk.red(`Error installing SDA module: ${error.message}`));
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
