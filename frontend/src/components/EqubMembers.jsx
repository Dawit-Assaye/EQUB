import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";

function EqubMembers() {
  const { user } = useAuthContext();
  const { equbId } = useParams();
  const [equb, setEqub] = useState([]);
  const [members, setMembers] = useState([]);

  // Fetch equb data
  useEffect(() => {
    const fetchEqub = async () => {
      try {
        const response = await fetch(`/api/equb/${equbId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const equbData = await response.json();
        if (response.ok && equb.length === 0) {
          setEqub(equbData);
          setMembers(equbData.members);
          console.log(equbData.members)
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (equb.length === 0) {
      fetchEqub();
    }
  }, [equb, user, equbId]);

  return (
    <div className="container mx-auto pb-20">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Equb Members - {equb.equb_name}
      </h2>
      <ul className="grid grid-cols-1 gap-4">
        {members.map((member) => (
          <li
            key={member._id}
            className="p-4 bg-white shadow-md rounded-md flex items-center justify-between"
          >
            <div>
              <p className="text-lg font-semibold">{member.name}</p>
              <p className="text-gray-600">{member.email}</p>
            </div>
            <div>
              {member.status === "winner" && (
                <span className="text-green-500 font-semibold">Winner</span>
              )}
              {member.status === "candidate" && (
                <span className="text-blue-500 font-semibold">Candidate</span>
              )}
              {member.status === "unpaid" && (
                <span className="text-red-500 font-semibold">Unpaid</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EqubMembers;
