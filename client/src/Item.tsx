import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeSearch,viewItem } from './redux/action_functions';
const Item= ()=>{
    const dispatch = useDispatch();
    const [itemData,setItemDataState]=useState<Object>({});
    useEffect(()=>{
        dispatch(removeSearch());
        dispatch(viewItem());
        getItemData();
    },[]);
    const setItemDataStateFunc = (data:Object)=>{
        setItemDataState(data);
    }
    const getItemData=()=>{
        const urlSplitArray = window.location.href.split("/");
        const itemID = urlSplitArray[urlSplitArray.length-1];
        fetch("//localhost:3000/item?id="+itemID,{
            method:'GET',
            credentials:'include',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then((data:any)=>{
            return data.json();
        }).then((data:JSON)=>{
            setItemDataStateFunc(data);
        });
    }
    return(
        <div id="ItemDetailContainer">
            {Object.keys(itemData).length>0
            ?
            <div>
                <h1>{itemData.name}</h1>
                <div id="DetailedInformationContainer">
                    <figure className="inline-block">
                        <img src="" alt="" />
                    </figure>
                    <div className="inline-block">
                        <ul>
                            <p>Opening hours:</p>
                            {
                                itemData.opening_hours.map((item,index)=>{
                                    return <li>{item}</li>
                                })
                            }
                        </ul>
                        <p>{itemData.address}</p>
                    </div>
                </div>
                <ul id="Comments">
                    <h2>Comments</h2>
                    {
                        Object.keys(itemData.reviews).map((key,index)=>{
                            
                            return(
                            <li key={"item-"+index*index}>
                                <div className="commentDiv">
                                    <div>
                                        <div className="w-1/2 text-center">{itemData.reviews[index]['author_name']}</div>
                                        <div className="w-1/2 text-center">{itemData.reviews[index]['rating']}/5</div>
                                    </div>
                                    <div className="commentText">{itemData.reviews[index]['text']}</div>
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