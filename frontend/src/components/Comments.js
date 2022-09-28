import classes from "../scss_modules/Comments.module.scss";
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Comments = (props) => {
  const [formData, setFormData] = useState({});
  const [editFormData, setEditFormData] = useState({});
  const [error, setError] = useState();
  const [editError, setEditError] = useState();
  const [open, setOpen] = useState();
  const [editOpen, setEditOpen] = useState();
  const { threads, dispatch } = useAppContext();
  const { id } = useParams();
  const [openComplete, setOpenComplete] = useState();
  const { user } = useAuthContext();
  const [message, setMessage] = useState();

  const handleOpen = () => {
    setOpen(true);
    setFormData({});
  };

  const handleEditOpen = (item_id) => {
    setEditOpen(true);
    const currentComment = props.thread.comments.filter(
      (object) => object._id === item_id
    )[0];
    console.log(currentComment);
    setEditFormData(currentComment);
  };

  const handleCloseComplete = () => {
    setOpenComplete(false);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({});
    setError();
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditFormData({});
    setEditError();
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleEditChange = ({ target }) => {
    setEditFormData({ ...editFormData, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    console.log("submit");
    event.preventDefault();
    const submitData = async () => {
      const response = await fetch(`/comments/create/${props.thread._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...formData }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "CREATE_COMMENT", payload: data });
        setError();
        handleClose();
        setFormData({});
        setMessage("Comment created!");
        setOpenComplete(true);
      } else {
        setError(data.error);
      }
    };
    if (user) {
      submitData();
    }
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const submitData = async () => {
      const response = await fetch(`/comments/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...editFormData }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "UPDATE_COMMENT", payload: data });
        setEditError();
        handleEditClose();
        setEditFormData({});
        setMessage("Comment updated!");
        setOpenComplete(true);
      } else {
        setEditError(data.error);
      }
    };
    if (user) {
      submitData();
    }
  };

  const handleDelete = (item_id) => {
    const postDelete = async () => {
      const response = await fetch(`/comments/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ _id: item_id }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_COMMENT", payload: data });
        setMessage("Comment deleted!");
        setOpenComplete(true);
      } else {
        setError(data.error);
      }
    };
    if (user) {
      postDelete();
    }
  };

  return (
    <div className={classes.Comments}>
      <Button className={classes.addCommentButton} onClick={handleOpen}>
        <ChatBubbleOutlineIcon />
        Add comment
      </Button>
      <div className={classes.comments}>
        {props.thread.comments &&
          props.thread.comments.map((comment) => {
            return (
              <div className={classes.comment} key={comment._id}>
                <img
                  src={avatar1}
                  alt="avatar"
                  className={classes.comment__avatar}
                ></img>
                <div className={classes.comment_post}>
                  <div className={classes.post__header}>
                    <div className={classes.header__name}>
                      {comment.author.name}
                    </div>
                    <div className={classes.header__time}>
                      {moment(comment.createdAt).fromNow()}
                    </div>
                  </div>
                  <div className={classes.post__content}>{comment.body}</div>
                  <div className={classes.post__actions}>
                    <FavoriteBorderIcon />
                    <span onClick={() => handleEditOpen(comment._id)}>
                      Edit
                    </span>{" "}
                    <span onClick={() => handleDelete(comment._id)}>
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Modal
        open={open || false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <FormModal title="Add Comment">
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
      <Modal
        open={editOpen || false}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <FormModal title="Edit Comment">
            <FormGroup>
              <Label htmlFor="body">Body</Label>
              <Textarea
                name="body"
                id="body"
                onChange={handleEditChange}
                value={editFormData.body || ""}
              ></Textarea>
            </FormGroup>
            <Button type="submit" onClick={handleEditSubmit}>
              Submit
            </Button>
            {editError && <Alert severity="error">{editError}</Alert>}
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

export default Comments;
