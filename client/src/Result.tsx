import React from 'react';
import Form,{searchProps} from './Form';
import {Link,Route,Routes} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReducerState } from './redux/reducer';
import Item from './Item';
import { $CombinedState } from 'redux';
interface resultProps{
    result:Array<Object>,
    setResult:(value: Array<Object>) => void
}
//const apiKey = process.env.REACT_APP_google_api_key;
const apiKey=process.env.apiKey;
const Result=({result,setResult}:resultProps)=>{
    const searchReducerObject = useSelector((state:ReducerState)=>state['reducers'].searchReducer);
    console.log("get redux state");
    console.log(searchReducerObject);
    return(
        <div id="Result" className="w-100">
            <div className="w-100">
                <Form setResult={setResult}/>
            </div>
            {searchReducerObject.searched
                ?
                result.length>0 
                    ?
                    <div className="flex justify-around">{
                        result.map((item,index)=>{
                            //return /<div className="card" key={"item-"+item+index}>{item[1]['placeName']}</div>
                            return (
                                <Link key={index} to={`/place/${item[1].id}`} className="item w-1/4 ">
                                    <div key={"item-"+item+index} className="text-center text-white">
                                        <div>
                                            {<img src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference="+item[1]['photo']+"&key="+apiKey}/>}
                                        </div>    
                                        <div>
                                            <p>{item[1]['placeName']}</p>
                                        </div>
                                    </div> 
                                </Link>
                            )   
                        })
                        
                    }</div>
                    
                :
                    <div>
                        <p>Unfortunately nothing is found :( {result.length}</p>    
                    </div>
                :
                null
            }
            <Routes>
                <Route path="/place/:id" element={<Item/>}></Route>
            </Routes>
        </div>
    )
}
export default Result;