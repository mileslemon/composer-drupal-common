# drupal-lists
This is a command-line tool for installing common Drupal 8 modules using composer. This tool allows you to easily pick and choose which of the listed contrib modules you wish to install via composer.

### Requirements:
- [composer](https://getcomposer.org/download/)
- [node](https://nodejs.org/en/download/)

### Installation:
```
npm install -g drupal-lists 
```

### Usage:
Run the following command with the root directory of your project (the same directory as your `composer.json` file).
```
drupal-lists
```
Choose the second option to create your first list where you can then add modules to that list.

### Future Features:
- [x] After modules have been installed give users the option to enable the modules with Drush.
- [x] Allow users to create their own list of modules that they commonly use.
