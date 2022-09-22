import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw Error("useAppContext must be used inside an AppContextProvider");
  }

  return context;
};

export default useAppContext;
