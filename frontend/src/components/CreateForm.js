import useAppContext from "../hooks/useAppContext";
import { useNavigate } from "react-router-dom";
import { useState, Fragment } from "react";
import classes from "../scss_modules/Form.module.scss";
import useAuthContext from "../hooks/useAuthContext";
import { Helmet } from "react-helmet-async";
import { TextField, Button, Alert } from "@mui/material";

const CreateForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useAppContext();
  const history = useNavigate();
  const [formData, setFormData] = useState();
  const [error, setError] = useState();

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const submitData = async () => {
      const response = await fetch(`/objects/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "CREATE_OBJECT", payload: data });
        history("/");
      } else {
        setError(data.error);
      }
    };
    if (user) {
      submitData();
    }
  };

  return (
    <div className="CreateForm">
      <Helmet>
        <title>Create New Object</title>
      </Helmet>
      {user && (
        <Fragment>
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
          {error && <Alert severity="error">{error}</Alert>}
        </Fragment>
      )}
      {!user && <p>Please login to continue.</p>}
    </div>
  );
};

export default CreateForm;
