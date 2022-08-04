import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeSearch,viewItem } from './redux/action_functions';
const Item= ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(removeSearch());
        dispatch(viewItem());
    },[]);
    return(
        <div>
            Hello
        </div>
    )
}
export default Item;