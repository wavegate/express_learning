import { Link, Route, Routes, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppContext } from "./hook/useAppContext";
import "./App.scss";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Navbar from "./components/Navbar.js";
import CreateForm from "./components/CreateForm.js";
import Error from "./components/Error.js";
import { Helmet } from "react-helmet";

const User = () => {
  const { dispatch } = useAppContext();
  const { objects } = useAppContext();
  const params = useParams();
  const history = useNavigate();
  const [user, setUser] = useState();

  const handleDelete = () => {
    const deleteLink = `/users/${params.id}`;
    async function deleteUser() {
      const response = await fetch(deleteLink, { method: "DELETE" });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_OBJECT", payload: data });
        history("/");
      }
    }
    deleteUser();
  };

  useEffect(() => {
    objects && setUser(objects.filter((object) => object._id === params.id)[0]);
  }, [objects, params.id]);

  return user ? (
    <div className="User">
      <h1>{user && user.name}</h1>
      <p>{user && user.description}</p>
      <Button onClick={handleDelete} variant="contained">
        Delete
      </Button>
    </div>
  ) : (
    <Error />
  );
};

const Users = () => {
  const { objects, dispatch } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/users");
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_OBJECTS", payload: data });
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="Users">
      <Helmet>
        <title>All Users</title>
      </Helmet>
      <h1>All Users</h1>
      <ul>
        {objects &&
          objects.map((item) => (
            <li key={item._id}>
              <Link to={`/${item._id}`}>
                {item.name}, {item.createdAt}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <Routes>
          <Route exact path="/" element={<Users />} />
          <Route path="/:id" element={<User />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
