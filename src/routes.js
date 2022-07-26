const express = require('express');
const router = express.Router();
const apiKey=process.env.apiKey;
console.log(apiKey);
const request = require('request');
const words = require('./words');
router.get('/city',(req,res)=>{
    const cityname = req.query.name;
    let resArray=[];
    try{
      if(process.env.NODE_ENV!=="production"){
      request({
        uri:'https://maps.googleapis.com/maps/api/place/textsearch/json',
        qs:{
          query:"point of interest in"+cityname,
          key:process.env.apiKey
        }
      },(err,request,body)=>{
        console.log(body);
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
          resArray[i]=Object.assign({},placeObject);
        }
        res.send(resArray);
      });
      }else{
  
        const options={
          proxy:process.env.FIXIE_URL,
          url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=point of interest='+cityname+'&key='+apiKey,
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

module.exports=router;
