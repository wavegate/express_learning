import { useState } from "react";
import useAuthContext from "./useAuthContext.js";

const useRegister = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const register = async (email, password, party) => {
    setIsLoading(true);
    setError();
    const response = await fetch(`/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password, party: party }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "LOGIN", payload: data });
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      setError(data.error);
      return false;
    }
  };
  return { register, isLoading, error };
};

export default useRegister;
