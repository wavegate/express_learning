import classes from "../scss_modules/Lectures.module.scss";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckIcon from "@mui/icons-material/Check";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { Fragment } from "react";

const Video = (props) => {
  return (
    <Fragment>
      <div className={classes.content_box__title}>{props.title}</div>
      <div className={classes.video_responsive}>
        <iframe
          src={props.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Fragment>
  );
};

const Lectures = () => {
  const activeStyle = {
    background: "#E5F9E5",
  };
  return (
    <div className={classes.Lectures}>
      <div className={classes.header}>
        <div className={classes.iconBox}>
          <OndemandVideoIcon fontSize="large" className={classes.icon} />
        </div>

        <div className={classes.header__text}>
          <div className={classes.header__title}>Lectures</div>
          <div className={classes.header__subtitle}>
            Lecture videos for Argos CS101.
          </div>
        </div>
        <div className={classes.header__star}>Star button</div>
        <div className={classes.header__more}>More buttons</div>
      </div>
      <div className={classes.content}>
        <div className={classes.content_box}>
          <div className={classes.content_box__title}>
            1.1: Intro to Web Dev
          </div>
          <div className={classes.content_box__text}>
            <ol className={classes.lecture_list}>
              <NavLink
                to="intro"
                className={classes.lecture_item}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <PlayArrowIcon className={classes.playIcon} />
                <div className={classes.lecture_item__text}>1. Intro</div>
                <CheckIcon className={classes.checkIcon} />
              </NavLink>
              <NavLink
                to="HTML"
                className={classes.lecture_item}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <PlayArrowIcon className={classes.playIcon} />
                <div className={classes.lecture_item__text}>2. HTML</div>
                <CheckIcon className={classes.checkIcon} />
              </NavLink>
              <NavLink
                to="CSS"
                className={classes.lecture_item}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <PlayArrowIcon className={classes.playIcon} />
                <div className={classes.lecture_item__text}>3. CSS</div>
                <CheckIcon className={classes.checkIcon} />
              </NavLink>
              <NavLink
                to="JavaScript"
                className={classes.lecture_item}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <PlayArrowIcon className={classes.playIcon} />
                <div className={classes.lecture_item__text}>4. JavaScript</div>
              </NavLink>
            </ol>
          </div>
        </div>
        <div className={classes.content_box}>
          <Routes>
            <Route element={<Navigate to="intro" />} path=""></Route>
            <Route
              element={
                <Video
                  url="https://www.youtube.com/embed/EqzUcMzfV1w"
                  title="Intro"
                />
              }
              path="intro"
            ></Route>
            <Route
              element={
                <Video
                  url="https://www.youtube.com/embed/qz0aGYrrlhU"
                  title="HTML"
                />
              }
              path="HTML"
            ></Route>
            <Route
              element={
                <Video
                  url="https://www.youtube.com/embed/TZTaGTQKl2I"
                  title="CSS"
                />
              }
              path="CSS"
            ></Route>
            <Route
              element={
                <Video
                  url="https://www.youtube.com/embed/PkZNo7MFNFg"
                  title="JavaScript"
                />
              }
              path="JavaScript"
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Lectures;
