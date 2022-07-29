import React,{SyntheticEvent,useRef} from 'react';
export interface searchProps{
    setResult:(value: Array<Object>) => void
}
const Form = ({setResult}:searchProps)=>{
    const searchElementRef = useRef(null as any);
    const search = (e:SyntheticEvent)=>{
        const searchValue = searchElementRef.current.value;
        if(typeof searchValue!=="string"){
            alert("only text allowed");
        }else{
            //validate user search input
            regexValidate(searchValue)
            ?alert("No special characters are allowed")
            //send request to server if no special character is found
            :fetch("//localhost:3000/city?name="+searchValue,{
                //:fetch(serverURL+"/city?name="+searchValue,{
                    method:'GET',
                    credentials:'include',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    }
                }).then((data:any)=>{
                    return data.json();
                }).then(data=>{
                    changeURLofPage(searchValue);
                    setResult(Object.entries(data));
                })
            

        }
        e.preventDefault();
    }
    const changeURLofPage=(value:string)=>{
        window.history.pushState("",value,`/city?name=${value}`);
    }
    const regexValidate = (value:string)=>{
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(value);
    }
    return(
        <form action="/" method="GET" onSubmit={e=>search(e)}>
            <input type="text" placeholder="SEARCH FOR CITY ex:London" ref={searchElementRef}/>
        </form>
    )
    
}
export default Form;