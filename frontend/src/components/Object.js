import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import useAppContext from "../hooks/useAppContext";
import useAuthContext from "../hooks/useAuthContext";
import Button from "@mui/material/Button";
import { Helmet } from "react-helmet-async";
import Error from "./Error.js";

const Object = () => {
  const { user } = useAuthContext();
  const { dispatch } = useAppContext();
  const { objects } = useAppContext();
  const params = useParams();
  const history = useNavigate();
  const [object, setObject] = useState();

  const handleDelete = () => {
    const deleteLink = `/objects/${params.id}`;
    async function deleteObject() {
      const response = await fetch(deleteLink, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_OBJECT", payload: data });
        history("/");
      }
    }
    if (user) {
      deleteObject();
    }
  };

  useEffect(() => {
    objects &&
      setObject(objects.filter((object) => object._id === params.id)[0]);
  }, [objects, params.id]);

  return object ? (
    <div className="Object">
      <Helmet>
        <title>{Object.name}</title>
      </Helmet>
      {user && (
        <Fragment>
          <h1>{object.name}</h1>
          <p>{object.description}</p>
          <Button onClick={handleDelete} variant="contained">
            Delete
          </Button>
        </Fragment>
      )}
      {!user && <p>Please login to continue.</p>}
    </div>
  ) : (
    <Error />
  );
};

export default Object;
