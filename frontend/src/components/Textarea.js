import classes from "../scss_modules/Textarea.module.scss";

const Textarea = (props) => {
  return (
    <textarea
      className={classes.Textarea}
      placeholder={props.placeholder || ""}
      name={props.name || ""}
      id={props.id || ""}
      onChange={props.onChange || undefined}
      value={props.value || ""}
    ></textarea>
  );
};

export default Textarea;
