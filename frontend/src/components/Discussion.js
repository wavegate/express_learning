import classes from "../scss_modules/Discussion.module.scss";
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
import ForumIcon from "@mui/icons-material/Forum";
import CommentIcon from "@mui/icons-material/Comment";
import PushPinIcon from "@mui/icons-material/PushPin";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Thread from "./Thread";
import moment from "moment";

const Discussion = () => {
  const [error, setError] = useState();
  const [open, setOpen] = useState();
  const [index, setIndex] = useState(-1);
  const { threads, dispatch } = useAppContext();
  const { id } = useParams();
  const [message, setMessage] = useState();
  const [openComplete, setOpenComplete] = useState();

  const { user } = useAuthContext();
  const [formData, setFormData] = useState({});

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
      const response = await fetch(`/threads/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...formData }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "CREATE_THREAD", payload: data });
        setError();
        handleClose();
        setFormData({});
        setMessage("Thread created!");
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
    const fetchData = async () => {
      const response = await fetch(`/threads`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_THREADS", payload: data });
      }
    };
    if (user) {
      fetchData();
    }
  }, [user, dispatch]);

  return (
    <div className={classes.Discussion}>
      <Header
        title={`Discussion`}
        detail="A discussion forum for questions and answers."
        icon={<ForumIcon fontSize="large" className={classes.icon} />}
      />
      <div className={classes.content}>
        <Paper elevation={4} className={classes.threadColumn}>
          <Button onClick={handleOpen}>New Thread</Button>
          {threads &&
            threads.map((thread) => {
              return (
                <NavLink
                  key={thread._id}
                  to={thread._id}
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.activeLink} ${classes.thread}`
                      : classes.thread
                  }
                >
                  <div className={classes.thread__firstRow}>
                    <div className={classes.thread__title}>
                      <div>
                        <CommentIcon />
                      </div>
                      <div>{thread.title}</div>
                    </div>
                    <div>
                      <PushPinIcon />
                    </div>
                  </div>
                  <div className={classes.thread__secondRow}>
                    <div>{thread.author.name}</div>
                    <div>{thread.author.role}</div>
                    <div>{moment(thread.createdAt).fromNow()}</div>
                    <div className={classes.thread__numComments}>
                      <ChatBubbleOutlineIcon />
                      <div>6</div>
                    </div>
                  </div>
                </NavLink>
              );
            })}
        </Paper>
        <div className={classes.rightSection}>
          <Routes>
            <Route path="/" element={<Thread></Thread>}></Route>
            <Route path=":id" element={<Thread></Thread>}></Route>
          </Routes>
        </div>
      </div>
      <Modal
        open={open || false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <FormModal title="New Thread">
            <FormGroup>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                placeholder="title"
                name="title"
                id="title"
                onChange={handleChange}
                value={formData.title || ""}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="body">Body</Label>
              <Textarea
                name="body"
                id="body"
                onChange={handleChange}
                value={formData.body || ""}
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
    </div>
  );
};

export default Discussion;
