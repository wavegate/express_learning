import classes from "../scss_modules/Input.module.scss";

const Input = (props) => {
  return (
    <input
      className={classes.Input}
      type={props.type}
      placeholder={props.placeholder || ""}
      name={props.name || ""}
      id={props.id || ""}
      onChange={props.onChange || undefined}
      value={props.value || ""}
    ></input>
  );
};

export default Input;
