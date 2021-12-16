import { emitter } from "../Navbar";

const AuthComponent = () => {
  return <div className="auth-component"></div>;
};

export default AuthComponent;

function parseJwt(token) {
  try {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
    // return true;
  } catch (e) {
    return false;
  }
}

export const getToken = () => {
  let token = localStorage.getItem("token");
  let verifiedToken = parseJwt(token);
  // console.log(verifiedToken);
  if (verifiedToken !== false) {
    return true;
  } else {
    return false;
  }
};

// Logout EventEmitter
export const logoutUser = () => {
  // console.log("logout");
  emitter.emit("setlogoutuser");
};
