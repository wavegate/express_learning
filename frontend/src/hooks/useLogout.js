import useAuthContext from "./useAuthContext.js";

const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.setItem("user", null);
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};

export default useLogout;
