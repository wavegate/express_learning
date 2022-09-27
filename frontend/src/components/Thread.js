import classes from "../scss_modules/Thread.module.scss";
import { Route, Routes, NavLink, Navigate, useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import avatar2 from "../images/avatar2.png";
import avatar1 from "../images/avatar1.png";
import PushPinIcon from "@mui/icons-material/PushPin";
import StarIcon from "@mui/icons-material/Star";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Button from "./Button";
import useAppContext from "../hooks/useAppContext";
import useAuthContext from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
import moment from "moment";
import AlertModal from "./AlertModal";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import FormModal from "./FormModal";
import FormGroup from "./FormGroup";
import Label from "./Label";
import Input from "./Input";
import Textarea from "./Textarea";

const Thread = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const [open, setOpen] = useState();
  const { threads, dispatch } = useAppContext();
  const { id } = useParams();
  const [thread, setThread] = useState();
  const [openComplete, setOpenComplete] = useState();
  const { user } = useAuthContext();
  const [message, setMessage] = useState();

  const handleOpen = () => {
    setOpen(true);
    setFormData(thread);
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
      const response = await fetch(`/threads/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...formData }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "UPDATE_THREAD", payload: data });
        setError();
        handleClose();
        setFormData({});
        setMessage("Thread updated!");
        setOpenComplete(true);
      } else {
        setError(data.error);
      }
    };
    if (user) {
      submitData();
    }
  };

  const handleDelete = () => {
    const postDelete = async () => {
      const response = await fetch(`/threads/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_THREAD", payload: data });
        setMessage("Thread deleted!");
        setOpenComplete(true);
      } else {
        setError(data.error);
      }
    };
    if (user) {
      postDelete();
    }
  };

  useEffect(() => {
    threads && setThread(threads.filter((thread) => thread._id === id)[0]);
  }, [threads, id]);

  return (
    <div className={classes.Thread}>
      {thread && (
        <Paper elevation={4} className={classes.paper}>
          <div className={classes.title}>{thread.title}</div>
          <div className={classes.thread__header}>
            <div className={classes.author_identity}>
              <img
                src={avatar2}
                alt="avatar"
                className={classes.author_identity__avatar}
              ></img>
              <div className={classes.author_identity__text}>
                <div className={classes.author_identity__firstRow}>
                  <div className={classes.author_identity__name}>
                    {thread.author.name}
                  </div>
                  <div className={classes.author_identity__role}>
                    {thread.author.role}
                  </div>
                </div>
                <div className={classes.author_identity__time}>
                  {moment(thread.createdAt).fromNow()}
                </div>
              </div>
            </div>
            <div className={classes.thread__icons}>
              <div className={classes.thread__icon}>
                <PushPinIcon className={classes.icon__icon} />
                <div className={classes.icon__text}>Pinned</div>
              </div>
              <div className={classes.thread__icon}>
                <StarIcon className={classes.icon__icon} />
                <div className={classes.icon__text}>Star</div>
              </div>
              <div className={classes.thread__icon}>
                <div className={classes.numViews}>92</div>
                <div className={classes.icon__text}>Views</div>
              </div>
            </div>
          </div>
          <div className={classes.thread__post}>{thread.body}</div>
          <div className={classes.thread__actions}>
            <Button>Heart</Button>
            <Button onClick={handleOpen}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
          <Button className={classes.addCommentButton}>
            <ChatBubbleOutlineIcon />
            Add comment
          </Button>
          <div className={classes.comments}>
            <div className={classes.comment}>
              <img
                src={avatar1}
                alt="avatar"
                className={classes.comment__avatar}
              ></img>
              <div className={classes.comment_post}>
                <div className={classes.post__header}>
                  <div className={classes.header__name}>Benjamin Scnider</div>
                  <div className={classes.header__time}>17h</div>
                </div>
                <div className={classes.post__content}>
                  I enjoyed reading the study on the Pile metaphor because I
                  suspect its inclusion in the readings relates to the
                  similarity between their methods and the series of M
                  assignments in this class (and the eventual project). It's
                  nice to see a professional paper describe their process, how
                  they pivoted their analysis in light of research findings, and
                  eventually propose a working model for a "pile" classification
                  system. And, in Norman's description of Reason’s Swiss Cheese
                  Model of Accidents, I was reminded of a similar Swiss cheese
                  metaphor used to describe the various layers of protection for
                  infectious diseases (specifically, COVID-19). It's the same
                  concept - that multiple layers decrease the likelihood of the
                  holes lining up - but it's interesting to see it in an
                  entirely different domain. And, since it's a metaphor, you get
                  a head start at forming a correct mental model which I imagine
                  is important in teaching the public about protecting
                  themselves from infectious diseases. Lastly, the section in
                  The Design of Everyday Things discussing systems that consider
                  humans as another part of the machine, rather than as a
                  collaborator, reminded me of the various reports from people
                  working in Amazon warehouses. In the linked article, the
                  author Emily Guendelsberger (who spent some time doing the
                  job) notes:
                </div>
                <div className={classes.post__actions}>
                  Heart Reply Edit Delete
                </div>
              </div>
            </div>
          </div>
        </Paper>
      )}
      <Modal
        open={open || false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <FormModal title="Edit Thread">
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

export default Thread;
