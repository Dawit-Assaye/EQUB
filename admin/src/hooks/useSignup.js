import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup=()=>{
    const[error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(null)
    const {dispatch}=useAuthContext()

    const  signup=async(
    email,
    password,
    first_name,
    last_name,
    key
    )=>{

    setError(null);
        setIsLoading(true);
    
    const response=await fetch('/api/admin/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            email,
            password,
            first_name,
            last_name,
            key
            })
    })
    const json=await response.json();

    if(!response.ok){
        setIsLoading(false);
        setError(json.error)
    }
    if(response.ok){
        //save the user to local storage
        localStorage.setItem('user',JSON.stringify(json))

        //update the auth context
        dispatch({type:'LOGIN',payload:json})

        setIsLoading(false)
    }
}
return({signup,error,isLoading})
}