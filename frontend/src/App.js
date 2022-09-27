import { Route, Routes, Navigate } from "react-router-dom";
import "./scss_modules/App.scss";
import CssBaseline from "@mui/material/CssBaseline";

// local components
import Syllabus from "./components/Syllabus.js";
import Lectures from "./components/Lectures.js";
import Profile from "./components/Profile.js";
import Calendar from "./components/Calendar.js";
import Todo from "./components/Todo.js";
import LiveClass from "./components/LiveClass.js";
import Sidebar from "./components/Sidebar.js";
import Navbar from "./components/Navbar.js";
import Members from "./components/Members.js";
import Register from "./components/Register.js";

import { BrowserRouter } from "react-router-dom";

import Login from "./components/Login.js";
import useAuthContext from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <Sidebar />
        <div className="main">
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
              }
            ></Route>
            <Route
              path="/dashboard"
              element={user ? <Syllabus /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/live_class"
              element={user ? <LiveClass /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/syllabus"
              element={user ? <Syllabus /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/lectures/*"
              element={user ? <Lectures /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/profile/:id/*"
              element={user ? <Profile /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/members"
              element={user ? <Members /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/calendar"
              element={user ? <Calendar /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/todo"
              element={user ? <Todo /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/members" />}
            ></Route>
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            ></Route>
            {/* <Route
              path="/register"
              element={!user ? <RegisterForm /> : <Navigate to="/" />}
            />
            <Route path="*" element={<Error />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
