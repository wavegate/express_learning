import classes from "../scss_modules/Syllabus.module.scss";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

const Lectures = () => {
  return (
    <div className={classes.Syllabus}>
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
          <div className={classes.content_box__title}>Curriculum</div>
          <div className={classes.content_box__text}>
            <ul>
              <li>1.1</li>
              <li>1.2</li>
              <li>1.3</li>
              <li>1.4</li>
              <li>1.5</li>
              <li>1.6</li>
              <li>1.7</li>
            </ul>
          </div>
        </div>
        <div className={classes.content_box}>
          <div className={classes.content_box__title}>
            1.1 Intro to Web Development
          </div>

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
