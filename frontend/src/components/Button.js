import classes from "../scss_modules/Button.module.scss";

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={classes.Button} id={props.id}>
      {props.children}
    </button>
  );
};

export default Button;
