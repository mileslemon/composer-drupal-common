const chalk = require('chalk');
const Configstore = require('configstore');
const pkg = require('../package.json');
const inquirer = require('./inquirer');

// create configstore
const conf = new Configstore(pkg.name);

module.exports = {
  /**
   * List Functions
   */
  getLists: async () => {
    const lists = conf.get();
    let listOfLists = []

    for (list in lists) {
      const listItem = {
        name: list
      };
      listOfLists.push(listItem);
    };

    const answerChooseList = await inquirer.chooseList(listOfLists);
    return answerChooseList['selected-list'];
  },
  getListModules: async (list) => {
    const modulesList = conf.get(list);
    const answerSelectModules = await inquirer.selectModules(modulesList, 'Please select the modules you would like to install:');

    const selectedModules = answerSelectModules['selected-modules']

    if (selectedModules.length > 0) {
      return selectedModules;
    } else {
      console.log(
        chalk.red('Please select a module(s).')
      );
      return selectedModules;
    }
  },
  setListModule: async (list) => {
    const answerAddModule = await inquirer.addModule();
    const moduleList = conf.get(list);    

    // check if module is already in list
    if (!moduleList.find(module => module.value === answerAddModule.value)) {
      // add drupal prefix to module value
      answerAddModule.value = 'drupal/' + answerAddModule.value;
      
      // push new module to modules list and set it
      moduleList.push(answerAddModule);
      conf.set(list, moduleList);
    
      // return to list options menu
      console.log(
        chalk.green('Module added!')
      );
      return true;
    } else {
      // recursion: if the list name is already taken.
      console.log(
        chalk.red('List already contains this module.')
      );
      return true;
    }
  },
  deleteListModules: async (list) => {
    const moduleList = conf.get(list);
    const answerRemoveModules = await inquirer.removeModules(moduleList);
    const modulesToRemove = answerRemoveModules['selected-modules'];

    if (modulesToRemove.length > 0) {
      const updatedList = moduleList.filter(module => {
        return !modulesToRemove.includes( module.value );
      });
  
      const answerConfirm = await inquirer.confirm('Are you sure you want to delete the above modules?');
      if (answerConfirm['confirm-result'] === 'Yes') {
        conf.set(list, updatedList);
        console.log(
          chalk.green('Modules successfully removed.')
        );
      }
      return false;
    } else {
      console.log(
        chalk.red('Please select a module(s).')
      );
      return true;
    }
  },
  deleteList: async (list) => {
    const answerConfirm = await inquirer.confirm('Are you sure you want to delete this list?');
    if (answerConfirm['confirm-result'] === 'Yes') {
      conf.delete(list);
      console.log(
        chalk.green('List successfully deleted.')
      );
    }
  },

  /**
   * Create List Functions
   */
  setList: async () => {
    const answerCreateNewList = await inquirer.createNewList();
    const listName = answerCreateNewList['list-name'];
    
    // check if list with that name doesn't already exist
    const lists = conf.get();
    if (typeof(lists[listName]) === "undefined") {
      conf.set(listName, []);
      return listName;
    } else {
      // recursion: if the list name is already taken.
      console.log(
        chalk.red('List name already in use.')
      );
      return module.exports.setList();
    }
  },

  /**
   * Delete List Functions
   */
  deleteLists: async () => {
    // create list of current lists
    const lists = conf.get();
    let listOfLists = []
    
    for (list in lists) {
      const listItem = {
        name: list
      };
      listOfLists.push(listItem);
    };

    // ask user which lists they would like to remove
    const answerSelectLists = await inquirer.selectLists(listOfLists);
    const listsToRemove = answerSelectLists['selected-lists'];

    if (listsToRemove.length > 0) {
      // loop through list of lists to be removed and remove them
      for (let i = 0; i < listsToRemove.length; i++) {
        conf.delete(listsToRemove[i]);
      }
      console.log(
        chalk.green('Lists successfully deleted.')
      );
      return false;
    } else {
      console.log(
        chalk.red('Please select a list(s).')
      );
      return true;
    }
  }
}