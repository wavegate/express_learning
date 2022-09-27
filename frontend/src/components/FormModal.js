import ContentCard from "./ContentCard";
import classes from "../scss_modules/FormModal.module.scss";

const FormModal = (props) => {
  return (
    <div className={classes.content}>
      <ContentCard title={props.title}>
        <div className={classes.FormModal}>{props.children}</div>
      </ContentCard>
    </div>
  );
};

export default FormModal;
