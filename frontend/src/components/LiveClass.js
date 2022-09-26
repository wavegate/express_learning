import LiveTvIcon from "@mui/icons-material/LiveTv";
import classes from "../scss_modules/LiveClass.module.scss";
import Header from "./Header.js";
import { Fragment } from "react";
import Paper from "@mui/material/Paper";
import ContentCard from "./ContentCard";
import { Icon } from "@mui/material";
import videoStream from "../images/videoStream.jpg";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import avatar1 from "../images/avatar1.png";
import avatar2 from "../images/avatar2.png";
import avatar3 from "../images/avatar3.png";
import avatar4 from "../images/avatar4.png";
import avatar5 from "../images/avatar5.png";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import Button from "./Button.js";
import CircleIcon from "@mui/icons-material/Circle";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import useAuthContext from "../hooks/useAuthContext.js";

const ENDPOINT = "http://localhost:8000";
var socket, selectedChatCompare;

const LiveClass = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useAuthContext();
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join chat", "live_class");
    socket.on("connection", () => setSocketConnected(true));
  }, [user]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      setMessages([...messages, newMessageReceived]);
    });
  });

  const sendMessage = () => {
    socket.emit("new message", "random message content");
    console.log("message sent");
  };

  return (
    <div className={classes.LiveClass}>
      <Header
        title="Live Class"
        detail="This page provides allows for a live class session."
        icon={<LiveTvIcon fontSize="large" className={classes.icon} />}
      />
      <div className={classes.content}>
        <Paper elevation={4} className={classes.videoStream}>
          <div className={classes.title}>
            <div>Full-Stack Web Developer</div>
            <div className={classes.subtitle}>
              <div className={classes.subtitle__name}>Angelina Crispy</div>
              <div className={classes.subtitle__number}>
                <PeopleAltIcon /> 10k Students
              </div>
            </div>
          </div>
          <div className={classes.videoStream__content}>
            <div className={classes.video__wrapper}>
              <img
                src={videoStream}
                alt="live demo"
                className={classes.video}
              ></img>
              <div className={classes.video__live}>
                <CircleIcon sx={{ fontSize: 8, color: "red" }}></CircleIcon>
                Live
              </div>
            </div>
            <div className={classes.videoStream__footer}>
              <div className={classes.students}>
                <div className={classes.students__title}>Students</div>
                <ul className={classes.students__list}>
                  <li>
                    <img
                      src={avatar1}
                      alt="avatar 1"
                      className={classes.avatar}
                    ></img>
                  </li>
                  <li>
                    <img
                      src={avatar2}
                      alt="avatar 2"
                      className={classes.avatar}
                    ></img>
                  </li>
                  <li>
                    <img
                      src={avatar3}
                      alt="avatar 3"
                      className={classes.avatar}
                    ></img>
                  </li>
                  <li>
                    <img
                      src={avatar4}
                      alt="avatar 4"
                      className={classes.avatar}
                    ></img>
                  </li>
                  <li>
                    <img
                      src={avatar5}
                      alt="avatar 5"
                      className={classes.avatar}
                    ></img>
                  </li>
                </ul>
              </div>
              <ul className={classes.buttons}>
                <Button>
                  <MicIcon sx={{ fontSize: 28 }} />
                </Button>
                <Button>
                  <VideocamIcon sx={{ fontSize: 28 }}></VideocamIcon>
                </Button>
              </ul>
            </div>
          </div>
        </Paper>
        <ContentCard className={classes.liveChat} title="Live Chat">
          <Button onClick={sendMessage}>Send message</Button>
          {messages &&
            messages.map((item, index) => <div key={index}>{item}</div>)}
          <div>Samantha</div>
          <div>Lorem ipsum dol Samantha's chat</div>
          <div>12:45 PM</div>
          <div>You</div>
          <div>Lorem ipsum your chart</div>
          <div>09:30 AM</div>
          <div className={classes.chatInput}>
            <div>Icon attach</div>
            <div>Send icon</div>
          </div>
        </ContentCard>
      </div>
    </div>
  );
};

export default LiveClass;
