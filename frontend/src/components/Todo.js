import classes from "../scss_modules/Todo.module.scss";
import Header from "./Header.js";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import useAppContext from "../hooks/useAppContext";
import { useState, useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { Helmet } from "react-helmet-async";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import moment from "moment";
import TodoItem from "./TodoItem.js";
import AddIcon from "@mui/icons-material/Add";
// import Select from "react-select";

const Todo = () => {
  const { user } = useAuthContext();
  const { todos, dispatch } = useAppContext();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const [editError, setEditError] = useState();
  const [open, setOpen] = useState();
  const [editOpen, setEditOpen] = useState();
  const [editFormData, setEditFormData] = useState({});
  const handleOpen = () => {
    setOpen(true);
  };

  const handleEditOpen = (item_id) => {
    setEditOpen(true);
    const currentTodo = todos.filter((object) => object._id === item_id)[0];
    setEditFormData(currentTodo);
  };

  const handleDelete = (item_id) => {
    const postDelete = async () => {
      const response = await fetch(`/todos/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ item_id: item_id }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_TODO", payload: data });
      } else {
        setError(data.error);
      }
    };
    if (user) {
      postDelete();
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditFormData({});
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({});
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  const handleEditChange = ({ target }) => {
    setEditFormData({ ...editFormData, [target.name]: target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/todos", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: data });
      }
    };
    if (user) {
      fetchData();
    }
  }, [user, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const submitData = async () => {
      const utcDate = new moment(formData.dueDate).utc().format();
      const response = await fetch(`/todos/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...formData, dueDate: utcDate }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "CREATE_TODO", payload: data });
        setFormData({
          title: "test",
          description: "This is a test description.",
        });
        setError();
        handleClose();
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
      const utcDate = new moment(editFormData.dueDate).utc().format();
      const response = await fetch(`/todos/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...editFormData, dueDate: utcDate }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "UPDATE_TODO", payload: data });
        setEditError();
        handleEditClose();
      } else {
        setEditError(data.error);
      }
    };
    if (user) {
      submitData();
    }
  };

  return (
    <div className="Todo">
      <Helmet>
        <title>Todo</title>
      </Helmet>
      <Header
        title="Todo"
        detail="This page provides a standard Todo list application."
        icon={
          <PlaylistAddCheckIcon fontSize="large" className={classes.icon} />
        }
      />
      <div className={classes.content}>
        <button
          type="submit"
          onClick={handleOpen}
          className={`${classes.addNewButton} ${classes.button}`}
        >
          <AddIcon /> Add Todo Item
        </button>
        {todos &&
          todos.map((item) => (
            <TodoItem
              key={item._id}
              data={item}
              handleOpen={handleEditOpen}
              handleDelete={handleDelete}
            />
          ))}
      </div>
      <Modal
        open={open || false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes.modal}>
          <div className={classes.content_box}>
            <div className={classes.content_box__title}>
              <div>Add Todo Item</div>
              <button
                type="submit"
                onClick={handleSubmit}
                className={`${classes.todoForm__submit} ${classes.button}`}
              >
                <AddIcon /> Submit
              </button>
            </div>
            <div className={classes.content_box__text}>
              <form className={classes.todoForm}>
                <div
                  className={`${classes.todoForm__formGroup} ${classes.todoForm__title}`}
                >
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    id="title"
                    onChange={handleChange}
                    value={formData.title || ""}
                  ></input>
                </div>
                <div className={classes.todoForm__description}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    placeholder="Description"
                    name="description"
                    id="description"
                    onChange={handleChange}
                    value={formData.description || ""}
                  ></textarea>
                </div>
                <div
                  className={`${classes.todoForm__formGroup} ${classes.todoForm__dueDate}`}
                >
                  <label htmlFor="dueDate">Due date: </label>
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    onChange={handleChange}
                    value={moment(formData.dueDate).format("YYYY-MM-DD") || ""}
                  ></input>
                </div>
                <div
                  className={`${classes.todoForm__formGroup} ${classes.todoForm__priority}`}
                >
                  <label htmlFor="priority">Priority: </label>
                  <select
                    value={formData.priority || "medium"}
                    name="priority"
                    id="priority"
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </form>
              {error && <Alert severity="error">{error}</Alert>}
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={editOpen || false}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes.modal}>
          <div className={classes.content_box}>
            <div className={classes.content_box__title}>
              <div>Edit Todo Item</div>
              <button
                type="submit"
                onClick={handleEditSubmit}
                className={`${classes.todoForm__submit} ${classes.button}`}
              >
                <AddIcon /> Submit
              </button>
            </div>
            <div className={classes.content_box__text}>
              <form className={classes.todoForm}>
                <div
                  className={`${classes.todoForm__formGroup} ${classes.todoForm__title}`}
                >
                  <label htmlFor="editTitle">Title</label>
                  <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    id="editTitle"
                    onChange={handleEditChange}
                    value={editFormData.title || ""}
                  ></input>
                </div>
                <div className={classes.todoForm__description}>
                  <label htmlFor="editDescription">Description</label>
                  <textarea
                    placeholder="Description"
                    name="description"
                    id="editDescription"
                    onChange={handleEditChange}
                    value={editFormData.description || ""}
                  ></textarea>
                </div>
                <div
                  className={`${classes.todoForm__formGroup} ${classes.todoForm__dueDate}`}
                >
                  <label htmlFor="editDueDate">Due date: </label>
                  <input
                    type="date"
                    name="dueDate"
                    id="editDueDate"
                    onChange={handleEditChange}
                    value={
                      moment(editFormData.dueDate).format("YYYY-MM-DD") || ""
                    }
                  ></input>
                </div>
                <div
                  className={`${classes.todoForm__formGroup} ${classes.todoForm__priority}`}
                >
                  <label htmlFor="editPriority">Priority: </label>
                  <select
                    value={editFormData.priority || "medium"}
                    name="priority"
                    id="editPriority"
                    onChange={handleEditChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </form>
              {editError && <Alert severity="error">{editError}</Alert>}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Todo;
