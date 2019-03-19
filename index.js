#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const files = require('./lib/files');
const inquirer  = require('./lib/inquirer');
const { spawn } = require('child_process');

console.log(
  chalk.blue(
    figlet.textSync('Drupal 8 Modules', { horizontalLayout: 'full' })
  )
);

// check if composer.json exists:
if (files.fileExists('composer.json')) {
  console.log(
    '\n',
    chalk.green('composer.json found!'),
    '\n'
  );
} else {
  console.log(
    '\n',
    chalk.red('composer.json not found.'),
    '\n'
  );
  process.exit();
}

const run = async () => {
  const answerSelectedModules = await inquirer.selectModules();
  const modules = answerSelectedModules['selected-modules'];

  if (modules.length) {
    console.log('\nSelected modules:');
    modules.forEach(module => {
      console.log(chalk.blue(module));
    });
    console.log('\n');

    const answerInstallModules = await inquirer.installModules();
    const install = answerInstallModules['install-modules'];

    if (install === 'Yes') {
      console.log(chalk.blue('Installing modules...'));
      const installing = spawn(`composer require ${modules.join(' ')}`, {
        shell: true,
        stdio: 'inherit'
      });
    } else {
      process.exit();
    } 
  } else {
    console.log(
      '\n',
      chalk.yellow('No modules selected.'),
      '\n'
    );
    process.exit();
  }
}

run();