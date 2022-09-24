import moment from "moment";
import classes from "../scss_modules/TodoItem.module.scss";
import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoItem = (props) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState();
  const [color, setColor] = useState();
  useEffect(() => {
    const priority = props.data.priority;
    switch (priority) {
      case "low":
        setColor("#4CE1B6");
        break;
      case "medium":
        setColor("#F6DA6E");
        break;
      case "high":
        setColor("#FF4861");
        break;
      default:
        break;
    }
  }, [props.data.priority]);

  const handleDelete = (item_id) => {
    setDeleteIsLoading(true);
    props.handleDelete(item_id);
  };

  return (
    <div className={classes.TodoItem}>
      <Checkbox className={classes.check} />
      <div className={classes.text}>
        <h3>{props.data.title}</h3>
        <p>{props.data.description}</p>
      </div>
      <div className={classes.dueDate}>
        Due date: {moment(props.data.dueDate).format("M/D/YY")}
      </div>
      <div className={classes.priority}>
        Priority:
        <CircleIcon
          fontSize="small"
          style={{ color: color, marginTop: "1px" }}
        />
      </div>
      <div className={classes.buttons}>
        <button
          className={classes.button}
          onClick={() => props.handleOpen(props.data._id)}
        >
          <EditIcon /> Edit
        </button>
        <button
          className={classes.button}
          onClick={() => handleDelete(props.data._id)}
          disabled={deleteIsLoading}
        >
          <DeleteIcon /> Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
