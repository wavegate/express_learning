import classes from "../scss_modules/StudentCard.module.scss";
import Card from "@mui/material/Card";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import truncate from "../utils/truncate";
import Button from "./Button";
import { Link } from "react-router-dom";

const StudentCard = (props) => {
  return (
    // <Card className={classes.StudentCard} elevation={4}>
    //   <div className={classes.leftSide}>
    //     <img src={props.photo} alt="student" className={classes.photo}></img>
    //   </div>
    //   <div className={classes.rightSide}>
    //     {props.name}
    //     {props.role}
    //     {props.bio.substring(0, 20) + "..."}
    //   </div>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className={classes.summary}>
          <img src={props.photo} alt="student" className={classes.photo}></img>
          <p>{props.name}</p>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.detail}>
        <p>{truncate(props.bio, 300)}</p>
        <Link to={`/profile/${props.id}`}>
          <Button>View profile</Button>
        </Link>
      </AccordionDetails>
    </Accordion>
    // </Card>
  );
};

export default StudentCard;
