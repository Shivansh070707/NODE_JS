// a71b2dedf3dfd68cb8ac6372ac4c8a6c
// https://api.openweathermap.org/data/2.5/weather?id=Rewa&appid=a71b2dedf3dfd68cb8ac6372ac4c8a6c


// https://api.openweathermap.org/data/2.5/weather?q=Rewa&appid=a71b2dedf3dfd68cb8ac6372ac4c8a6c
var requests= require('requests')
const http = require('http')
const fs= require('fs');
const homeFile= fs.readFileSync('home.html','utf-8');
const replaceVal=(tempVal,orgVal)=>{
    let temperature = tempVal.replace('{%tempVal%}',orgVal.main.temp);
    temperature = temperature.replace('{%location%}',orgVal.name)
    temperature = temperature.replace('{%Country%}',orgVal.sys.country)
    temperature = temperature.replace('{%tempMin%}',orgVal.main.temp_min)
    temperature = temperature.replace('{%tempMax%}',orgVal.main.temp_max)

    return temperature;
}

const server= http.createServer((req,res)=>{
    if(req.url=='/'){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Satna&appid=a71b2dedf3dfd68cb8ac6372ac4c8a6c').on('data',(chunk)=>{
            const objData= JSON.parse(chunk);
            const arrData=[objData]
            const realTimeData=arrData.map(val=>replaceVal(homeFile,val)).join('')
            res.write(realTimeData)
        }).on('end',(err)=>{
            if(err){
                return console.log('Connection Closed due to error');
            }
        })
       
    }
});

server.listen(8000,'127.0.0.1')