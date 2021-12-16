// import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
// import { useParams } from "react-router";
import { getToken } from "./AuthComponent";

const AuthenticatedRoute = ({ component: C, appProps, ...rest }) => {
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  // const paramDetails = rest.computedMatch.params.id;
  // const paramDetails = rest.computedMatch.params.id;
  // useEffect(() => {
  //   let loggedInTokenValue = getToken();
  //   setIsUserLoggedIn(loggedInTokenValue);
  // }, [setIsUserLoggedIn]);

  // useEffect(() => {
  //   let loggedInTokenValue = getToken();
  //   if (loggedInTokenValue) {
  //     return (
  //       <Route {...rest}>
  //         <C paramDetails={rest} />
  //       </Route>
  //     );
  //   }
  // }, [getToken(), C, rest]);
  (function () {
    let token = localStorage.getItem("token");
    if (getToken()) {
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      axios.defaults.headers.common["Authorization"] = null;
      delete axios.defaults.headers.common["Authorization"];
      /*if setting null does not remove `Authorization` header then try     
           delete axios.defaults.headers.common['Authorization'];
         */
    }
  })();

  // console.log(rest);
  return (
    <>
      {/* <h1> AuthenticatedRoute</h1> */}
      {/* {getToken().toString()} */}
      {getToken() ? (
        <Route {...rest}>
          <C paramDetails={rest} />
        </Route>
      ) : (
        <>
          <h1>UnAuthenticated</h1>
          <Redirect to="/404" />
        </>
      )}
    </>
  );
};

export default AuthenticatedRoute;
