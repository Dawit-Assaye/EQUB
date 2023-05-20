import { useState } from "react";

export const useFetchEqub = (user, equbId) => {
  const [equb, setEqub] = useState([]);

  
    console.log("received user", user);

    const fetchEqub = async () => {
      try {
        const response = await fetch(`/api/equb/${equbId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const equbData = await response.json();
        if (response.ok) {
          setEqub(equbData);
        }
      } catch (error) {
        console.error(error);
      }
    };

  return { equb, fetchEqub }; // Include fetchEqub function in the returned object
};
