import { Route, Routes, Navigate } from "react-router-dom";
import "./scss_modules/App.scss";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Navbar from "./components/Navbar.js";
import CreateForm from "./components/CreateForm.js";
import Error from "./components/Error.js";
import Syllabus from "./components/Syllabus.js";
import Lectures from "./components/Lectures.js";
import Profile from "./components/Profile.js";
import Calendar from "./components/Calendar.js";
import Todo from "./components/Todo.js";

import { BrowserRouter, Link, Outlet, NavLink } from "react-router-dom";

import Object from "./components/Object.js";
import Objects from "./components/Objects.js";
import LoginForm from "./components/LoginForm.js";
import RegisterForm from "./components/RegisterForm.js";
import useAuthContext from "./hooks/useAuthContext";

import useLogout from "./hooks/useLogout.js";

import logo from "./images/Argos.png";
import avatar from "./images/avatar1.png";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import USFlag from "./images/FlagKit/US.svg";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import QuizIcon from "@mui/icons-material/Quiz";
import GradingIcon from "@mui/icons-material/Grading";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LiveTvIcon from "@mui/icons-material/LiveTv";

const App = () => {
  const { user } = useAuthContext();
  const activeStyle = {
    background: "#E0F3FF",
    color: "#545cd8",
    fontWeight: "600",
  };
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <div className="nav">
          <MenuIcon className="menuButton" fontSize="large" />
          <div className="logoSpace">
            <img src={logo} alt="Argos_logo" className="logo"></img>
          </div>
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search..."
              className="searchbar__input"
            ></input>
            <SearchIcon className="searchbar__icon" />
          </div>
          {user && (
            <div className="identity">
              <img src={avatar} alt="avatar" className="avatar"></img>
              <div className="identity__text">
                <div className="identity__name">John Smith</div>
                <div className="identity__role">Student</div>
              </div>
            </div>
          )}

          {!user && (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
          {user && <button onClick={handleLogout}>Logout</button>}
          <div className="language_selector">
            <img
              src={USFlag}
              alt="US English"
              className="language_selector__flag"
            ></img>
            <div className="language_selector__text">EN</div>
            <KeyboardArrowDownIcon />
          </div>
        </div>
        <div className="sidebar">
          <div className="sidebar_block">
            <div className="sidebar_block__heading">Course</div>
            <ul className="sidebar_block__list">
              <li className="sidebar_block__item">
                <DashboardIcon className="item__icon" />
                <div className="item__text">Dashboard</div>
              </li>
              <NavLink
                to="/live_class"
                className="sidebar_block__item"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <LiveTvIcon className="item__icon" />
                <div className="item__text">Live Class</div>
              </NavLink>
              <li className="sidebar_block__item">
                <AnnouncementIcon className="item__icon" />
                <div className="item__text">Announcements</div>
              </li>
              <NavLink
                to="/syllabus"
                className="sidebar_block__item"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <MenuBookIcon className="item__icon" />
                <div className="item__text">Syllabus</div>
              </NavLink>
              <NavLink
                to="/lectures"
                className="sidebar_block__item"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <OndemandVideoIcon className="item__icon" />
                <div className="item__text">Lectures</div>
              </NavLink>
              <li className="sidebar_block__item">
                <DriveFileRenameOutlineIcon className="item__icon" />
                <div className="item__text">Assignments</div>
              </li>
              <li className="sidebar_block__item">
                <QuizIcon className="item__icon" />
                <div className="item__text">Quizzes</div>
              </li>
              <li className="sidebar_block__item">
                <GradingIcon className="item__icon" />
                <div className="item__text">Grades</div>
              </li>
              <li className="sidebar_block__item">
                <LibraryBooksIcon className="item__icon" />
                <div className="item__text">Resources</div>
              </li>
            </ul>
          </div>
          <div className="sidebar_block">
            <div className="sidebar_block__heading">Social</div>
            <ul className="sidebar_block__list">
              <li className="sidebar_block__item">
                <ForumIcon className="item__icon" />
                <div className="item__text">Discussion</div>
              </li>
              <NavLink
                to="/profile"
                className="sidebar_block__item"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <AccountCircleIcon className="item__icon" />
                <div className="item__text">Profile</div>
              </NavLink>
              <li className="sidebar_block__item">
                <GroupsIcon className="item__icon" />
                <div className="item__text">Classmates</div>
              </li>
              <li className="sidebar_block__item">
                <EmailIcon className="item__icon" />
                <div className="item__text">Inbox</div>
              </li>
            </ul>
          </div>
          <div className="sidebar_block">
            <div className="sidebar_block__heading">Productivity</div>
            <ul className="sidebar_block__list">
              <NavLink
                to="/calendar"
                className="sidebar_block__item"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <CalendarMonthIcon className="item__icon" />
                <div className="item__text">Calendar</div>
              </NavLink>
              <NavLink
                to="/todo"
                className="sidebar_block__item"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <PlaylistAddCheckIcon className="item__icon" />
                <div className="item__text">Todo</div>
              </NavLink>
              <li className="sidebar_block__item">
                <EventNoteIcon className="item__icon" />
                <div className="item__text">Notes</div>
              </li>
            </ul>
          </div>
        </div>
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
              element={user ? <Syllabus /> : <Navigate to="/login" />}
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
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
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
              element={!user ? <LoginForm /> : <Navigate to="/todo" />}
            ></Route>
          </Routes>
          <Outlet />
        </div>
      </BrowserRouter>
      {/* <BrowserRouter>
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
      </BrowserRouter> */}
    </div>
  );
};

export default App;
