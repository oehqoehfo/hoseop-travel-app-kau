import React, { SyntheticEvent,useRef,useState } from "react";
import Result from './Result';
const serverURL = process.env.serverURL;
//main application
 const App:React.FC=()=>{
    const [searchResult,setSearchResultState]=useState<Array<Object>>([]);
    const setSearchResultFunc = (value:Array<Object>)=>{
        setSearchResultState(value);
    }
    
    return (
    <section id="App">
        <SearchPanel setResult={setSearchResultFunc}/>
        {
            searchResult.length===0
            ?""
            :<Result result={searchResult}/>}
        <footer className={searchResult.length===0?"absolute":""}>
        <p>All data are received using Google Place API. {"result: " +searchResult}
        <br/>
        This website is not actual working website and is made just for educational purpose. 
        </p>
        </footer>
    </section>
    )
}
export default App;

interface searchProps{
    setResult:(value: Array<Object>) => void
}
const SearchPanel=({setResult}:searchProps)=>{
    const searchElementRef = useRef(null as any);
    const search =(e:SyntheticEvent)=>{
        const searchValue = searchElementRef.current.value;
        if(typeof searchValue!=="string"){
            alert("only text allowed");
        }else{
            //validate user search input
            regexValidate(searchValue)
            ?alert("No special characters are allowed")
            //send request to server if no special character is found
            //:fetch("//localhost:3000/city?name="+searchValue,{
            :fetch(serverURL+"/city?name="+searchValue,{
                method:'GET',
                credentials:'include',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then((data:any)=>{
                return data.json();
            }).then(data=>{
                setResult(Object.entries(data));
            })
        }
        e.preventDefault();
    }
    const regexValidate = (value:string)=>{
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(value);
    }
    return(
        <section className="text-center absoluteCenter">
            <h1 className="text-white text-lg uppercase mb-5">Wanna travel somewhere?</h1>
            <form action="/" method="GET" onSubmit={e=>search(e)}>
                <input type="text" placeholder="SEARCH FOR CITY ex:London" ref={searchElementRef}/>
            </form>
        </section>
    )
}