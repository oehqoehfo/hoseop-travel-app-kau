import React, { SyntheticEvent,useRef,useState} from "react";
import { useSelector } from "react-redux";
import { ReducerState } from "./redux/reducer";
import Result from './Result';
import { Route,Routes } from "react-router-dom";
import Form,{searchProps} from './Form';
const serverURL = process.env.serverURL;
//main application
 const App:React.FC=()=>{
    const [searchResult,setSearchResultState]=useState<Array<Object>>([]);
    const setSearchResultFunc = (value:Array<Object>)=>{
        setSearchResultState(value);
    }
    const searchReducerObject = useSelector((state:ReducerState)=>state['reducers'].searchReducer);
    return (
    <section id="App">
        <Main setResult={setSearchResultFunc}/>
        {
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
                <Form setResult={setResult}/>
            </div>
            :
            null
        }
        </section>
    )
}

