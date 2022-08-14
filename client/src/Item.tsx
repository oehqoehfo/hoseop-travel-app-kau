import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeSearch,viewItem } from './redux/action_functions';
const serverURL = process.env.serverURL;

//define types of state object 
interface ItemDetail{
    name:string,
    opening_hours:string[],
    address:string,
    reviews:string[],
    photoRef:string
}

//set different apikey value based on environment. 
let apiKey:String="";
if(process.env.NODE_ENV==="production"){
    apiKey=process.env.clientApiKey!;
}else{
    apiKey=process.env.apiKey!;
}
const Item= ()=>{
    const dispatch = useDispatch();
    let loopNumber:number=0;
    const [itemData,setItemDataState]=useState<ItemDetail>({
        name:'',
        opening_hours:[],
        address:'',
        reviews:[],
        photoRef:''
    });
    useEffect(()=>{
        //trigger actions
        dispatch(removeSearch());
        dispatch(viewItem());

        //run this function to send request to server and retrieve data
        getItemData();
    },[]);
    const setItemDataStateFunc = (data:ItemDetail)=>{
        setItemDataState(data);
    }
    const getItemData=()=>{
        const urlSplitArray = window.location.href.split("/");
        const itemID = urlSplitArray[urlSplitArray.length-1];
        fetch(process.env.serverURL+"/item?id="+itemID,{
            method:'GET',
            credentials:'include',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then((data:any)=>{
            return data.json();
        }).then((data:ItemDetail)=>{
            //when server returned valid data, then set the data as state. Component will be loaded again
            setItemDataStateFunc(data);
        });
    }
    return(
        <div id="ItemDetailContainer">
            {/*Loop through the object state and render HTML*/}
            {Object.keys(itemData).length>0
            ?
            <div>
                <h1>{itemData?.name}</h1>
                <div id="DetailedInformationContainer">
                    <figure className="inline-block placeImage">
                        {
                            itemData.photoRef
                            ?<img src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference="+itemData.photoRef+"&key="+apiKey}/>
                            :null
                        }
                    </figure>
                    <div className="inline-block">
                        <div className="table w-full">
                            <ul className="table-cell">
                                <p>Opening hours:</p>
                                {
                                    itemData?.opening_hours.length>0
                                        ?
                                        itemData?.opening_hours.map((item,index)=>{
                                            return <li key={index}>{item}</li>
                                        })
                                        :
                                    <p>No opening hours information provided</p>
                                }
                            </ul>
                        </div>
                        <p>Adress: {itemData?.address}</p>
                    </div>
                </div>
                <ul id="Comments">
                    <h2>Comments</h2>
                    {
                        //oop through array reviews inside itemData and render data as HTML
                        Object.keys(itemData.reviews).map((key,index)=>{
                            loopNumber=loopNumber+1;
                            return(
                            <li key={"item-"+loopNumber}>
                                <div className="commentDiv">
                                    <div>
                                        <div className="w-1/2 text-center">{itemData?.reviews[index]['author_name' as '0']}</div>
                                        <div className="w-1/2 text-center">{itemData?.reviews[index]['rating' as '0']}/5</div>
                                    </div>
                                    <div className="commentText">{itemData?.reviews[index]['text' as '0']}</div>
                                </div>
                            </li>
                            )
                        })
                    }
                </ul>
                </div>
            : 
            null }
        </div>
    )
}
export default Item;