import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext"

function EqubSlides(props) {
  const{user}=useAuthContext()
  const [joinRequestSent, setJoinRequestSent] = useState(false);

  const handleJoin = async () => {
    if (joinRequestSent) return; // Prevent multiple requests
    
    try {
      // Perform the join request API call here
      const response = await fetch("/api/equb/requests/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          equb_id: props._id, // Pass the equb ID to the API
          equb_name:props.equb_name,
          equb_type:props.type,
          equb_amount:props.amount,
          equb_round:props.max_round,
          equb_starting_date:props.starting_date
        }),
      });
      if (response.ok) {
        setJoinRequestSent(true);
        // Handle success response if needed
      } else {
        // Handle error response if needed
      }
    } catch (error) {
      // Handle any network or request error
      console.error(error);
    }
  };
  return (
    // equb_id as a key for each equbs
    <div className="equb-slide shadow-md  shadow-slate-600 w-[370px] h-[220px] rounded-sm flex p-3 items-center justify-between relative bg-white">
      <img src={props.img} alt="Equb" className="w-[170px] h-[170px] rounded-full" />
      <div className="equb-description p-1 ">
        <h3 className="equb-name text-green-400 font-semibold">{props.equb_name}</h3>
        <p className="equb-type m-0 text-gray-500">{props.type}</p>
        <p className="equb-amount m-0">ETB {props.amount} per person</p>
        <p className="equb-round m-0">max {props.max_round} round</p>
        <p className="equb-strting-date m-0">starts at {props.starting_date}</p>
        <button onClick={handleJoin} className="absolute bg-green-500 text-white rounded-lg shadow-md shadow-black p-1 hover:bg-green-700 w-[60px] bottom-[10px]">Join</button>
      </div>
    </div>
  );
}

export default EqubSlides;
