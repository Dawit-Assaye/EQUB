import { useState, useEffect } from "react";
// import SenderDetails from "./SenderDetails"
import { useAuthContext } from "../../hooks/useAuthContext";

function PayWinnerChild(props) {
  const { equbId, currentRound, amountOfMoney, recipientEquberId, status } =
    props;
  const { user } = useAuthContext();
  const [showSenderDetails, setShowSenderDetails] = useState(false);
  const [equb, setEqub] = useState('');
  const [equber, setEquber] = useState(''); //may be null
  const [approvalStatus, setApprovalStatus] = useState(status);

  console.log("What is this");

  console.log(
    "here is the req info",
    equbId,
    currentRound,
    amountOfMoney,
    recipientEquberId,
    status
  );

  //getting equb info
  useEffect(() => {
    const fetchEqub = async () => {
      try {
        const response = await fetch(`/api/equb/${equbId}`,{
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();
        setEqub(json);
      } catch (error) {
        console.error(error);
      }
    };
    console.log("FETCHING");

    const fetchEquber = async () => {
      try {
        const response = await fetch(`/api/equber/${recipientEquberId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();
        setEquber(json);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEquber();
    fetchEqub();
  }, [equbId, recipientEquberId, user]);

  //showing sender detailed information
  const toggleSenderDetails = () => {
    setShowSenderDetails(!showSenderDetails);
  };

  // handeling onclicks of the buttons

  // Handle request deletion
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/equb/winner/payment/requests/${props._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

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
      const updatedResponse = await fetch(
        `/api/equb/winner/payment/requests/${props._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      const updatedJson = updatedResponse.json();
      console.log(updatedJson);
      console.log(props._id);

      if (!updatedResponse.ok) {
        throw new Error("Failed to update payment request status");
      }

      setApprovalStatus(status);

      if (status === "Approved") {
console.log("PAY WINNER HERE")

        //making payment
        const response = await fetch("/api/equb/winner/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            equbId,
            amountOfMoney,
            currentRound,
            recipientEquberId,
          }),
        });
        const json = await response.json();
        console.log("RESPONSE OK")
      }

      // if (response.ok) {
      //   setApproved(true);
      // }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // equb_id as a key for each equbs
    <tr className="border-2">
      <td className="px-8 py-4 whitespace-nowrap">{equb.equb_name}</td>
      <td className="px-8 py-4 whitespace-nowrap">
        {equber.first_name} {equber.last_name}
      </td>
      <td className="px-8 py-4 whitespace-nowrap">{amountOfMoney}</td>
      <td className="px-8 py-4 whitespace-nowrap">{currentRound}</td>
      {/* <td className="px-8 py-4 whitespace-nowrap">{status}</td> 
     <td className="px-8 py-4 whitespace-nowrap">
      <div onClick={toggleSenderDetails} className="cursor-pointer hover:text-purple-800 hover:text-lg">
        {sender ? `From ${sender.first_name} ${sender.last_name}` : 'Loading...'}
        {showSenderDetails && <SenderDetails senderId={sender_id} />}
      </div>
    </td> */}
      <td
        className={`px-6 py-4 whitespace-nowrap font-semibold ${
          (approvalStatus === "Approved" && "text-green-500") ||
          (approvalStatus === "Declined" && "text-red-500")
        }`}
      >
        {approvalStatus === "Approved" && "Approved ✔"}
        {approvalStatus === "Declined" && "Declined ✖"}
        {approvalStatus === "Pending" && "Pending ⌛"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {approvalStatus !== "Approved" && approvalStatus !== "Declined" && (
          <div className="buttons flex justify-between items-center w-full px-10">
            <button
              onClick={() => handleApprovalStatus("Approved")}
              className="bg-green-500 text-white rounded-lg shadow-md shadow-black p-1 hover:bg-green-700 w-[75px]"
            >
              Approve
            </button>
            <button
              onClick={() => handleApprovalStatus("Declined")}
              className="bg-pink-700 text-white rounded-lg shadow-md shadow-black p-1 hover:bg-pink-600 w-[75px]"
            >
              Decline
            </button>
          </div>
        )}
        {(approvalStatus === "Approved" || approvalStatus === "Declined") && (
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

export default PayWinnerChild;
