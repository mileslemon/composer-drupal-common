const inquirer = require('inquirer');
const modulesList = require('./modules-list');

module.exports = {
  selectModules: () => {
    // sort modules in alphabetical order
    modulesList.modules.sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
    
    const questions = [
      {
        type: 'checkbox',
        message: 'Please select the modules you would like to install:',
        name: 'selected-modules',
        choices: modulesList.modules
      }
    ];
    return inquirer.prompt(questions);
  },
  installModules: () => {
    const questions = [
      {
        type: 'list',
        message: 'Would you like to install these modules?',
        name: 'install-modules',
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
  }
}