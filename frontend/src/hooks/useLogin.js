import { useState } from "react";
import useAuthContext from "./useAuthContext.js";

const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const login = async (email, password) => {
    setIsLoading(true);
    setError();
    const response = await fetch(
      `https://argos-ed-tech.herokuapp.com/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "LOGIN", payload: data });
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      setError(data.error);
      return data.error;
    }
  };
  return { login, isLoading, error };
};

export default useLogin;
