import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import classes from "../scss_modules/Form.module.scss";
import { Helmet } from "react-helmet-async";
import { Alert } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import useLogin from "../hooks/useLogin.js";
import useRegister from "../hooks/useRegister.js";
import classes from "../scss_modules/Login.module.scss";
import studying from "../images/studying.svg";
import logo from "../images/Argos.png";
import Button from "./Button.js";
import learningAnimation from "../data/learningAnimation.json";
import { Player } from "@lottiefiles/react-lottie-player";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "test@test.com",
    password: "ZlxE!9G!ZL40",
  });
  const { login, error, isLoading } = useLogin();
  const { register } = useRegister();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(formData.email, formData.password);
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
    <div className={classes.Login}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={classes.loginContainer}>
        <div className={classes.leftSide}>
          <img src={logo} alt="Argos_logo" className={classes.logo}></img>
          <Player
            src="https://assets2.lottiefiles.com/private_files/lf30_sxw84pnl.json"
            autoplay
            loop
          />
        </div>
        <div className={classes.rightSide}>
          <div className={classes.form_header}>Login to Argos</div>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleGoogleLogin(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className={classes.formInput}
                autoComplete="email"
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                className={classes.formInput}
                autoComplete="current-password"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className={classes.loginButton}
            >
              Login
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className={classes.loginButton}
            >
              Login as Guest Student
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className={classes.loginButton}
            >
              Login as Guest Teacher
            </Button>
          </form>
          {error && <Alert severity="error">{error}</Alert>}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
