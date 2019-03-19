# composer-drupal-common
This is a command-line tool for installing common Drupal 8 modules using composer. This tool allows you to easily pick and choose which of the listed contrib modules you wish to install via composer.

### Requirements:
- [composer](https://getcomposer.org/download/)
- [node](https://nodejs.org/en/download/)

### Installation:
```
npm install -g composer-drupal-common 
```

### Usage:
Run the following command with the root directory of your project (the same directory as your `composer.json` file).
```
composer-drupal-common
```
You will then be presented with a list of modules to install, use the arrow keys to navigate the list and spacebar to select/deselect modules.

### Future Features:
- [ ] After modules have been installed give users the option to enable the modules with Drush.
- [ ] Allow users to create their own list of modules that they commonly use.
