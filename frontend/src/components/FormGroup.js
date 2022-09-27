import classes from "../scss_modules/FormGroup.module.scss";

const FormGroup = (props) => {
  return <div className={classes.FormGroup}>{props.children}</div>;
};

export default FormGroup;
