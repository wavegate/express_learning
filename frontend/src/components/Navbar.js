import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import classes from "../scss_modules/Navbar.module.scss";
import useAuthContext from "../hooks/useAuthContext.js";

export default function Navbar() {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = (event) => {
    localStorage.setItem("user", null);
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">App</Link>
          </Typography>
          <div className={classes.links}>
            <Link to="/">
              <Button color="inherit">Home</Button>
            </Link>
            {user && (
              <Link to="/create">
                <Button color="inherit">Create Object</Button>
              </Link>
            )}
            {!user && (
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
            )}
            {!user && (
              <Link to="/register">
                <Button color="inherit">Register</Button>
              </Link>
            )}
            {user && (
              <Link to="/#">
                <Button color="inherit">{user.email}'s Profile</Button>
              </Link>
            )}
            {user && (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
