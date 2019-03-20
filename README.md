# drupal-lists
A command-line tool for creating lists of Drupal 8 modules that you can then easily install and enable across all your projects.

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

When adding module you must first supply a label for the module. You will then be asked to provide the machine name for the drupal module. For example:
```
label: EU Cookie Compliance
machine name: eu_cookie_compliance
```

After installing module via composer, you will be asked if you would like to also enable this modules via a command of your choosing (commonly `drush en`).

### Future Features:
- [x] After modules have been installed give users the option to enable the modules with Drush.
- [x] Allow users to create their own list of modules that they commonly use.
