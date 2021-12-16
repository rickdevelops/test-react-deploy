import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
// import * as React from "react";
import { useEffect, useState } from "react";
import SnackbarComponent, { snackbarEmitter } from "./SnackbarComponent";
import "../CSS/LoginAndRegisterComponent.css";
import { validateEmail } from "./helper/Helper";
import axios from "axios";
import { BACKEND_URL } from "../Config/config";

const RegistrationComponent = () => {
  let othersubjectObj = {
    description: "Others",
    is_active: true,
    slug: "others",
    subject_name: "Others",
    _id: "others",
  };
  // fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otherSubjectValue, setOtherSubjectValue] = useState("");
  const [emailLabel, setEmailLabel] = useState("Email");
  const [pending, setPending] = useState(false);
  const [registrationSucess, setRegistrationSuccess] = useState(false);

  const [subjectSelected, setSubjectSelected] = useState("");
  const [subjectOption, setSubjectOption] = useState([othersubjectObj]);
  const [otherSubjectSelected, setOtherSubjectSelected] = useState(false);

  // Get all the subjects from the database
  useEffect(() => {
    // Get all subjects from the Database
    getAllSubjects();
  }, []);

  useEffect(() => {
    if (
      subjectOption[subjectSelected] &&
      subjectOption[subjectSelected].slug === "others"
    ) {
      setOtherSubjectSelected(true);
    } else {
      setOtherSubjectSelected(false);
    }
  }, [subjectOption, subjectSelected]);

  const getAllSubjects = async () => {
    setPending(true);
    axios
      .get(BACKEND_URL + "/api/subjects")
      .then((data) => {
        // console.log("subjects", data);
        setPending(false);
        if (data.status === 200) {
          let othersubjectObj = {
            description: "Others",
            is_active: true,
            slug: "others",
            subject_name: "Others",
            _id: "others",
          };
          data.data.push(othersubjectObj);
          if (data.data && data.data.length > 0) {
            setSubjectOption(data.data);
          } else {
            setSubjectOption([othersubjectObj]);
          }
        } else {
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: "Some error occured. Please try after some time.",
            snackbarColor: "error",
          });
          return;
        }
      })
      .catch((err) => {
        // console.log(err);
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: `Some error occured. Please try after some time. \nError is ${err}`,
          snackbarColor: "error",
        });
      });
  };

  const validateCreateuserBodyExceptSubject = async () => {
    let objTosend = {
      fullname: fullName,
      // subjectcode: subjectOption[subjectSelected].slug,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    let result = {};
    await axios
      .post(BACKEND_URL + "/api/users/creationvalidation", objTosend)
      .then((data) => {
        // console.log("validation", data);
        if (data.data.status !== 200 && data.data.status !== 500) {
          result = data.data;
        } else if (data.data.status === 500) {
          snackbarEmitter.emit("showsnackbar", {
            snackbarText:
              "Some error occured. Please try again after some time.",
            snackbarColor: "error",
          });
        } else {
          result = data.data;
        }
      })
      .catch((err) => {
        result = {
          error: err.message,
          status: 500,
          message: "Some error occured",
        };
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: `Some error occured. Please try after some time. \nError is ${err}`,
          snackbarColor: "error",
        });
      });
    return result;
  };

  const updateSubjectCreatedBy = async (createdSubjectId, userToken) => {
    let result = {};
    await axios
      .post(
        BACKEND_URL + "/api/subjects/update",
        {
          id: createdSubjectId,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      )
      .then((data) => {
        // console.log("update subject", data);
        if (data.data.status !== 200 && data.data.status !== 500) {
          result = data.data;
        } else if (data.data.status === 500) {
          snackbarEmitter.emit("showsnackbar", {
            snackbarText:
              "Some error occured. Please try again after some time.",
            snackbarColor: "error",
          });
        } else {
          result = data.data;
        }
      })
      .catch((err) => {
        // console.log(err);
        result = {
          error: err.message,
          status: 500,
          message: "Some error occured",
        };
      });
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    var subjectedCreated = false;
    var createdSubjectId = null;
    // Create the Subject if the Others Subject is Selected
    if (otherSubjectSelected) {
      // Validate all the validations before creating the subject except subject
      let res = await validateCreateuserBodyExceptSubject();
      // console.log("validateCreateuserBodyExceptSubject is ", res);
      if (res.status !== 200) {
        setPending(false);
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: res.message,
          snackbarColor: "error",
        });
        return;
      }
      if (otherSubjectValue.trim("") === "") {
        setPending(false);
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: "Please enter the subject name",
          snackbarColor: "error",
        });
        return;
      }
      // Create the Subject
      let subjectObj = {
        name: otherSubjectValue,
      };
      await axios
        .post(BACKEND_URL + "/api/subjects/create", subjectObj)
        .then((data) => {
          // console.log("subject", data);
          if (data.data.status !== 200 && data.data.status !== 500) {
            // console.log("subject", data.data.status);
            setPending(false);
            snackbarEmitter.emit("showsnackbar", {
              snackbarText: data.data.message,
              snackbarColor: "error",
            });
            subjectedCreated = false;
            return;
          } else if (data.data.status === 500) {
            snackbarEmitter.emit("showsnackbar", {
              snackbarText:
                "Some error occured. Please try again after some time.",
              snackbarColor: "error",
            });
          } else {
            // console.log("subject true", data.data.status);
            createdSubjectId = data.data.subject._id;
            subjectedCreated = true;
            setOtherSubjectValue(data.data.subject.slug);
            return;
          }
        })
        .catch((err) => {
          setPending(false);
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: `Some error occured. Please try after some time. \nError is ${err}`,
            snackbarColor: "error",
          });
          return;
        });

      // Checking from here because return from the inside if block will not work
      // console.log("subjectedCreated", subjectedCreated);
      if (subjectedCreated === false) {
        return;
      }
    }

    let objTosend = {
      fullname: fullName,
      subjectcode: subjectOption[subjectSelected].slug,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    if (otherSubjectSelected && otherSubjectValue) {
      objTosend["subjectcode"] = otherSubjectValue;
    }
    // console.log("objTosend", objTosend, otherSubjectSelected);
    if (password === confirmPassword) {
      // Axios Post
      await axios
        .post(BACKEND_URL + "/api/users/create", objTosend)
        .then(async (user) => {
          // console.log(user);
          if (user.data.status === 200 && user.data.hasOwnProperty("token")) {
            let otherSubjectUpdated = false;
            // Update the created_by field in the subject collection if new subject is created
            if (otherSubjectSelected) {
              let updatedSubjectResult = await updateSubjectCreatedBy(
                createdSubjectId,
                user.data.token
              );
              // console.log("updatedSubjectResult", updatedSubjectResult);
              if (
                updatedSubjectResult.status !== 200 &&
                updatedSubjectResult.status !== 500
              ) {
                setPending(false);
                snackbarEmitter.emit("showsnackbar", {
                  snackbarText: updatedSubjectResult.message,
                  snackbarColor: "error",
                });
              } else if (updatedSubjectResult.status === 500) {
                setPending(false);
                snackbarEmitter.emit("showsnackbar", {
                  snackbarText:
                    "Some error occured. Please try again after some time.",
                  snackbarColor: "error",
                });
              } else {
                otherSubjectUpdated = true;
              }
            }
            if (otherSubjectSelected && !otherSubjectUpdated) {
              setPending(false);
              snackbarEmitter.emit("showsnackbar", {
                snackbarText:
                  "Some error occured updating subject. Please refresh and try again.",
                snackbarColor: "error",
              });
              return;
            }
            // Set Registration Success Here
            setPending(false);
            setRegistrationSuccess(true);
            // The below 3 lines are now moved to the activation page
            // localStorage.setItem("token", user.data.token);
            // emitter.emit("setlogindetails", true);
            // history.push("/dashboard");
          } else if (user.data.status === 500) {
            snackbarEmitter.emit("showsnackbar", {
              snackbarText:
                "Some error occured. Please try again after some time.",
              snackbarColor: "error",
            });
          } else {
            setPending(false);
            snackbarEmitter.emit("showsnackbar", {
              snackbarText: user.data.message,
              snackbarColor: "error",
            });
          }
        })
        .catch((err) => {
          setPending(false);
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: "some error occured.",
            snackbarColor: "error",
          });
        });
    } else {
      setPending(false);
      snackbarEmitter.emit("showsnackbar", {
        snackbarText:
          "confirm password should be same as the password provided",
        snackbarColor: "error",
      });
    }
  };

  return (
    <div className="registration-component">
      {pending && <h3>Loading...</h3>}
      {!pending && registrationSucess && (
        <div className="registration-component">
          <h3>
            Hurray! You are one step away from completing your registration.
          </h3>
          <h4>
            Please check your mail and click on the link provided for completing
            the registration process.
          </h4>
        </div>
      )}
      {!registrationSucess && (
        <div className="form" onSubmit={handleSubmit}>
          <div className="form_logo">
            Lo<span>g</span>o
          </div>
          <div className="form_title">
            <span>R</span>egistra<span>tion</span>
          </div>
          <form className="form_items">
            <div className="form_inputs">
              <input
                type="text"
                required
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
              <label>Full name</label>
            </div>
            <div className="">
              <FormControl sx={{ m: 1, minWidth: 250 }} variant="standard">
                <InputLabel id="demo-customized-select-label subject-options">
                  Subject
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={subjectSelected}
                  onChange={(event) => {
                    setSubjectSelected(event.target.value);
                  }}
                  label="Subject"
                  required
                  color="secondary"
                >
                  <MenuItem value="" disabled>
                    <em>None</em>
                  </MenuItem>
                  {/* <MenuItem value={"english"}>English</MenuItem>
                <MenuItem value={"science"}>Science</MenuItem>
                <MenuItem value={"commerce"}>Commerce</MenuItem>
                <MenuItem value={"others"}>others</MenuItem> */}
                  {subjectOption.map((opt, index) => {
                    return (
                      <MenuItem value={index} key={index}>
                        {opt.subject_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            {/* <div className="form_inputs"> */}
            {otherSubjectSelected && (
              <div className="form_inputs">
                <input
                  type="text"
                  onChange={(e) => {
                    setOtherSubjectValue(e.target.value);
                  }}
                  required="otherSubjectSelected"
                />
                <label>Subject </label>
              </div>
            )}
            {/* </div> */}
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
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label>Password</label>
            </div>
            <div className="form_inputs">
              <input
                type="password"
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <label>Confirm Password</label>
            </div>
            <button className="form_button" disabled={pending}>
              Register
            </button>
          </form>
          <div className="form_other">
            <div className="form_other">
              <Link to="/forgotpassword" className="btn btn-primary">
                forgot password?
              </Link>
              <Link to="/login" className="btn btn-primary">
                Sign In
              </Link>
            </div>
          </div>
          <SnackbarComponent />
        </div>
      )}
    </div>
  );
};

export default RegistrationComponent;
