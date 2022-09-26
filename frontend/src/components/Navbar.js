import logo from "../images/Argos.png";
import avatar from "../images/avatar1.png";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout.js";
import USFlag from "../images/FlagKit/US.svg";

import { Link } from "react-router-dom";
import classes from "../scss_modules/Navbar.module.scss";
import Button from "./Button.js";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

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
      {user && (
        <div className={classes.identity}>
          <img src={avatar} alt="avatar" className={classes.avatar}></img>
          <div className={classes.identity__text}>
            <div className={classes.identity__name}>John Smith</div>
            <div className={classes.identity__role}>Student</div>
          </div>
        </div>
      )}
      <div className={classes.loginSection}>
        {!user && (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
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
