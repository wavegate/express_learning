import classes from "../scss_modules/Todo.module.scss";
import Header from "./Header.js";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const Todo = () => {
  return (
    <div className="Todo">
      <Header
        title="Todo"
        detail="This page provides a standard Todo list application."
        icon={
          <PlaylistAddCheckIcon fontSize="large" className={classes.icon} />
        }
      />
      <div className="newTaskForm">
        <form>
          <label>Title</label>
          <input type="text"></input>
          <label>Description</label>
          <input type="text"></input>
          <label>Due</label>
          <input type="date"></input>
          <label>Priority</label>
          <input type="text"></input>
        </form>
      </div>
      <div className="task">
        <input name="task" type="checkbox" />
        <label htmlFor="task">Complete</label>
        <h3>Write for Sarah</h3>
        <p>
          Eldest father can design tastes did joy settle. Roused future he ye an
          marked. Arose mrrapid in so vexed words. Gay welcome led add lasting
          chiefly say looking.
        </p>
        <p>Due date: 10/10/2020</p>
        <div className="priority">Priority</div>
        <button>Edit button</button>
        <button>Delete button</button>
      </div>
    </div>
  );
};

export default Todo;
