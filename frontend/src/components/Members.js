import classes from "../scss_modules/Members.module.scss";
import GroupsIcon from "@mui/icons-material/Groups";
import cover from "../images/cover.jpg";
import avatar from "../images/avatar1.png";
import Lightbox from "yet-another-react-lightbox";
import PhotoAlbum from "react-photo-album";
import "yet-another-react-lightbox/styles.css";
import { useState, useEffect } from "react";
import { Route, Routes, NavLink, Navigate } from "react-router-dom";
import Header from "./Header.js";
import ContentCard from "./ContentCard.js";
import useAppContext from "../hooks/useAppContext";
import useAuthContext from "../hooks/useAuthContext";
import StudentCard from "./StudentCard";
import avatar1 from "../images/avatar1.png";
import slides from "../data/slides";

const Members = () => {
  const { user } = useAuthContext();
  const { users, dispatch } = useAppContext();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_USERS", payload: data });
      }
    };
    if (user) {
      fetchData();
    }
  }, [user, dispatch]);

  return (
    <div className={classes.Members}>
      <Header
        title="Members"
        detail="A page to display the teachers and students of this class."
        icon={<GroupsIcon fontSize="large" className={classes.icon} />}
      />
      <div className={classes.content}>
        <ContentCard title="Teachers">
          {users &&
            users
              .filter((user) => user.role === "teacher")
              .map((user) => <div key={user._id}>{user.email}</div>)}
        </ContentCard>
        <ContentCard title="Students">
          {users &&
            users
              .filter((user) => user.role === "student")
              .map((user) => (
                <StudentCard
                  key={user._id}
                  id={user._id}
                  photo={avatar1}
                  name={user.name}
                  role={user.role}
                  bio={user.bio}
                ></StudentCard>
              ))}
        </ContentCard>
      </div>
    </div>
  );
};

export default Members;
