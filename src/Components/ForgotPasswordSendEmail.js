import { emitter } from "./Navbar";
import { snackbarEmitter } from "./SnackbarComponent";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SnackbarComponent from "./SnackbarComponent";
import "../CSS/LoginAndRegisterComponent.css";
import { validateEmail } from "./helper/Helper";
import axios from "axios";

const ForgotPasswordSendEmail = () => {
  const [email, setEmail] = useState("");
  const [emailLabel, setEmailLabel] = useState("Email");
  const [pending, setPending] = useState(false);
  const [formSuccess, setFormSucess] = useState(false);
  const history = useHistory();

  // eslint-disable-next-line
  const handleCredentialCheck = (objRecieved) => {
    let email = objRecieved.email;
    let password = objRecieved.password;
    if (
      (email === "srijita@seal.com" && password === "arnab") ||
      (email === "csounakdey@gmail.com" && password === "1234")
    ) {
      console.log("Successfully logged in");
      localStorage.setItem("isloggedin", true);
      emitter.emit("setlogindetails", true);
      history.push("/dashboard");
      // console.log("localstorage",localStorage.getItem("loggedIn"));
    } else {
      snackbarEmitter.emit("showsnackbar", {
        snackbarText: "Invalid Credentials",
        snackbarColor: "error",
      });
      // console.log("Invalid Credentials");
    }
  };
  const handleForgotPassword = () => {
    if (!validateEmail(email)) {
      setEmailLabel("Invalid Email");
      snackbarEmitter.emit("showsnackbar", {
        snackbarText: "Invalid Credentials",
        snackbarColor: "error",
      });
    } else {
      axios
        .post("api/users/resetpassword/createtoken", {
          email: email,
        })
        .then((data) => {
          setPending(false);
          // console.log(data);
          if (data.data.status === 200) {
            // handleResetForgotPassword();
            setFormSucess(true);
            snackbarEmitter.emit("showsnackbar", {
              snackbarText: "Email Sent",
              snackbarColor: "success",
              snackbarOnCloseRoute: "/",
            });
          } else if (data.data.status === 500) {
            snackbarEmitter.emit("showsnackbar", {
              snackbarText: "Some error occured",
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
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: "Some error occured.",
            snackbarColor: "error",
          });
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);
    let objTosend = {
      email: email,
    };
    // console.log("objTosend", objTosend);
    handleForgotPassword(objTosend);
    // handleCredentialCheck(objTosend);
  };

  return (
    <div className="login-component">
      {formSuccess && (
        <div>
          <h3>Reset Link has been sent via the Email provided Successfully.</h3>
        </div>
      )}
      {/* Forgot Password Form*/}
      {formSuccess === false && (
        <div className="form" onSubmit={handleSubmit}>
          <div className="form_logo">
            For<span>got</span> Password
          </div>
          <div className="form_title">
            Forgot <span>Password</span>
          </div>
          <form className="form_items">
            <div className="form_inputs">
              <input
                type="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onFocus={() => {
                  setEmailLabel("Email");
                }}
                onBlur={() => {
                  email.length > 0 && !validateEmail(email)
                    ? setEmailLabel("")
                    : setEmailLabel("Email");
                }}
              />
              <label>{emailLabel}</label>
            </div>
            {!pending && <button className="form_button">Confirm</button>}
          </form>
          <div className="form_other">
            <Link to="/login" className="btn btn-primary">
              Sign In
            </Link>
            <Link to="/registration" className="btn btn-primary">
              Join Now
            </Link>
          </div>
        </div>
      )}
      <SnackbarComponent />
    </div>
  );
};

export default ForgotPasswordSendEmail;
