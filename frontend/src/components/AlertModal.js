import Modal from "@mui/material/Modal";
import ContentCard from "./ContentCard.js";
import classes from "../scss_modules/AlertModal.module.scss";
import checkmarkAnimation from "../data/checkmarkAnimation.json";
import { Fragment } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Button from "./Button.js";

const AlertModal = (props) => {
  //   const handleClick = (event) => {
  //     if (event.target.id === "modal" || event.target.id === "closeButton") {
  //       props.handleClose();
  //     }
  //     console.log(checkmarkAnimation);
  //   };

  return (
    <Modal
      open={props.open || false}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={classes.content}>
        <ContentCard title={props.title}>
          <Player
            autoplay={true}
            keepLastFrame={true}
            src={JSON.stringify(checkmarkAnimation)}
          />
        </ContentCard>
      </div>
    </Modal>
  );
};

export default AlertModal;
