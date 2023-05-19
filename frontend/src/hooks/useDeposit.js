import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useDeposit = () => {
    const { user } = useAuthContext();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

  const deposit = async (amount, accountNumber, wallet_id) => {
    setError(null);
    // setIsLoading(true);
      console.log('front recieved',amount, accountNumber, wallet_id);
      try {
          const response = await fetch("/api/equber/wallet/deposit", {
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
              // setIsLoading(false);
              setError(json.error);
          }
          if (response.ok) {
              // setIsLoading(false)
              setMessage(json.message);
          }
      } catch (error) {
          setError("An error occurred during the deposit.")
      }
  };
  return { deposit, error, message };
};
