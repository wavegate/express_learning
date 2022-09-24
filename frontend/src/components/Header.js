import classes from "../scss_modules/Header.module.scss";

const Header = (props) => {
  return (
    <div className={classes.header}>
      <div className={classes.iconBox}>{props.icon}</div>

      <div className={classes.header__text}>
        <div className={classes.header__title}>{props.title}</div>
        <div className={classes.header__subtitle}>{props.detail}</div>
      </div>
      <div className={classes.header__star}>Star button</div>
      <div className={classes.header__more}>More buttons</div>
    </div>
  );
};

export default Header;
