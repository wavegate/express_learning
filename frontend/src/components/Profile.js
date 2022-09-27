import classes from "../scss_modules/Profile.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import cover from "../images/cover.jpg";
import avatar from "../images/avatar1.png";
import Lightbox from "yet-another-react-lightbox";
import PhotoAlbum from "react-photo-album";
import "yet-another-react-lightbox/styles.css";
import { useState, useEffect, Fragment } from "react";
import { Route, Routes, NavLink, Navigate, useParams } from "react-router-dom";
import Header from "./Header.js";
import useAppContext from "../hooks/useAppContext";
import useAuthContext from "../hooks/useAuthContext";

import photos from "../data/photos";
import slides from "../data/slides";

const About = (props) => {
  return (
    <div className={classes.About}>
      <h2>Bio</h2>
      <p>{props.bio}</p>
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
  const { id } = useParams();

  const { user } = useAuthContext();
  const [profile, setProfile] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/users/user/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setProfile(data);
        // dispatch({ type: "SET_USERS", payload: data });
      }
    };
    if (user) {
      fetchData();
    }
  }, [user, id]);

  return (
    <div className={classes.Profile}>
      {profile && (
        <Fragment>
          <Header
            title={`${profile.name}'s Profile`}
            detail="A page to display the user's profile."
            icon={
              <AccountCircleIcon fontSize="large" className={classes.icon} />
            }
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
                    <div className={classes.name}>{profile.name || ""}</div>
                    <div className={classes.role}>{profile.role || ""}</div>
                  </div>
                  <div>
                    <div className={classes.email}>{profile.email || ""}</div>
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
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Posts
                  </NavLink>
                  <NavLink
                    to="about"
                    className={classes.tabLabel}
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    About Me
                  </NavLink>
                  <NavLink
                    to="settings"
                    className={classes.tabLabel}
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
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
                    <Route
                      path="about"
                      element={<About bio={profile.bio || ""}></About>}
                    />
                    <Route path="settings" element={<Settings></Settings>} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Profile;
