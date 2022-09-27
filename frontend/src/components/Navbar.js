import logo from "../images/Argos.png";
import avatar from "../images/avatar1.png";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import useAuthContext from "../hooks/useAuthContext";
import useAppContext from "../hooks/useAppContext";
import useLogout from "../hooks/useLogout.js";
import USFlag from "../images/FlagKit/US.svg";

import { Link } from "react-router-dom";
import classes from "../scss_modules/Navbar.module.scss";
import Button from "./Button.js";
import { Fragment } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const { user } = useAuthContext();
  const { current_user, dispatch } = useAppContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/users/current", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_CURRENT_USER", payload: data });
      }
    };
    if (user) {
      fetchData();
    }
  }, [user, dispatch]);

  return (
    <div className={classes.Navbar}>
      <MenuIcon className={classes.menuButton} fontSize="large" />
      <div className={classes.logoSpace}>
        <img src={logo} alt="Argos_logo" className={classes.logo}></img>
      </div>
      <div className={classes.searchbar}>
        <input
          type="text"
          placeholder="Search..."
          className={classes.searchbar__input}
        ></input>
        <SearchIcon className={classes.searchbar__icon} />
      </div>
      {current_user && (
        <div className={classes.identity}>
          <img src={avatar} alt="avatar" className={classes.avatar}></img>
          <div className={classes.identity__text}>
            <div className={classes.identity__name}>{current_user.name}</div>
            <div className={classes.identity__role}>{current_user.role}</div>
          </div>
        </div>
      )}
      <div className={classes.loginSection}>
        {!user && (
          <Fragment>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </Fragment>
        )}
        {user && <Button onClick={handleLogout}>Logout</Button>}
      </div>
      <div className={classes.language_selector}>
        <img
          src={USFlag}
          alt="US English"
          className={classes.language_selector__flag}
        ></img>
        <div className={classes.language_selector__text}>EN</div>
        <KeyboardArrowDownIcon />
      </div>
    </div>
  );
};

export default Navbar;
