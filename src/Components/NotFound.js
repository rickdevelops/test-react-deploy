import "../CSS/NotFound.css";
import { useHistory } from "react-router";

const NotFound = () => {
  const history = useHistory();

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>That page cannot be found</p>
      {/* <Link to="/">Go back to Home page</Link> */}
      <button
        onClick={() => {
          history.go(-1);
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
