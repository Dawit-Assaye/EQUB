import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"

export const useCreateEqub = () => {
    const [error, setError] = useState(null)
    const {user}=useAuthContext()
    const [message, setMessage] = useState(null)
    // const [isLoading, setIsLoading] = useState(null)
    
    const createEqub = async (equb_name, equb_type, equb_amount, equb_round,equb_starting_date) => {
        setError(null);
        // setIsLoading(true);
       
        const response = await fetch('/api/equb/requests/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                equb_name,
                equb_type,
                equb_amount,
                equb_round,
                equb_starting_date
            })
        })
        const json = await response.json()

        if (!response.ok) {
            // setIsLoading(false);
            setError(json.error)
        }
        if (response.ok) {
            // setIsLoading(false)
            setMessage(json.message)
        }
    }
return{createEqub,error,message}
}