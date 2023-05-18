import { useState,useEffect } from "react";
import SenderDetails from "./SenderDetails"
import { useAuthContext } from "../../hooks/useAuthContext"


function EqubJoinRequest(props) {
  const { equb_name, equb_type, equb_amount, equb_round, equb_starting_date, sender_id,request_status,equb_id } = props;
  const { user } = useAuthContext();
  const [showSenderDetails, setShowSenderDetails] = useState(false);
  const [sender, setSender] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState(request_status);


  
  // geting senders information 
  useEffect(() => {
    const fetchSender = async () => {
      try {
        const response = await fetch(`/api/equber/${sender_id}`);
        const json = await response.json();
        setSender(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSender();
  }, [sender_id]);
  
  //showing sender detailed information
  const toggleSenderDetails = () => {
    setShowSenderDetails(!showSenderDetails);
  };

  // handeling onclicks of the buttons

  // Handle request deletion
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/equb/requests/${props._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      // Perform any necessary cleanup or state updates after successful deletion
         // If the request is deleted successfully, remove it from the UI
         props.onDelete(props._id);
    } catch (err) {
      console.error(err);
    }
  };

//handle approve and decline buttons
  const handleApprovalStatus = async (status) => {

// updating status of the request to approved in the database and retrieve it and displaying 

    try {

   // updating status of the request to approved in the database
   const updatedResponse = await fetch(`/api/equb/requests/join/${props._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      request_status: status,
    }),
   });
      
      const updatedJson = await updatedResponse.json();
      console.log(updatedJson);
      console.log(props._id)
      
  if (!updatedResponse.ok) {
    throw new Error('Failed to update request status');
      }
      
      setApprovalStatus(status);
      console.log("here is equb Id", equb_id)
      
      console.log("here is senser Id", sender_id)

      // Add sender as a member of the equb

        const addMemberResponse = await fetch(`/api/equb/add/members`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            member_id: sender_id,
            equb_id:equb_id
          }),
        });
  
        if (!addMemberResponse.ok) {
          throw new Error("Failed to add member to equb");
        }


      // //creating equb
      // const response = await fetch("/api/equb/create", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${user.token}`,
      //   },
      //   body: JSON.stringify({
      //     equb_name,
      //     type: equb_type,
      //     amount: equb_amount,
      //     max_round: equb_round,
      //     starting_date: equb_starting_date,
      //     sender_id,
      //   }),
      // });
      // const json = await response.json();
      
      // // if (response.ok) {
      // //   setApproved(true);
      // // }

    } catch (err) {
      console.error(err);
    }
  };

  
  return (
    // equb_id as a key for each equbs
    <div className={`request shadow-md  shadow-slate-600 w-[370px] rounded-sm flex flex-col p-3 items-start relative ${showSenderDetails ? 'h-auto' : 'h-[230px] overflow-hidden'}`}>
        <h3 className="title text-purple-700 font-semibold"> Equb Joining Request</h3>
        <p className="equb-name m-0 ">Name {equb_name}</p>
      <div className="equb-type m-0 flex gap-1">Type <p className="text-gray-500">{equb_type}</p></div>
      <p className="equb-amount m-0">Amount {equb_amount}</p>
      <p className="equb-round m-0">Round {equb_round}</p>
      <p className="equb-starting-data m-0">Starting date {equb_starting_date}</p>
      
      <div onClick={toggleSenderDetails} className="sender-details cursor-pointer hover:text-purple-800 hover:text-lg " >
      <p className="equb-sender m-0 font-semibold text-purple-900">{sender ? `From ${sender.first_name} ${sender.last_name}` : 'Loading...'}</p>
        {showSenderDetails && <SenderDetails senderId={sender_id} />}
      </div>
      <p className={`absolute right-[20px] font-semibold ${((approvalStatus==='Approved')&& 'text-green-500')||((approvalStatus==='Declined')&&'text-red-500')}`}  >
  {approvalStatus === 'Approved' && 'Approved ✔'}
  {approvalStatus === 'Declined' && 'Declined ✖'}
  {approvalStatus === 'Pending' && 'Pending ⌛'}
      </p>
      
      {(approvalStatus !== 'Approved' && approvalStatus !== 'Declined') && (
        <div className="buttons flex justify-between items-center w-full px-10">
          <button  onClick={() => handleApprovalStatus('Approved')} className=" bg-green-500 text-white rounded-lg shadow-md shadow-black p-1 hover:bg-green-700 w-[75px] bottom-[10px]">Approve</button>
          <button  onClick={() => handleApprovalStatus('Declined')} className=" bg-pink-700 text-white rounded-lg shadow-md shadow-black p-1 hover:bg-pink-600 w-[75px] bottom-[10px]">Decline</button>
        </div>
      )}
      {(approvalStatus === 'Approved' || approvalStatus === 'Declined') && (
        <button
          className="bg-red-600 text-white justify-self-center rounded-lg shadow-md shadow-black p-1 hover:bg-red-700 w-[75px] bottom-[10px]"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default EqubJoinRequest;
