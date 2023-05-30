import { useState,useEffect } from "react";
import SenderDetails from "./SenderDetails"
import { useAuthContext } from "../../hooks/useAuthContext"
// import { format } from "date-fns";
import { DateTime } from 'luxon';


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
console.log("WHATTTTT",equb_starting_date)
   // Format the starting date using date-fns
  const paymentDate = DateTime.fromISO(equb_starting_date);
  const startReadableDate = paymentDate.toLocaleString(DateTime.DATE_FULL);
  // const formattedStartDate = format(new Date(equb_starting_date), "MMMM dd, yyyy");
  
  return (
    // equb_id as a key for each equbs
    <tr className="border-2">
    <td className="px-8 py-4 whitespace-nowrap">{equb_name}</td>
    <td className="px-8 py-4 whitespace-nowrap">{equb_type}</td>
    <td className="px-8 py-4 whitespace-nowrap">{equb_amount}</td>
    <td className="px-8 py-4 whitespace-nowrap">{equb_round}</td>
    <td className="px-8 py-4 whitespace-nowrap">{startReadableDate}</td>
    <td className="px-8 py-4 whitespace-nowrap">
      <div onClick={toggleSenderDetails} className="cursor-pointer hover:text-purple-800 hover:text-lg">
        {sender ? `From ${sender.first_name} ${sender.last_name}` : 'Loading...'}
        {showSenderDetails && <SenderDetails senderId={sender_id} />}
      </div>
    </td>
    <td className={`px-6 py-4 whitespace-nowrap font-semibold ${((approvalStatus === 'Approved') && 'text-green-500') || ((approvalStatus === 'Declined') && 'text-red-500')}`}>
      {approvalStatus === 'Approved' && 'Approved ✔'}
      {approvalStatus === 'Declined' && 'Declined ✖'}
      {approvalStatus === 'Pending' && 'Pending ⌛'}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      {(approvalStatus !== 'Approved' && approvalStatus !== 'Declined') && (
        <div className="buttons flex justify-between items-center w-full px-10">
          <button onClick={() => handleApprovalStatus('Approved')} className="bg-green-500 text-white rounded-lg shadow-md shadow-black p-1 hover:bg-green-700 w-[75px]">Approve</button>
          <button onClick={() => handleApprovalStatus('Declined')} className="bg-pink-700 text-white rounded-lg shadow-md shadow-black p-1 hover:bg-pink-600 w-[75px]">Decline</button>
        </div>
      )}
      {(approvalStatus === 'Approved' || approvalStatus === 'Declined') && (
        <button
          className="bg-red-600 text-white justify-self-center rounded-lg shadow-md shadow-black p-1 hover:bg-red-700 w-[75px]"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </td>
  </tr>
  
  );
}

export default EqubJoinRequest;
