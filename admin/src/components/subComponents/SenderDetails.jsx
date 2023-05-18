import { useState, useEffect } from "react";

function SenderDetails({ senderId }) {
  const [sender, setSender] = useState(null);

  useEffect(() => {
    const fetchSender = async () => {
      try {
        const response = await fetch(`/api/equber/${senderId}`);
        const json = await response.json();
        setSender(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSender();
  }, [senderId]);

  if (!sender) {
    return null;
  }

  return (
    <div className="text-gray-500">
      <p>Name {sender.first_name} {sender.last_name}</p>
      <p>Age {sender.age}</p>
      <p>Job {sender.job}</p>
    </div>
  );
}

export default SenderDetails;
