import React from 'react';
interface resultProps{
    result:Array<Object>
}
//const apiKey = process.env.REACT_APP_google_api_key;
const apiKey=process.env.apiKey;
const Result=({result}:resultProps)=>{
    return(
        <div id="Result" className="flex w-100 justify-around">
            {result.length>0 
                ?
                result.map((item,index)=>{
                    //return /<div className="card" key={"item-"+item+index}>{item[1]['placeName']}</div>
                    return (
                        <div key={"item-"+item+index} className="item w-1/4 text-center text-white">
                            <div>
                                {<img src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference="+item[1]['photo']+"&key="+apiKey}/>}
                            </div>    
                            <div>
                                <p>{item[1]['placeName']}</p>
                            </div>
                        </div> 
                    )   
                })
                :
                <div>
                    <p>Unfortunately nothing is found :( {result.length}</p>    
                </div>
            }
        </div>
    )
}
export default Result;