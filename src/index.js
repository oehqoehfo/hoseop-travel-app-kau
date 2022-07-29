const express = require('express')
const app = express();
const port = 3000;
const cors =require('cors');
const request = require('request');
const words = require('./words');
require('dotenv').config();
const path = require('path');
const HttpsProxyAgent = require('https-proxy-agent');
const proxy = process.env.QUOTAGUARDSTATIC_URL;
const agent = new HttpsProxyAgent(proxy);

const apiKey=process.env.apiKey;
app.use(cors({
  origin:'http://localhost:8080',
  credentials:true
}));

//app.use(express.static(path.join(__dirname, '../dist')));
app.get('/city',(req,res)=>{
  console.log("allo allo");
  const cityname = req.query.name;
  let resArray=[];
  try{
    if(process.env.NODE_ENV==="development"){
    request({
      uri:'https://maps.googleapis.com/maps/api/place/textsearch/json',
      qs:{
        query:"point of interest in"+cityname,
        key:apiKey
      }
    },(err,request,body)=>{
      const object = JSON.parse(body);
      let photo;
      let placeObject={
        placeName:'',
        photo:'',
        id:''
      }
      for(let i=0;i<object.results.length;i++){
        if(object.results[i].photos!==undefined){
          placeObject['placeName']=words.returnWordsInEnglish(object.results[i].name);
          placeObject['photo'] =object.results[i].photos[0]['photo_reference'];
          placeObject['id']=object.results[i].place_id;
        }
        //getImageOfPlace(photo);
        resArray[i]=Object.assign({},placeObject);
      }
      res.send(resArray);
    });
    }else if(process.env.NODE_ENV==="production"){
      /*request({
        uri:'https://maps.googleapis.com/maps/api/place/textsearch/json',
        qs:{
          query:"point of interest in"+cityname,
          key:apiKey
        },
        agent:agent
      },(err,request,body)=>{
        const object = JSON.parse(body);
        let photo;
        let placeObject={
          placeName:'',
          photo:'',
          id:''
        }
        for(let i=0;i<object.results.length;i++){
          if(object.results[i].photos!==undefined){
            placeObject['placeName']=words.returnWordsInEnglish(object.results[i].name);
            placeObject['photo'] =object.results[i].photos[0]['photo_reference'];
            placeObject['id']=object.results[i].place_id;
          }
          //getImageOfPlace(photo);
          console.log(placeObject);
          resArray[i]=Object.assign({},placeObject);
        }
        res.send(resArray);
      });*/
      const options={
        proxy: process.env.QUOTAGUARDSTATIC_URL,
        url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?place of interest='+cityname+'&key='+apiKey,
        headers: {
            'User-Agent': 'node.js'
        }
      };
      request(options,function(err,request,body){
        const object = JSON.parse(body);
        let photo;
        let placeObject={
          placeName:'',
          photo:'',
          id:''
        }
        for(let i=0;i<object.results.length;i++){
          if(object.results[i].photos!==undefined){
            placeObject['placeName']=words.returnWordsInEnglish(object.results[i].name);
            placeObject['photo'] =object.results[i].photos[0]['photo_reference'];
            placeObject['id']=object.results[i].place_id;
          }
          //getImageOfPlace(photo);
          console.log(placeObject);
          resArray[i]=Object.assign({},placeObject);
        }
        res.send(resArray);
      });
    }
  }catch(e){
    console.log(e);
  }
});

app.listen(process.env.PORT||port, () => {
  console.log(`Example app  listening on port ${process.env.PORT||port}!`)
});

async function getImageOfPlace(place){
  try{
    const response = await fetch('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+place+'&key='+apiKey);
    //const json = await response.json();
    console.log(response);
  }catch(e){
    console.log(e);
  }
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/dist')));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "client/dist", "index.html"));
  });
}