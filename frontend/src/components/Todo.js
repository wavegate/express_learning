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
// import Select from "react-select";

const Todo = () => {
  const { user } = useAuthContext();
  const { todos, dispatch } = useAppContext();
  const [formData, setFormData] = useState({
    title: "test",
    description: "testdescription",
  });
  const [error, setError] = useState();
  const [editError, setEditError] = useState();
  const [open, setOpen] = useState();
  const [editFormData, setEditFormData] = useState({});
  const handleOpen = (item_id) => {
    setOpen(true);
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

  const handleClose = () => {
    setOpen(false);
    setEditFormData({});
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
        setFormData({ title: "test", description: "testdescription" });
        setError();
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
        handleClose();
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
        <div className="newTaskForm">
          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={formData.title || ""}
            ></input>
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              value={formData.description || ""}
            ></input>
            <label>Due</label>
            <input
              type="date"
              name="dueDate"
              onChange={handleChange}
              value={moment(formData.dueDate).format("YYYY-MM-DD") || ""}
            ></input>
            <label>Priority</label>
            <select
              value={formData.priority || "medium"}
              name="priority"
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button type="submit">Add Todo</button>
          </form>
          {error && <Alert severity="error">{error}</Alert>}
        </div>
        {todos &&
          todos.map((item) => (
            <TodoItem
              key={item._id}
              data={item}
              handleOpen={handleOpen}
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
          <form onSubmit={handleEditSubmit} className={classes.editTaskForm}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleEditChange}
              value={editFormData.title || ""}
            ></input>
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleEditChange}
              value={editFormData.description || ""}
            ></input>
            <label>Due</label>
            <input
              type="date"
              name="dueDate"
              onChange={handleEditChange}
              value={moment(editFormData.dueDate).format("YYYY-MM-DD") || ""}
            ></input>
            <label>Priority</label>
            <select name="priority" defaultValue={editFormData.priority || ""}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button type="submit">Edit Todo</button>
          </form>
          {editError && <Alert severity="error">{editError}</Alert>}
        </div>
      </Modal>
    </div>
  );
};

export default Todo;
