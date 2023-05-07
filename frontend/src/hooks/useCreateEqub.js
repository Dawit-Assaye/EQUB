import { useState } from "react";

export const useCreateEqub = () => {
    const[error,setError]=useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [message, setMessage] = useState(null)
    
    const createEqub = async (equb_name, equb_type, equb_amount, equb_round) => {
        setError(null);
        setIsLoading(true);
       
        const response = await fetch('/api/equber/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                equb_name,
                equb_type,
                equb_amount,
                equb_round
            })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error)
        }
        if (response.ok) {
            setIsLoading(false)
            setMessage(json.message)
        }
    }
return{createEqub,error,isLoading,message}
}