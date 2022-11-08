//first step is to import module system by using require statement;
const fs= require('fs');
const chalk = require('chalk');
const validator = require('validator')
fs.writeFileSync('helloo.js','This is js file')//this function creates new file if file doesnt exists and if its exists then it will overwrite the contents.
fs.appendFileSync('helloo.js',', This appendfilesync adds new elements in same file')

console.log(chalk.magenta(validator.isEmail('shivansh@hg.com')));