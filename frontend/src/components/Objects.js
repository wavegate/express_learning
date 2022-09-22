import { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import useAuthContext from "../hooks/useAuthContext";
import { Helmet } from "react-helmet-async";

const Objects = () => {
  const { objects, dispatch } = useAppContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/objects", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_OBJECTS", payload: data });
      }
    };
    if (user) {
      fetchData();
    }
  }, [user, dispatch]);

  return (
    <div className="Objects">
      <Helmet>
        <title>All Objects</title>
      </Helmet>
      {user && (
        <Fragment>
          <h1>All Objects</h1>
          <ul>
            {objects &&
              objects.map((item) => (
                <li key={item._id}>
                  <Link to={`/${item._id}`}>
                    {item.name}, {item.createdAt}
                  </Link>
                </li>
              ))}
          </ul>
        </Fragment>
      )}
      {!user && <p>Please login to continue.</p>}
    </div>
  );
};

export default Objects;
