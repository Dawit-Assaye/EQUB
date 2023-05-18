import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useCreateWallet = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  // const [isLoading, setIsLoading] = useState(null)

  const createWallet = async (bankName, accountNumber, pinNumber) => {
    setError(null);
    // setIsLoading(true);

    const response = await fetch("/api/equber/wallet/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        bankName,
        accountNumber,
        pinNumber
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
  };
  return { createWallet, error, message };
};
