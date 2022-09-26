import Paper from "@mui/material/Paper";
import classes from "../scss_modules/ContentCard.module.scss";

const ContentCard = (props) => {
  return (
    <Paper
      elevation={4}
      className={`${props.className} ${classes.ContentCard}`}
    >
      {props.title && <div className={classes.title}>{props.title}</div>}
      <div className={classes.content}>{props.children}</div>
    </Paper>
  );
};

export default ContentCard;
