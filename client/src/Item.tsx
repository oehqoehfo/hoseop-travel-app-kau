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
        <div>
            {Object.keys(itemData).length>0
            ?
            <div>
                <p>{itemData.name}</p>
                <p>{itemData.address}</p>
                <p>{itemData.opening_hours}</p>
                <ul>
                    {
                        Object.keys(itemData.reviews).map((key,index)=>{
                            
                            return(
                            <li key={"item-"+index*index}>
                                <div>
                                    <div>
                                        <div>{itemData.reviews[index]['author_name']}</div>
                                        <div>{itemData.reviews[index]['rating']}</div>
                                    </div>
                                    <div>{itemData.reviews[index]['text']}</div>
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