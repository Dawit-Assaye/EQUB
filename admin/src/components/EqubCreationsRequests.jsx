import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import EqubRequests from "./subComponents/EqubRequests";

function EqubCreationsRequests() {
  const { user } = useAuthContext();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/equb/requests/create/all", {
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
        <EqubRequests key={request._id} {...request}   onDelete={handleDeleteRequest}/>
      ))}
    </div>
  );
}

export default EqubCreationsRequests;
