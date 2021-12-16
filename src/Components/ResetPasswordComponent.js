import { snackbarEmitter } from "./SnackbarComponent";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SnackbarComponent from "./SnackbarComponent";
import "../CSS/LoginAndRegisterComponent.css";
import axios from "axios";

const ResetPasswordComponent = () => {
  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [formSuccess, setFormSucess] = useState(false);
  const [tokenIsValid, setTokenIsValid] = useState(false);

  useEffect(() => {
    handleResetPasswordTokenValidation();
  }, []);

  const handleResetResetPassword = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const handleResetPasswordTokenValidation = () => {
    setPending(true);
    let lastItemOfPath = window.location.pathname.split("/").pop();
    // console.log("location", lastItemOfPath);
    setResetPasswordToken(lastItemOfPath);
    // console.log("Reset Password Token Verification", match.params);
    if (
      lastItemOfPath === "" ||
      lastItemOfPath === undefined ||
      lastItemOfPath === null ||
      lastItemOfPath.length === 0
    ) {
      snackbarEmitter.emit("showsnackbar", {
        snackbarText: "Invalid Reset Password Token",
        snackbarColor: "error",
      });
      return;
    }
    let payload = { token: lastItemOfPath };
    axios
      .post("/api/users/resetpassword/validatetoken", payload)
      .then((data) => {
        // console.log("data", data);
        setPending(false);
        // console.log(data);
        if (data.data.status === 200 && data.data.validity === true) {
          setTokenIsValid(true);
        } else if (data.data.status === 500) {
          snackbarEmitter.emit("showsnackbar", {
            snackbarText:
              "Some error occured, maybe the token is tamper or expired.",
            snackbarColor: "error",
            snackbarOnCloseRoute: "/forgotpassword",
          });
        } else {
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: data.data.message,
            snackbarColor: "error",
            snackbarOnCloseRoute: "/forgotpassword",
          });
        }
      })
      .catch((error) => {
        // console.log(error);
        setPending(false);
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: "Token ",
          snackbarColor: "error",
          snackbarOnCloseRoute: "/forgotpassword",
        });
      });
  };

  const handleResetPassword = (payload) => {
    axios
      .post("/api/users/resetpassword", payload)
      .then((data) => {
        setPending(false);
        setFormSucess(true);
        // console.log(data);
        if (data.data.status === 500) {
          snackbarEmitter.emit("showsnackbar", {
            snackbarText:
              "Some error occured, maybe the token is tamper or expired.",
            snackbarColor: "error",
            snackbarOnCloseRoute: "/forgotpassword",
          });
        } else if (data.data.status !== 200 && data.data.status !== 500) {
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: data.data.message,
            snackbarColor: "error",
          });
        } else {
          handleResetResetPassword();
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: data.data.message,
            snackbarColor: "success",
            snackbarOnCloseRoute: "/login",
          });
        }
      })
      .catch((error) => {
        setPending(false);
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: error.message,
          snackbarColor: "error",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let objTosend = {
      token: resetPasswordToken,
      password: password,
      confirmPassword: confirmPassword,
    };
    // console.log("objTosend", objTosend);
    if (password === confirmPassword) {
      // handleCredentialCheck(objTosend);
      setPending(true);

      handleResetPassword(objTosend);
    } else {
      snackbarEmitter.emit("showsnackbar", {
        snackbarText:
          "confirm password should be same as new password provided",
        snackbarColor: "error",
      });
    }
  };

  return (
    <div className="login-component">
      {!tokenIsValid && (
        <div>
          <h3>The Provided Token is Incorrect</h3>
        </div>
      )}
      {formSuccess && tokenIsValid && (
        <div>
          <h3>Your Password has been successfully reset.</h3>
          <br />
          <Link to="/login" className="login-logout-btn">
            <strong> Go to Login</strong>
          </Link>
        </div>
      )}
      {/* Reset Password Form  */}
      {!formSuccess && tokenIsValid && (
        <div className="form" onSubmit={handleSubmit}>
          <div className="form_logo">
            <span>Reset</span>Password
          </div>
          <div className="form_title">
            Re<span>set-</span>Password
          </div>
          <form className="form_items">
            <div className="form_inputs">
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <label>new password</label>
            </div>
            <div className="form_inputs">
              <input
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
              />
              <label>confirm password</label>
            </div>
            {!formSuccess && !pending && (
              <button className="form_button">Reset Password</button>
            )}
          </form>
        </div>
      )}
      <SnackbarComponent />
    </div>
  );
};

export default ResetPasswordComponent;
