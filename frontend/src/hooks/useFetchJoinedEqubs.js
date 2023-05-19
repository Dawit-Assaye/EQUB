import { useState } from "react";

export const useFetchJoinedEqubs = (user) => {
  const [joinedEqubs, setJoinedEqubs] = useState([]);

  const fetchJoinedEqubs = async () => {
    try {
      const response = await fetch("/api/equb/joined", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
        const equbsData = await response.json();
        if (response.ok) {
            setJoinedEqubs(equbsData);
        }
    } catch (error) {
      console.error(error);
    }
  };

  return { joinedEqubs, fetchJoinedEqubs };
};
