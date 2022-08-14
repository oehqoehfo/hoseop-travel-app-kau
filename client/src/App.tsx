import React, { SyntheticEvent,useRef,useState} from "react";
import { useSelector } from "react-redux";
import { ReducerState } from "./redux/reducer";
import Result from './Result';
import { Route,Routes } from "react-router-dom";
import Form,{searchProps} from './Form';
//main application
 const App:React.FC=()=>{

    //set searchResult as state and update the state with setSearchResultState function.
    //state will be updated when user searches something
    const [searchResult,setSearchResultState]=useState<Array<Object>>([]);
    const setSearchResultFunc = (value:Array<Object>)=>{
        setSearchResultState(value);
    }
    //call reducer which we defined in reducer.ts
    const searchReducerObject = useSelector((state:ReducerState)=>state['reducers'].searchReducer);
    return (
    <section id="App">
        <Main setResult={setSearchResultFunc}/>
        { 
            //show nothing if nothing is searched and no item is viewing
            !searchReducerObject.searched&&searchReducerObject.itemViewed===false
            ?""
            :
            <Result result={searchResult} setResult={setSearchResultFunc}/>
            }
        <footer className={searchResult.length===0?"absolute":""}>
        <p>All data are received using Google Place API. 
        <br/>
        This website is not actual working website and is made just for educational purpose. 
        </p>
        </footer>
    </section>
    )
}
export default App;


const Main=({setResult}:searchProps)=>{
    const searchElementRef = useRef(null as any);
    const searchReducerObject = useSelector((state:ReducerState)=>state['reducers'].searchReducer);
    return(
        <section className="text-center absoluteCenter">
        {!searchReducerObject.searched&&!searchReducerObject.itemViewed
            ?
            <div>
                <h1 className="text-white text-lg uppercase mb-5">Wanna travel somewhere?</h1>
                {/*Form element */}
                <Form setResult={setResult}/>
            </div>
            :
            null
        }
        </section>
    )
}

