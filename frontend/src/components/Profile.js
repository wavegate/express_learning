import classes from "../scss_modules/Profile.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import cover from "../images/cover.jpg";
import avatar from "../images/avatar1.png";
import Lightbox from "yet-another-react-lightbox";
import PhotoAlbum from "react-photo-album";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { Route, Routes, NavLink, Navigate } from "react-router-dom";
import Header from "./Header.js";

import photos from "../data/photos";
import slides from "../data/slides";

const About = () => {
  return (
    <div className={classes.About}>
      <h2>About Me</h2>
      <p>
        A wonderful serenity has taken possession of my entire soul, like these
        sweet mornings of spring which I enjoy with my whole heart. I am alone,
        and feel the charm of existence was created for the bliss of souls like
        mine.I am so happy, my dear friend, so absorbed in the exquisite sense
        of mere tranquil existence, that I neglect my talents. A collection of
        textile samples lay spread out on the table - Samsa was a travelling
        salesman - and above it there hung a picture that he had recently cut
        out of an illustrated magazine and housed in a nice, gilded frame.
      </p>
    </div>
  );
};

const Posts = () => {
  return <div>Posts</div>;
};

const Settings = () => {
  return <div>Settings</div>;
};

const activeStyle = {
  color: "#545CD8",
  borderBottom: "2px solid #545CD8",
};

const Profile = () => {
  const [index, setIndex] = useState(-1);
  return (
    <div className={classes.Profile}>
      <Header
        title="John Smith's Profile"
        detail="A page to display the user's profile."
        icon={<AccountCircleIcon fontSize="large" className={classes.icon} />}
      />
      <div className={classes.content}>
        <div className={classes.leftRow}>
          <div className={`${classes.content_box} ${classes.cover}`}>
            <img src={cover} alt="cover" className={classes.cover__image} />
            <div className={classes.cover__text}>
              <img
                src={avatar}
                alt="avatar"
                className={classes.cover__avatar}
              ></img>
              <div className={classes.title}>
                <div className={classes.name}>John Smith</div>
                <div className={classes.role}>Student</div>
              </div>
              <div>
                <div className={classes.email}>john@smith.com</div>
                <div>Email</div>
              </div>
            </div>
          </div>
          <div className={`${classes.content_box} ${classes.follow_box}`}>
            <button>Follow</button>
            <button>Message</button>
          </div>
          <div className={`${classes.content_box} ${classes.highlights}`}>
            <PhotoAlbum
              layout="rows"
              photos={photos}
              targetRowHeight={150}
              onClick={(event, photo, index) => setIndex(index)}
              componentsProps={{ imageProps: { loading: "lazy" } }}
            />
            <Lightbox
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              slides={slides}
            />
          </div>
        </div>
        <div>
          <div className={`${classes.content_box} ${classes.posts_box}`}>
            <div className={classes.tabs}>
              <NavLink
                to="posts"
                className={classes.tabLabel}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Posts
              </NavLink>
              <NavLink
                to="about"
                className={classes.tabLabel}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                About Me
              </NavLink>
              <NavLink
                to="settings"
                className={classes.tabLabel}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Settings
              </NavLink>
            </div>
            <div className={classes.tabContent}>
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="about"></Navigate>}
                ></Route>
                <Route path="posts" element={<Posts></Posts>} />
                <Route path="about" element={<About></About>} />
                <Route path="settings" element={<Settings></Settings>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
