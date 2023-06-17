import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import EqubsSingle from "./subComponents/EqubsSingle.jsx";

function Equbs() {
  const { user } = useAuthContext();
  const [equbs, setEqubs] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/equb/all", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();
        setEqubs(json);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) {
      fetchRequests();
    }
  }, [user]);
  

  const handleDeleteEqub = (equbId) => {
    setEqubs((prevEqubs) =>
    prevEqubs.filter((equb) => equb._id !== equbId)
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
          <th className=" pl-10">Number of Members</th>
          <th className=" pl-28">Status</th>
          <th className=" pl-28">Actions</th>
        </tr>
      </thead>
      <tbody>
        {equbs.map((equb) => (
          <tr key={equb._id} className="border-2">
            <EqubsSingle {...equb} onDelete={handleDeleteEqub} />
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
}

export default Equbs;