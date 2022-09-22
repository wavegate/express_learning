import useLogin from "../hooks/useLogin.js";
import useRegister from "../hooks/useRegister";
import { useState } from "react";
import classes from "../scss_modules/Form.module.scss";
import { Helmet } from "react-helmet-async";
import { TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "test@test.com",
    password: "ZlxE!9G!ZL40",
  });
  const { register, error, isLoading } = useRegister();
  const { login } = useLogin();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const complete = await register(formData.email, formData.password);
    if (complete) {
      navigate("/");
    }
  };

  const handleGoogleLogin = async (response) => {
    const decoded = jwt_decode(response.credential);
    const { email, sub } = decoded;
    const result = await login(email, sub);
    if (result === "Email not found") {
      const registerResult = await register(email, sub, "google");
      if (registerResult) {
        navigate("/");
      }
    }
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
        <Button variant="contained" type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
      {error && <Alert severity="error">{error}</Alert>}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleGoogleLogin(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default RegisterForm;
