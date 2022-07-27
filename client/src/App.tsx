import React, { SyntheticEvent,useRef,useState } from "react";
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
    
    return (
    <section id="App">
        <Main setResult={setSearchResultFunc}/>
        {
            searchResult.length===0
            ?""
            :
            <Result result={searchResult}/>
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
    
    return(
        <section className="text-center absoluteCenter">
            <h1 className="text-white text-lg uppercase mb-5">Wanna travel somewhere?</h1>
            <Form setResult={setResult}/>
        </section>
    )
}

