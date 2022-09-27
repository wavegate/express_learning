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
import LiveTvIcon from "@mui/icons-material/LiveTv";
import useAppContext from "../hooks/useAppContext";

import { NavLink } from "react-router-dom";

import classes from "../scss_modules/Sidebar.module.scss";

const SidebarLink = (props) => {
  return (
    <NavLink
      to={props.target}
      className={({ isActive }) =>
        isActive
          ? `${classes.activeLink} ${classes.sidebar_block__item}`
          : classes.sidebar_block__item
      }
    >
      <props.icon className={classes.sidebar_block__item_icon}></props.icon>
      <div className="item__text">{props.text}</div>
    </NavLink>
  );
};

const Sidebar = () => {
  const { current_user } = useAppContext();
  return (
    <div className={classes.Sidebar}>
      <div className={classes.sidebar_block}>
        <div className={classes.sidebar_block__heading}>Course</div>
        <ul className={classes.sidebar_block__list}>
          <SidebarLink
            target="/dashboard"
            icon={DashboardIcon}
            text="Dashboard"
          ></SidebarLink>
          <SidebarLink
            target="/live_class"
            icon={LiveTvIcon}
            text="Live Class"
          ></SidebarLink>
          <SidebarLink
            target="/announcements"
            icon={AnnouncementIcon}
            text="Announcements"
          ></SidebarLink>
          <SidebarLink
            target="/syllabus"
            icon={MenuBookIcon}
            text="Syllabus"
          ></SidebarLink>
          <SidebarLink
            target="/lectures"
            icon={OndemandVideoIcon}
            text="Lectures"
          ></SidebarLink>
          <SidebarLink
            target="/assignments"
            icon={DriveFileRenameOutlineIcon}
            text="Assignments"
          ></SidebarLink>
          <SidebarLink
            target="/quizzes"
            icon={QuizIcon}
            text="Quizzes"
          ></SidebarLink>
          <SidebarLink
            target="/grades"
            icon={GradingIcon}
            text="Grades"
          ></SidebarLink>
          <SidebarLink
            target="/resources"
            icon={LibraryBooksIcon}
            text="Resources"
          ></SidebarLink>
        </ul>
      </div>
      <div className={classes.sidebar_block}>
        <div className={classes.sidebar_block__heading}>Social</div>
        <ul className={classes.sidebar_block__list}>
          <SidebarLink
            target="/discussion"
            icon={ForumIcon}
            text="Discussion"
          ></SidebarLink>
          {current_user && (
            <SidebarLink
              target={`/profile/${current_user._id}`}
              icon={AccountCircleIcon}
              text="My Profile"
            ></SidebarLink>
          )}
          <SidebarLink
            target="/members"
            icon={GroupsIcon}
            text="Members"
          ></SidebarLink>
          <SidebarLink
            target="/inbox"
            icon={EmailIcon}
            text="Inbox"
          ></SidebarLink>
        </ul>
      </div>
      <div className={classes.sidebar_block}>
        <div className={classes.sidebar_block__heading}>Productivity</div>
        <ul className={classes.sidebar_block__list}>
          <SidebarLink
            target="/calendar"
            icon={CalendarMonthIcon}
            text="Calendar"
          ></SidebarLink>
          <SidebarLink
            target="/todo"
            icon={PlaylistAddCheckIcon}
            text="Todo"
          ></SidebarLink>
          <SidebarLink
            target="/notes"
            icon={EventNoteIcon}
            text="Notes"
          ></SidebarLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
