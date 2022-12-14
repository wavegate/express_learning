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
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import AlertModal from "./AlertModal";
import Button from "./Button";
import FormModal from "./FormModal";
import FormGroup from "./FormGroup";
import Label from "./Label";
import Input from "./Input";
import Textarea from "./Textarea";
import { Paper } from "@mui/material";

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

const Profile = () => {
  const [error, setError] = useState();
  const [open, setOpen] = useState();
  const [index, setIndex] = useState(-1);
  const { current_user, dispatch } = useAppContext();
  const { id } = useParams();
  const [message, setMessage] = useState();
  const [openComplete, setOpenComplete] = useState();

  const { user } = useAuthContext();
  const [profile, setProfile] = useState();
  const [formData, setFormData] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseComplete = () => {
    setOpenComplete(false);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({});
    setError();
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const submitData = async () => {
      const response = await fetch(`/users/user/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...formData }),
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
        setError();
        handleClose();
        setMessage("Profile updated!");
        setOpenComplete(true);
      } else {
        setError(data.error);
      }
    };
    if (user) {
      submitData();
    }
  };

  useEffect(() => {
    setFormData({ ...profile });
  }, [profile]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/users/user/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
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
            <div className={classes.leftSection}>
              <Paper elevation={4} className={classes.id}>
                <img
                  src={avatar}
                  alt="avatar"
                  className={classes.id__avatar}
                ></img>
                <div className={classes.id__info}>
                  <div className={classes.id__text}>
                    <div className={classes.id__name}>{profile.name || ""}</div>
                    <div className={classes.id__role}>{profile.role || ""}</div>
                    <div className={classes.id__email}>
                      {profile.email || ""}
                    </div>
                  </div>
                  <div className={classes.id__buttons}>
                    <Button>Message</Button>
                    {current_user._id === id && (
                      <Button type="submit" onClick={handleOpen}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </Paper>
              <div>
                <h3>My Gallery</h3>
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
            <div className={classes.rightSection}>
              <div className={classes.tabs}>
                <NavLink
                  to="posts"
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.activeLink} ${classes.tabLabel}`
                      : classes.tabLabel
                  }
                >
                  Posts
                </NavLink>
                <NavLink
                  to="about"
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.activeLink} ${classes.tabLabel}`
                      : classes.tabLabel
                  }
                >
                  Bio
                </NavLink>
                <NavLink
                  to="settings"
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.activeLink} ${classes.tabLabel}`
                      : classes.tabLabel
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
                    element={
                      <About
                        bio={profile.bio || ""}
                        handleOpen={handleOpen}
                      ></About>
                    }
                  />
                  <Route path="settings" element={<Settings></Settings>} />
                </Routes>
              </div>
            </div>
          </div>
          <Modal
            open={open || false}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div>
              <FormModal title="Edit Profile">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    placeholder="Name"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={formData.name || ""}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    name="bio"
                    id="bio"
                    onChange={handleChange}
                    value={formData.bio || ""}
                  ></Textarea>
                </FormGroup>
                <Button type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
                {error && <Alert severity="error">{error}</Alert>}
              </FormModal>
            </div>
          </Modal>
          <AlertModal
            open={openComplete}
            handleClose={handleCloseComplete}
            title={message}
          ></AlertModal>
        </Fragment>
      )}
    </div>
  );
};

export default Profile;
