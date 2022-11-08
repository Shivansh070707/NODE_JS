const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
const yargs = require('yargs');
const notesApp = require('./src/notesapp')
//customise yargs command
yargs.version('1.0.0')
//adding yargs command
yargs.command({
    command:'add',
    describe:'Add a new note',
    builder:{
        title:{
            describe:'Add Note Title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:"Add note body",
            demandOption:true

        }
    },
    handler:(argv)=>{
       console.log(chalk.magenta('------------ Adding a new note ------------'));
      let author='Shivansh'
      notesApp.fileData(author,argv.title,argv.body)
       console.log(chalk.magenta('------------ Adding Data Complete ------------'));
    }
})

//create remove command
yargs.command({
    command:'remove',
    describe:"Remove a note",
    builder:{
        title:{
            describe:'Remove note title',
            demandOption:true,
            type:'string'
        }
    },
    handler:(argv)=>{
        console.log(chalk.magenta('------------ Remove the note ------------'));
        notesApp.removeNote(argv.title)
        console.log(chalk.magenta('------------ Removed note ------------'));

    }
})
//creating list command
yargs.command({
    command:'list',
    describe:'list a node',
    handler:(argv)=>{
        console.log(chalk.magenta('------------ List of Notes ------------'));
       notesApp.notesList()
        console.log(chalk.magenta('------------ List of Note Completed------------'));
    }
})
yargs.command({
    command:'read',
    describe:'read a list',
    builder:{
        title:{
            describe:'Add note title',
            demandOption:true,
            type:'string'
        }
    },
    handler:(argv)=>{
        console.log(chalk.magenta('------------ Reading a List ------------'));
        notesApp.readNote(argv.title)
        console.log(chalk.magenta('------------ Reading complete------------'));
    }
})

yargs.parse()