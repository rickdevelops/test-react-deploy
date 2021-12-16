import { BrowserRouter as Route, Redirect } from "react-router-dom";
import { getToken } from "./AuthComponent";

const UnAuthenticatedRoute = ({ component: C, appProps, ...rest }) => {
  return (
    <>
      {/* <h1> UnAuthenticatedRoute</h1> */}
      {!getToken() ? (
        <Route {...rest}>
          <C />
        </Route>
      ) : (
        <>
          <h1>UnAuthenticated</h1>
          <Redirect to="/dashboard" />
        </>
      )}
    </>
  );
};

export default UnAuthenticatedRoute;
