import classes from "../scss_modules/Syllabus.module.scss";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Header from "./Header.js";
import ContentCard from "./ContentCard.js";

const Syllabus = () => {
  return (
    <div className={classes.Syllabus}>
      <Header
        title="Syllabus"
        detail="This page provides information about the Argos CS101 class on Web Development relevant only to the Fall 2022 semester."
        icon={<MenuBookIcon fontSize="large" className={classes.icon} />}
      />
      <ContentCard title="Curriculum">
        <div>Hi</div>
      </ContentCard>
      <div className={classes.content}>
        <div className={classes.content_box}>
          <div className={classes.content_box__title}>Curriculum</div>
          <div className={classes.content_box__text}>
            <ul>
              <li>1.1</li>
              <li>1.2</li>
              <li>1.3</li>
              <li>1.4</li>
              <li>1.5</li>
              <li>1.6</li>
              <li>1.7</li>
            </ul>
          </div>
        </div>
        <div className={classes.content_box}>
          <div className={classes.content_box__title}>Grading</div>
          <div className={classes.content_box__text}>
            <p>
              Final grades will be calculated as an average of all individual
              grade components, weighted according to the percentages below.
              Students receiving a final average of 90 or above will receive an
              A; of 80 to 90 will receive a B; of 70 to 80 will receive a C; of
              60 to 70 will receive a D; and of below 60 will receive an F.
              There is no curve. It is intentionally possible for every student
              in the class to receive an A.
            </p>
            <p>
              Final grades will be calculated as an average of all individual
              grade components, weighted according to the percentages below.
              Students receiving a final average of 90 or above will receive an
              A; of 80 to 90 will receive a B; of 70 to 80 will receive a C; of
              60 to 70 will receive a D; and of below 60 will receive an F.
              There is no curve. It is intentionally possible for every student
              in the class to receive an A.
            </p>
            <p>
              Final grades will be calculated as an average of all individual
              grade components, weighted according to the percentages below.
              Students receiving a final average of 90 or above will receive an
              A; of 80 to 90 will receive a B; of 70 to 80 will receive a C; of
              60 to 70 will receive a D; and of below 60 will receive an F.
              There is no curve. It is intentionally possible for every student
              in the class to receive an A.
            </p>
            <p>
              Final grades will be calculated as an average of all individual
              grade components, weighted according to the percentages below.
              Students receiving a final average of 90 or above will receive an
              A; of 80 to 90 will receive a B; of 70 to 80 will receive a C; of
              60 to 70 will receive a D; and of below 60 will receive an F.
              There is no curve. It is intentionally possible for every student
              in the class to receive an A.
            </p>
            <p>
              Final grades will be calculated as an average of all individual
              grade components, weighted according to the percentages below.
              Students receiving a final average of 90 or above will receive an
              A; of 80 to 90 will receive a B; of 70 to 80 will receive a C; of
              60 to 70 will receive a D; and of below 60 will receive an F.
              There is no curve. It is intentionally possible for every student
              in the class to receive an A.
            </p>
            <p>
              Final grades will be calculated as an average of all individual
              grade components, weighted according to the percentages below.
              Students receiving a final average of 90 or above will receive an
              A; of 80 to 90 will receive a B; of 70 to 80 will receive a C; of
              60 to 70 will receive a D; and of below 60 will receive an F.
              There is no curve. It is intentionally possible for every student
              in the class to receive an A.
            </p>
            <p>
              Final grades will be calculated as an average of all individual
              grade components, weighted according to the percentages below.
              Students receiving a final average of 90 or above will receive an
              A; of 80 to 90 will receive a B; of 70 to 80 will receive a C; of
              60 to 70 will receive a D; and of below 60 will receive an F.
              There is no curve. It is intentionally possible for every student
              in the class to receive an A.
            </p>
            <p>
              Final grades will be calculated as an average of all individual
              grade components, weighted according to the percentages below.
              Students receiving a final average of 90 or above will receive an
              A; of 80 to 90 will receive a B; of 70 to 80 will receive a C; of
              60 to 70 will receive a D; and of below 60 will receive an F.
              There is no curve. It is intentionally possible for every student
              in the class to receive an A.
            </p>
            <p>
              Final grades will be calculated as an average of all individual
              grade components, weighted according to the percentages below.
              Students receiving a final average of 90 or above will receive an
              A; of 80 to 90 will receive a B; of 70 to 80 will receive a C; of
              60 to 70 will receive a D; and of below 60 will receive an F.
              There is no curve. It is intentionally possible for every student
              in the class to receive an A.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Syllabus;
