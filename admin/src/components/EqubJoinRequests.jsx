import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import EqubJoinRequest from "./subComponents/EqubJoinRequest";

function EqubJoinRequests() {
  const { user } = useAuthContext();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/equb/requests/join/all", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();
        setRequests(json);
      } catch (err) {
        console.error(err);
      }
    };
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
          <th className=" pl-4 ">Equb Type</th>
          <th className=" pl-4">Equb Amount</th>
          <th className=" pl-0">Equb Round</th>
          <th className=" pl-0">Equb Starting Date</th>
          <th className=" pl-10">Sender</th>
          <th className=" pl-40">Approval Status</th>
          <th className=" pl-44">Actions</th>
        </tr>
      </thead>
      <tbody>
      {requests.map((request) => (
        <tr key={request._id}>
          <EqubJoinRequest {...request} onDelete={handleDeleteRequest} />
        </tr>
      ))}
   </tbody>
    </table>
  </div>
  
  );
}

export default EqubJoinRequests;
