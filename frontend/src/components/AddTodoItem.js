const AddTodoItem = (props) => {
  return (
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
  );
};

export default AddTodoItem;
