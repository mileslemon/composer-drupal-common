#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const files = require('./lib/files');
const lists = require('./lib/lists');
const inquirer  = require('./lib/inquirer');
const { spawn } = require('child_process');

console.log(
  chalk.blue(
    figlet.textSync('Drupal Lists', { 
      horizontalLayout: 'default'
    })
  )
);

// check if composer.json exists
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

const run = async() => {
  const answerStartOptions = await inquirer.startOptions();
  const startOption = answerStartOptions['start-option'];

  if (startOption === 'Lists') {
    // Get lists and select one
    const answerGetLists = await lists.getLists();
    
    // Select a list option
    const answerListOptions = await inquirer.listOptions(answerGetLists);
    const listOption = answerListOptions['list-option'];

    if (listOption === 'Install modules') {
      // install modules
      let continouslyInstallModules = true;
      let installList;
      while (continouslyInstallModules) {
        const answerGetModules = await lists.getListModules(answerGetLists);
        if (answerGetModules.length > 0) {
          installList = answerGetModules;
          continouslyInstallModules = false;
        }
      }

      // list out selected modules
      console.log('\nSelected modules:');
      installList.forEach(module => {
        console.log(chalk.yellow(module));
      });
      console.log(/** spacer */);

      // confirm users wants to install the above modules
      const answerConfirm = await inquirer.confirm('Are you sure you want to install the above modules?');
      if (answerConfirm['confirm-result'] === 'Yes') {
        console.log(
          chalk.blue('Installing modules...')
        );
        const installing = spawn(`composer require ${installList.join(' ')}`, {
          shell: true,
          stdio: 'inherit'
        });

        // ask the user if they would like to enable the installed modules
        installing.on('close', async () => {
          console.log(
            '\n',
            chalk.blue('Composer process complete.')
          );
          
          const answerConfirm = await inquirer.confirm('Would you like to enable the installed modules?');
          if (answerConfirm['confirm-result'] === 'Yes') {
            // list out the modules the user just installed
            // allow the user to select which modules they wish to enable
            // ask the user to input the command to enable the modules (default: drush en)
            // enable the modules with that command
            const answerEnableCommand = await inquirer.enableCommand();
            const command = answerEnableCommand['command-name'];
            
            // grab machine names from installList
            const regex = /drupal\/(.*)/
            let moduleListFiltered = [];
            installList.forEach(module => {
              const filteredModule = regex.exec(module);
              moduleListFiltered.push(filteredModule[1]);
            });

            console.log(
              chalk.blue('Enabling modules...')
            );

            const enabling = spawn(`${command} ${moduleListFiltered.join(' ')}`, {
              shell: true,
              stdio: 'inherit'
            });

            enabling.on('close', async () => {
              console.log(
                '\n',
                chalk.blue('Module enable process complete.')
              );
            });

          } else {
            console.log('oops');
            process.exit();
          }
        });
      } else {
        process.exit();
      }

    } else if (listOption === 'Add modules') {
      // add a new list module
      let continouslyAddModules = true;
      while (continouslyAddModules) {
        const answerAddModule = await lists.setListModule(answerGetLists);
        continouslyAddModules = answerAddModule;
      }
    } else if (listOption === 'Remove modules') {
      // remove modules
      let continouslyRemoveModules = true;
      while (continouslyRemoveModules) {
        const answerDeleteListModules = await lists.deleteListModules(answerGetLists);
        continouslyRemoveModules = answerDeleteListModules;
      }
      return run();
    } else if (listOption === 'Delete list') {
      // delete list
      const answerDeleteList = await lists.deleteList(answerGetLists);
      return run();
    }
  } else if (startOption === 'Create new list') {
    const answerCreateNewList = await lists.setList();
    console.log(
      chalk.green(answerCreateNewList + ': list successfully created.')
    );
    return run();
  } else if (startOption === 'Delete lists') {
    // delete lists
    let continouslyDeleteLists = true;
    while (continouslyDeleteLists) {
      const answerDeleteLists = await lists.deleteLists();
      continouslyDeleteLists = answerDeleteLists;
    }
    return run();
  }
}

run();
