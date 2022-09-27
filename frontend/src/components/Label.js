import classes from "../scss_modules/Input.module.scss";

const Input = (props) => {
  return (
    <label className={classes.Label} htmlFor={props.htmlFor}>
      {props.children}
    </label>
  );
};

export default Input;
