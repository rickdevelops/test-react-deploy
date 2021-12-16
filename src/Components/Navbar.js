import { useEffect, useState } from "react";
import { EventEmitter } from "fbemitter";
import { Link, useHistory } from "react-router-dom";
import { getToken } from "./authentication/AuthComponent";
import NavDrawer from "./NavDrawer";
import "../CSS/Navbar.css";

export const emitter = new EventEmitter();

const Navbar = () => {
  // let name="mario";
  const history = useHistory();
  // const [name, setName] = useState("mario");
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [loggedInState, setLoggedInState] = useState("Login");

  useEffect(() => {
    const listener = emitter.addListener("setlogindetails", (logindetails) => {
      // console.log("logindetails", logindetails);
      checkIsLoggedIn(logindetails);
    });
    const logoutListener = emitter.addListener("setlogoutuser", () => {
      // console.log("logoutdetails");
      handleLogout();
    });
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") && getToken()) {
      checkIsLoggedIn(true);
    }
    return () => {
      listener.remove();
      logoutListener.remove();
    };
    // eslint-disable-next-line
  }, []);

  // const handleLoginWithName = (name) => {
  //   console.log("Hello " + name);
  //   setName(name);
  // };

  const checkIsLoggedIn = (logindetails) => {
    // console.log("logindetails", logindetails);
    // console.log(localStorage.getItem("token"));
    if (getToken() === true && logindetails === true) {
      setUserIsLoggedIn(true);
      setLoggedInState("Logout");
    } else {
      setUserIsLoggedIn(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserIsLoggedIn(false);
    setLoggedInState("Login");
    history.push("/");
  };

  return (
    <nav className="navbar">
      {/* <h1>The Q&A Blog</h1> */}
      {getToken() && <NavDrawer />}
      <Link to={userIsLoggedIn ? "/dashboard" : "/"}>
        <h1>
          Q<span>-</span>Bank
        </h1>
      </Link>
      <div className="links">
        {/* <a href="/">Dashboard</a> */}
        {getToken() && (
          <Link
            to="/createquestion"
            className="btn btn-primary create-question-btn"
          >
            <strong> Create Question</strong>
          </Link>
        )}
        <Link
          className="login-logout-btn"
          to={userIsLoggedIn ? "/" : "/login"}
          onClick={userIsLoggedIn ? handleLogout : null}
          style={{
            color: "white",
          }}
        >
          {loggedInState}
        </Link>
        {/* <button onClick={() => handleLoginWithName("luigi")}>Register</button>
        <span
          style={{
            marginRight: "2rem",
            marginLeft: "0.4rem",
          }}
        >
          {name}
        </span> */}
      </div>
    </nav>
  );
};

export default Navbar;
