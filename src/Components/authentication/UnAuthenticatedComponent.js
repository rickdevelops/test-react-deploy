import { Redirect } from "react-router-dom";
import { getToken } from "./AuthComponent";

const UnAuthenticatedComponent = ({ component: C }) => {
  return (
    <>
      {/* <h1> UnAuthenticatedRoute</h1> */}
      {!getToken() ? (
        <C />
      ) : (
        <>
          <h1>UnAuthenticated</h1>
          <Redirect to="/dashboard" />
        </>
      )}
    </>
  );
};

export default UnAuthenticatedComponent;
