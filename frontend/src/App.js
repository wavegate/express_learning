import { Route, Routes, Navigate } from "react-router-dom";
import "./scss_modules/App.scss";
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

const App = () => {
  const { user } = useAuthContext();
  return (
    <div className="App">
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
        <div class="identity">
          <img src={avatar} alt="avatar" className="avatar"></img>
          <div class="identity__text">
            <div className="identity__name">John Smith</div>
            <div className="identity__role">Student</div>
          </div>
        </div>
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
            <li className="sidebar_block__item">
              <AnnouncementIcon className="item__icon" />
              <div className="item__text">Announcements</div>
            </li>
            <li className="sidebar_block__item">
              <MenuBookIcon className="item__icon" />
              <div className="item__text">Syllabus</div>
            </li>
            <li className="sidebar_block__item">
              <OndemandVideoIcon className="item__icon" />
              <div className="item__text">Lectures</div>
            </li>
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
            <li className="sidebar_block__item">
              <AccountCircleIcon className="item__icon" />
              <div className="item__text">Profile</div>
            </li>
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
            <li className="sidebar_block__item">
              <CalendarMonthIcon className="item__icon" />
              <div className="item__text">Calendar</div>
            </li>
            <li className="sidebar_block__item">
              <PlaylistAddCheckIcon className="item__icon" />
              <div className="item__text">Todo</div>
            </li>
            <li className="sidebar_block__item">
              <EventNoteIcon className="item__icon" />
              <div className="item__text">Notes</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="main"></div>
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
