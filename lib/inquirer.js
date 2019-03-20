const inquirer = require('inquirer');
const lists = require('./lists');

module.exports = {
  startOptions: () => {
    const questions = [
      {
        type: 'list',
        message: 'Please select an option:',
        name: 'start-option',
        choices: [
          {
            name: 'Lists'
          },
          {
            name: 'Create new list'
          },
          {
            name: 'Delete lists'
          }
        ]
      }
    ];
    return inquirer.prompt(questions);
  },
  chooseList: (lists) => {
    const questions = [
      {
        type: 'list',
        message: 'Please select the list you wish to view:',
        name: 'selected-list',
        choices: lists
      }
    ];
    return inquirer.prompt(questions);
  },
  listOptions: (listName) => {
    const questions = [
      {
        type: 'list',
        message: `${listName} options:`,
        name: 'list-option',
        choices: [
          {
            name: 'Install modules',
          },
          {
            name: 'Add modules'
          },
          {
            name: 'Remove modules'
          },
          {
            name: 'Delete list'
          }
        ]
      }
    ];
    return inquirer.prompt(questions);
  },
  addModule: () => {
    const questions = [
      {
        name: 'name',
        type: 'input',
        message: 'Please enter a module name (label):',
        validate: (value) => {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a valid module name.'
          }
        }
      },
      {
        name: 'value',
        type: 'input',
        message: 'Please enter a module machine name:',
        validate: (value) => {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a valid module machine name.'
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  removeModules: (modules) => {
    // sort modules in alphabetical order
    modules.sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
    
    const questions = [
      {
        type: 'checkbox',
        message: 'Please select the modules you would like to remove:',
        name: 'selected-modules',
        choices: modules
      }
    ];
    return inquirer.prompt(questions);
  },
  createNewList: () => {
    const questions = [
      {
        name: 'list-name',
        type: 'input',
        message: 'Please enter a list name:',
        validate: (value) => {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a list name.'
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  selectModules: (modules, message) => {
    // sort modules in alphabetical order
    modules.sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
    
    const questions = [
      {
        type: 'checkbox',
        message: message,
        name: 'selected-modules',
        choices: modules
      }
    ];
    return inquirer.prompt(questions);
  },
  selectLists: (lists) => {
    const questions = [
      {
        type: 'checkbox',
        message: 'Please select the lists you would like to remove:',
        name: 'selected-lists',
        choices: lists
      }
    ];
    return inquirer.prompt(questions);
  },
  confirm: (message) => {
    const questions = [
      {
        type: 'list',
        message: message,
        name: 'confirm-result',
        choices: [
          {
            name: 'Yes'
          },
          {
            name: 'No'
          }
        ]
      }
    ];
    return inquirer.prompt(questions);
  },
  enableCommand: () => {
    const questions = [
      {
        name: 'command-name',
        type: 'input',
        message: 'Please enter the command name you wish to use to enable the modules (example: drush en):',
        validate: (value) => {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a valid command name.'
          }
        }
      }
    ]
    return inquirer.prompt(questions);    
  }
}