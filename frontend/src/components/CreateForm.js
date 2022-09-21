import { useAppContext } from "../hook/useAppContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import classes from "../scss_modules/CreateForm.module.scss";
import { Helmet } from "react-helmet";
import { TextField, Button } from "@mui/material";

const CreateForm = () => {
  const { dispatch } = useAppContext();
  const history = useNavigate();
  const [formData, setFormData] = useState();

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const submitData = async () => {
      const response = await fetch(`/users/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "CREATE_OBJECT", payload: data });
        history("/");
      }
    };
    submitData();
  };

  return (
    <div className="CreateForm">
      <Helmet>
        <title>Create New Object</title>
      </Helmet>
      <h1>Create Object</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;
