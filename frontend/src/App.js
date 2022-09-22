import { Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Navbar from "./components/Navbar.js";
import CreateForm from "./components/CreateForm.js";
import Error from "./components/Error.js";

import { BrowserRouter } from "react-router-dom";

import Object from "./components/Object.js";
import Objects from "./components/Objects.js";
import LoginForm from "./components/LoginForm.js";
import RegisterForm from "./components/RegisterForm.js";
import useAuthContext from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="md">
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Objects /> : <Navigate to="/login" />}
            />
            <Route
              path="/:id"
              element={user ? <Object /> : <Navigate to="/login" />}
            />
            <Route
              path="/create"
              element={user ? <CreateForm /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginForm /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <RegisterForm /> : <Navigate to="/" />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
};

export default App;
