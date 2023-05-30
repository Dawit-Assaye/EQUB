import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import PayWinnerChild from "./subComponents/PayWinnerChild";

function PayWinner() {
  const { user } = useAuthContext();
  const [requests, setRequests] = useState([]);

  console.log("Reqqqqq");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/equb/winner/payment/requests", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();
        setRequests(json);
      } catch (err) {
        console.error(err);
      }
    };

    console.log("REQUEST", requests);

    if (user) {
      fetchRequests();
    }
  }, [user]);

  const handleDeleteRequest = (requestId) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== requestId)
    );
  };

  return (
    <div className="overflow">
      <table className="requests w-full table-fixed">
        <thead className="w-full">
          <tr>
            <th className=" px-2">Equb Name</th>
            <th className=" pl-4">Equber Name</th>
            <th className=" pl-4">Amount of Money</th>
            <th className=" pl-4">Current Round</th>
            <th className=" pl-40">Approval Status</th>
            <th className=" pl-44">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <PayWinnerChild {...request} onDelete={handleDeleteRequest} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PayWinner;
