import { emitter } from "./Navbar";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getLastItemFromUrl } from "./helper/Helper";
import axios from "axios";
import SnackbarComponent, { snackbarEmitter } from "./SnackbarComponent";

const AccountActivationComponent = () => {
  const location = useLocation();
  const [pending, setPending] = useState(false);
  const [activation, setActivation] = useState(false);
  const [activationToken, setActivationToken] = useState(
    getLastItemFromUrl(location.pathname)
  );

  const history = useHistory();

  useEffect(() => {
    // console.log("activationToken", activationToken);
    const validateToken = async (activationToken) => {
      // console.log("activationToken", activationToken);
      setPending(true);

      if (activationToken && activationToken.length > 0) {
        axios.defaults.headers.common["Authorization"] = activationToken;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
      }

      await axios
        .post("/api/users/tokenvalidation")
        .then((data) => {
          // console.log(data);
          setPending(false);
          if (data.data.status !== 200 && data.status === 500) {
            snackbarEmitter.emit("showsnackbar", {
              snackbarText: `Some error occured. The token is not copied properly, or it's expired. Please try Logging in. `,
              snackbarColor: "error",
              snackbarOnCloseRoute: "/",
            });
            // history.push("/")
          } else {
            setActivation(true);
            localStorage.setItem("token", data.data.token.token);
            emitter.emit("setlogindetails", true);
            history.push("/dashboard");
          }
        })
        .catch((err) => {
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: `Some error occured. The link was not copied properly from the email or it might be tampered`,
            snackbarColor: "error",
            snackbarOnCloseRoute: "/",
          });
        });
    };

    setActivationToken(getLastItemFromUrl(location.pathname));
    validateToken(activationToken);
  }, [activationToken, history, location.pathname]);

  return (
    <>
      {pending && <h3>Loading... </h3>}
      {!pending && activation && <h3>Account has been activated.</h3>}
      {!pending && !activation && (
        <h3>
          Some error occured, Please copy the link properly, or try logging in
          your Account
        </h3>
      )}
      <SnackbarComponent />
    </>
  );
};

export default AccountActivationComponent;
