import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useWithdraw = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const withdraw = async (amount, accountNumber, wallet_id) => {
    setError(null);
    console.log("Frontend received:", amount, accountNumber, wallet_id);

    try {
      const response = await fetch("/api/equber/wallet/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          amount,
          accountNumber,
          wallet_id,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setMessage(json.message);
      }
    } catch (error) {
      setError("An error occurred during the withdrawal.");
    }
  };

  return { withdraw, error, message };
};
