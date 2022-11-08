const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
const yargs = require('yargs');

const fileName ='notes.json';
const filePath ='./notes.json';
const backupPath ='./backup.txt'

const fileManipulation =(data)=>{
    let _filedata=readFile()
    _filedata[`Note -${Object.keys(_filedata).length}`]=`${data}`
    _filedata= JSON.stringify(_filedata)
    writeData(_filedata)
     console.log('Data insert completed');
}

const fileData= (author,title,body)=>{
    let data ={
        title:title,
        author:author,
        body:body

    }
     data= JSON.stringify(data)
     fileManipulation(data)
}
const checkFile=()=>{
    if(fs.existsSync(filePath)){
        console.log(chalk.green('File is Present'));
    }
    else{
        console.log(chalk.red('File is Not Present'));
        createFile()
    }
}
const createFile=()=>{
    console.log(chalk.blue("creating empty file"));
    fs.writeFileSync(filePath,'{}')
}

const writeFile=(note)=>{
    console.log("writing data into file");
    fs.appendFileSync(filePath,note)
    fs.appendFileSync(filePath ,',\n')
}

const readFile=()=>{
    console.log(chalk.blue("Reading Data From file"));
    let fileData= fs.readFileSync(filePath,{
        encoding:'utf-8'
    })
    fileData=JSON.parse(fileData)
    return fileData;

}
const writeData=(data)=>{
    fs.writeFileSync(filePath,data)
}
const exportNotes=(path)=>{
    let _exportData= JSON.stringify(readFile())
    fs.readFileSync(path,_exportData)

}

const removeNote =(_title)=>{
    let _filedata=readFile()
    let removeFlag=true;
    for(let _data in _filedata){
        let tempdata = JSON.parse(_filedata[_data])
        if(tempdata.title==_title){
            removeFlag=false;
            let _backup={}
            _backup[`${_data}`]=_filedata[_data]
            backup(JSON.stringify(_backup))

            console.log(`Deleting title:${_title} from data file`);
            let date = new Date()
            let deletedData={
                title:'remove',
                description :` removed on --${date}`
            }
            _filedata[_data]=JSON.stringify(deletedData)

        }
        else if(removeFlag){
            console.log(`No data found with title -${_title}`);
            console.log('Please run list command to check note');
        }
        else{
            _filedata=JSON.stringify(_filedata)
            fs.writeFileSync(filePath,_filedata)
        }
    }

}
const backup =(_backup)=>{
    if(!fs.existsSync(backupPath)){
        fs.writeFileSync(backupPath,'')
    }
    fs.appendFileSync(backupPath,_backup)
    fs.appendFileSync(backupPath,',\n')
    console.log('Creating backup');

}

const notesList =()=>{
    let _notes=readFile()
    for(let note in _notes){
        let temp = JSON.parse(_notes[note])
        if(temp.title != 'remove'){
            console.log(`    --${temp.title}`);
        }
    }
}
const readNote=(data)=>{
    let _notes=readFile()
    for(let note in _notes){
        let temp = JSON.parse(_notes[note])
        if(temp.title ==data){
            console.log(`    --${temp.body}`);
        }
    }

}

module.exports={
    fileData:fileData,
    removeNote:removeNote,
    notesList:notesList,
    readNote:readNote
}

