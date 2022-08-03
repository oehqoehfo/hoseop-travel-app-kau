import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeSearch } from './redux/action_functions';
const Item = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(removeSearch());
    },[]);
    return(
        <div></div>
    )
}
export default Item;