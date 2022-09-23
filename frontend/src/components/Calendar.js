import classes from "../scss_modules/Calendar.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Profile = () => {
  return (
    <div className={classes.Calendar}>
      <div className={classes.header}>
        <div className={classes.iconBox}>
          <AccountCircleIcon fontSize="large" className={classes.icon} />
        </div>

        <div className={classes.header__text}>
          <div className={classes.header__title}>Calendar</div>
          <div className={classes.header__subtitle}>A page for calendar.</div>
        </div>
        <div className={classes.header__star}>Star button</div>
        <div className={classes.header__more}>More buttons</div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        className={classes.calendar}
      />
    </div>
  );
};

export default Profile;
