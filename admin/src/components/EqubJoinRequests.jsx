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
    <div className="requests grid grid-cols-2 gap-3 justify-center">
      {requests.map((request) => (
        <EqubJoinRequest key={request._id} {...request}   onDelete={handleDeleteRequest}/>
      ))}
    </div>
  );
}

export default EqubJoinRequests;
