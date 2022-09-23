import classes from "../scss_modules/Lectures.module.scss";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckIcon from "@mui/icons-material/Check";

const Lectures = () => {
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
              <li className={classes.lecture_item}>
                <PlayArrowIcon className={classes.playIcon} />
                <div className={classes.lecture_item__text}>1. Intro</div>
                <CheckIcon className={classes.checkIcon} />
              </li>
              <li className={classes.lecture_item}>
                <PlayArrowIcon className={classes.playIcon} />
                <div className={classes.lecture_item__text}>2. HTML</div>
                <CheckIcon className={classes.checkIcon} />
              </li>
              <li className={classes.lecture_item}>
                <PlayArrowIcon className={classes.playIcon} />
                <div className={classes.lecture_item__text}>3. CSS</div>
                <CheckIcon className={classes.checkIcon} />
              </li>
            </ol>
          </div>
        </div>
        <div className={classes.content_box}>
          <div className={classes.content_box__title}>Intro</div>
          <div className={classes.video_responsive}>
            <iframe
              src="https://www.youtube.com/embed/EqzUcMzfV1w"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lectures;
