import LiveTvIcon from "@mui/icons-material/LiveTv";
import classes from "../scss_modules/LiveClass.module.scss";
import Header from "./Header.js";
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

const LiveClass = () => {
  return (
    <div className={classes.LiveClass}>
      <Header
        title="LiveClass"
        detail="This page provides allows for a live class session."
        icon={<LiveTvIcon fontSize="large" className={classes.icon} />}
      />
      <div className={classes.content}>
        <div className={classes.content_box}>
          <div className={classes.content_box__title}>Intro</div>
          <div className={classes.content_box__text}></div>
        </div>
        <div className={classes.content_box}>
          <div className={classes.content_box__title}>Live Chat</div>
          <div className={classes.content_box__text}></div>
        </div>
      </div>
    </div>
  );
};

export default LiveClass;
