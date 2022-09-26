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
      <div className={classes.content}>
        <ContentCard title="Welcome to Web Dev!">
          <p>
            Welcome to the Argos offering of CS101: Web Dev! I’m thrilled to be
            teaching this class in this program. Over the past several semesters
            of working with Argos students, I’ve been amazed at the passion,
            experience, and qualifications that so many people bring. I’m
            excited to have the opportunity to channel that excitement into a
            topic with so much potential for real-world impact. From healthcare
            to autonomous vehicles, from education to the environment, Web Dev
            is at the heart of many world-changing endeavors.
          </p>
          <p>
            The goal of this page is to give you a high-level overview of what
            this class entails. For specific information on the schedule,
            assignments, or grading of a particular semester, please see that
            semester’s dedicated page.
          </p>
        </ContentCard>
        <ContentCard title="Readiness">
          <p>
            This class does not have significant prerequisites before
            participation.
          </p>
        </ContentCard>
        <ContentCard title="Course Description">
          <p>
            This course is an introductory course on human-computer interaction.
            It does not presuppose any earlier knowledge of human-computer
            interaction, computer science, or psychology. The class covers three
            broad categories of topics within human-computer interaction: (a)
            the principles and characteristics of the interaction between humans
            and computers; (b) the techniques for designing and evaluating
            user-centered systems; and (c) current areas of cutting-edge
            research and development in human-computer interaction.
          </p>
        </ContentCard>
        <ContentCard title="Course Description">
          <p>This course is broken into five units:</p>
          <ul>
            <li>
              Unit 1: Introduction. The first unit serves as your introduction
              to the field of HCI. It introduces you to HCI’s place in a
              hierarchy of fields such as human factors engineering and user
              experience design, as well as covers the structure of this course.
              It also provides some initial exposure to the breadth of the HCI
              field and how it touches on topics like virtual reality,
              healthcare, and context-sensitive interfaces.
            </li>
          </ul>
        </ContentCard>
      </div>
    </div>
  );
};

export default Syllabus;
