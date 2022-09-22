import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import classes from "../scss_modules/Form.module.scss";
import { Helmet } from "react-helmet-async";
import { TextField, Button, Alert } from "@mui/material";

const RegisterForm = () => {
  const { dispatch } = useAuthContext();
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: "test@test.com",
    password: "ZlxE!9G!ZL40",
  });
  const [error, setError] = useState();

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const submitData = async () => {
      const response = await fetch(`/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "LOGIN", payload: data });
        localStorage.setItem("user", JSON.stringify(data));
        history("/");
      } else {
        setError(data.error);
      }
    };
    submitData();
  };

  return (
    <div className="CreateForm">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          onChange={handleChange}
          value={formData.email}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          onChange={handleChange}
          value={formData.password}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
};

export default RegisterForm;
