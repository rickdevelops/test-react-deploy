import { emitter } from "./Navbar";
import { snackbarEmitter } from "./SnackbarComponent";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SnackbarComponent from "./SnackbarComponent";
import "../CSS/LoginAndRegisterComponent.css";
import { validateEmail } from "./helper/Helper";
import axios from "axios";
import { BACKEND_URL } from "../Config/config";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailLabel, setEmailLabel] = useState("Email");
  const history = useHistory();

  const handleCredentialCheck = (objRecieved) => {
    let email = objRecieved.email;
    let password = objRecieved.password;
    axios
      .post(BACKEND_URL + "/api/users/login", {
        email: email,
        password: password,
      })
      .then((user) => {
        // console.log(user);
        if (user.data.status === 200 && user.data.hasOwnProperty("token")) {
          localStorage.setItem("token", user.data.token);
          emitter.emit("setlogindetails", true);
          history.push("/dashboard");
        } else if (user.data.status === 404) {
          snackbarEmitter.emit("showsnackbar", {
            snackbarText:
              user.data.message +
              ` with the email-id ${email} .\n Join now and create an account`,
            snackbarColor: "error",
          });
        } else if (user.data.status === 500) {
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: "Some error occured",
            snackbarColor: "error",
          });
        } else {
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: user.data.message,
            snackbarColor: "error",
          });
        }
      })
      .catch((err) => {
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: "some error occured.",
          snackbarColor: "error",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let objTosend = {
      email: email,
      password: password,
    };
    handleCredentialCheck(objTosend);
  };

  return (
    <div className="login-component">
      <div className="form" onSubmit={handleSubmit}>
        <div className="form_logo">
          Lo<span>g</span>in
        </div>
        <div className="form_title">
          Log<span>I</span>n
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
            {/* {!emailLabel && <label>Email</label>} */}
            <label>{emailLabel}</label>
          </div>
          <div className="form_inputs">
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <label>password</label>
          </div>
          <button className="form_button">Log In</button>
        </form>
        <div className="form_other">
          <Link to="/forgotpassword" className="btn btn-primary">
            forgot password?
          </Link>
          <Link to="/registration" className="btn btn-primary">
            Join Now
          </Link>
        </div>
        <SnackbarComponent />
      </div>
    </div>
  );
};

export default LoginComponent;
