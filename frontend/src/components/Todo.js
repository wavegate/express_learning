import classes from "../scss_modules/Todo.module.scss";
import Header from "./Header.js";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import useAppContext from "../hooks/useAppContext";
import { useState, useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { Helmet } from "react-helmet-async";

const Todo = () => {
  const { user } = useAuthContext();
  const { todos, dispatch } = useAppContext();
  const [formData, setFormData] = useState({
    title: "test",
    description: "test",
  });
  const [error, setError] = useState();

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
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
      const response = await fetch(`/todos/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "CREATE_TODO", payload: data });
      } else {
        setError(data.error);
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
      <div className="newTaskForm">
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={formData.title}
          ></input>
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={formData.description}
          ></input>
          <label>Due</label>
          <input
            type="date"
            name="dueDate"
            onChange={handleChange}
            value={formData.dueDate}
          ></input>
          <label>Priority</label>
          <input
            type="text"
            placeholder="Priority"
            name="priority"
            onChange={handleChange}
            value={formData.priority}
          ></input>
          <button type="submit">Add Todo</button>
        </form>
      </div>
      {todos &&
        todos.map((item) => (
          <li key={item._id}>
            <div className="task">
              <input name="task" type="checkbox" />
              <label htmlFor="task">Complete</label>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Due date: {item.dueDate}</p>
              <div className="priority">Priority: {item.priority}</div>
              <button>Edit button</button>
              <button>Delete button</button>
            </div>
          </li>
        ))}
    </div>
  );
};

export default Todo;
