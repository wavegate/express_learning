import classes from "../scss_modules/Profile.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import cover from "../images/cover.jpg";
import avatar from "../images/avatar1.png";
import Lightbox from "yet-another-react-lightbox";
import PhotoAlbum from "react-photo-album";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

import photos from "../data/photos";
import slides from "../data/slides";

const Profile = () => {
  const [index, setIndex] = useState(-1);
  return (
    <div className={classes.Profile}>
      <div className={classes.header}>
        <div className={classes.iconBox}>
          <AccountCircleIcon fontSize="large" className={classes.icon} />
        </div>

        <div className={classes.header__text}>
          <div className={classes.header__title}>John Smith's Profile</div>
          <div className={classes.header__subtitle}>
            A page for users to display user profiles.
          </div>
        </div>
        <div className={classes.header__star}>Star button</div>
        <div className={classes.header__more}>More buttons</div>
      </div>
      <div className={classes.content}>
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
        <div className={`${classes.content_box} ${classes.posts_box}`}>
          <div>Posts</div>
          <div>About Me</div>
          <div>Settings</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
