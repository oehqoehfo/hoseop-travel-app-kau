const express = require('express')
const app = express();
const port = 3000;
const cors =require('cors');
const request = require('request');
const words = require('./words');
const routes = require('./routes');
require('dotenv').config();
const path = require('path');
const HttpsProxyAgent = require('https-proxy-agent');
const proxy = process.env.QUOTAGUARDSTATIC_URL;
const agent = new HttpsProxyAgent(proxy);

const helmet = require("helmet");
app.use(helmet.frameguard("deny"));
const apiKey=process.env.apiKey;
app.use(cors({
  origin: process.env.NODE_ENV==="development"?"http://localhost:8080":"https://travel-app-kau.herokuapp.com/",
  credentials:true
}));


//app.use(express.static(path.join(__dirname, '../dist')));
app.use(routes);
app.get('/item',(req,res)=>{
  const itemID = req.query.id;
  const itemObject={
    name:"",
    address:"",
    opening_hours:[],
    reviews:[],
    photoRef:''
  }
  try{
    const options={
      proxy:process.env.FIXIE_URL,
      url:'https://maps.googleapis.com/maps/api/place/details/json?place_id='+itemID+'&key='+apiKey+'&language=en',
      headers:{
        'User-Agent':'node.js'
      }
    }
    request(options,(err,req,body)=>{
      const object = JSON.parse(body);
      const result = object.result;
      itemObject.name=object.result.name;
      itemObject.address=loopAddress(result.address_components);
      if(result.opening_hours){
        for(let i=0;i<result.opening_hours.weekday_text.length;i++){
          itemObject.opening_hours.push(result.opening_hours.weekday_text[i]);
        }
      }
      const englishReviews = getOnlyEnglishReviews(result.reviews);
      itemObject.reviews=sortReviewsByRating(englishReviews);
      itemObject.photoRef=result.photos[0].photo_reference;
      res.send(itemObject);
    });

  }catch(e){
    console.log(e);
  }
});
const loopAddress=(addressComponent)=>{
  let address='';
  for(let i=0;i<addressComponent.length;i++){
    address+=addressComponent[i].long_name+" ";
  }
  return address;
}
const getOnlyEnglishReviews=(reviews)=>{
  let newReviews=[];
  for(let i=0;i<reviews.length;i++){
    if(reviews[i].language==="en"){
      newReviews.push(reviews[i]);
    }
  }
  return newReviews;
}
const sortReviewsByRating=(reviews)=>{
  return reviews;
}
app.listen(process.env.PORT||port, () => {
  console.log(`Example app  listening on port ${process.env.PORT||port}!`)
});



