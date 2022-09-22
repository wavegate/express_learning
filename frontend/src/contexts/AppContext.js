import { createContext, useReducer } from "react";

export const AppContext = createContext();

export const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_OBJECTS":
      return {
        objects: action.payload,
      };
    case "CREATE_OBJECT":
      if (state.objects) {
        return {
          objects: [action.payload, ...state.objects],
        };
      } else {
        return {
          objects: [action.payload],
        };
      }
    case "DELETE_OBJECT":
      return {
        objects: state.objects.filter(
          (object) => object._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    objects: null,
  });
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
