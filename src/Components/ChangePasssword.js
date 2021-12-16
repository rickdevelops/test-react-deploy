import { snackbarEmitter } from "./SnackbarComponent";
import { useState } from "react";
import { Link } from "react-router-dom";
import SnackbarComponent from "./SnackbarComponent";
import "../CSS/LoginAndRegisterComponent.css";
import axios from "axios";
import { logoutUser } from "./authentication/AuthComponent";
import { BACKEND_URL } from "../Config/config";

const ChangePasssword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const handleChangePassword = () => {
    setPending(true);
    let objTosend = {
      oldPassword: oldPassword,
      password: password,
      confirmPassword: confirmPassword,
    };
    axios
      .post(BACKEND_URL + "/api/users/changepassword", objTosend)
      .then((data) => {
        // console.log("data", data);
        setPending(false);
        if (data.data.status === 200) {
          setPasswordChangeSuccess(true);
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: "Password Changed Successfully",
            snackbarColor: "success",
          });
        } else if (data.data.status === 401) {
          logoutUser();
        } else if (data.data.status === 500) {
          snackbarEmitter.emit("showsnackbar", {
            snackbarText:
              "Some error occured. Please try again after some time.",
            snackbarColor: "error",
          });
        } else {
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: data.data.message,
            snackbarColor: "error",
          });
        }
      })
      .catch((err) => {
        setPending(false);
        console.log(err);
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: "Some error occured",
          snackbarColor: "error",
        });
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // handleCredentialCheck(objTosend);
      handleChangePassword();
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
      {pending && !passwordChangeSuccess && (
        <div>
          <h3> Loading... </h3>
        </div>
      )}
      {!pending && passwordChangeSuccess && (
        <div>
          <h3> Your password has been changed successfully. </h3>
          <br />
          <Link to="/settings" className="login-logout-btn">
            <strong> Go Back to Settings</strong>
          </Link>
        </div>
      )}
      {!passwordChangeSuccess && (
        <div className="form" onSubmit={handleSubmit}>
          <div className="form_logo" style={{ fontSize: "2rem" }}>
            <span>Change</span>Password
          </div>
          <div className="form_title">
            Change<span> Your </span>Password
          </div>
          <form className="form_items">
            <div className="form_inputs">
              <input
                type="password"
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                required
              />
              <label>old password</label>
            </div>
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
            <button className="form_button" disabled={pending}>
              Submit
            </button>
          </form>
        </div>
      )}
      <SnackbarComponent />
    </div>
  );
};

export default ChangePasssword;
