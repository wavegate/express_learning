import { createContext, useReducer } from "react";

export const AppContext = createContext();

export const appReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR":
      return {
        objects: null,
        todos: null,
        users: null,
        current_user: null,
      };
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
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "CREATE_TODO":
      if (state.todos) {
        return { ...state, todos: [action.payload, ...state.todos] };
      } else {
        return { ...state, todos: [action.payload] };
      }
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload._id),
      };
    case "UPDATE_TODO":
      const todo = state.todos.filter(
        (todo) => todo._id === action.payload._id
      )[0];
      Object.assign(todo, action.payload);
      return { ...state, todos: state.todos };
    case "SET_THREADS":
      return { ...state, threads: action.payload };
    case "CREATE_THREAD":
      if (state.threads) {
        return { ...state, threads: [action.payload, ...state.threads] };
      } else {
        return { ...state, threads: [action.payload] };
      }
    case "DELETE_THREAD":
      return {
        ...state,
        threads: state.threads.filter(
          (thread) => thread._id !== action.payload._id
        ),
      };
    case "UPDATE_THREAD":
      const thread = state.threads.filter(
        (thread) => thread._id === action.payload._id
      )[0];
      Object.assign(thread, action.payload);
      return { ...state, threads: state.threads };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_CURRENT_USER":
      return { ...state, current_user: action.payload };
    default:
      return state;
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    objects: null,
    todos: null,
    users: null,
    current_user: null,
    threads: null,
  });
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
