import useAuthContext from "./useAuthContext.js";
import useAppContext from "./useAppContext.js";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: appDispatch } = useAppContext();

  const logout = () => {
    localStorage.setItem("user", null);
    dispatch({ type: "LOGOUT" });
    appDispatch({ type: "CLEAR" });
  };
  return { logout };
};

export default useLogout;
