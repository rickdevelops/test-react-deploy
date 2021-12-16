import { useEffect, useState } from "react";
import axios from "axios";
import AllSubjects from "../../AllSubjects";
import SnackbarComponent, { snackbarEmitter } from "../../SnackbarComponent";
import { logoutUser } from "../../authentication/AuthComponent";
import { BACKEND_URL } from "../../../Config/config";

const MyQuestionsSubjects = () => {
  useEffect(() => {
    getSubjects();
  }, []);
  const [subjects, setSubjects] = useState([]);
  const [pending, setPending] = useState(true);
  const getSubjects = () => {
    axios
      .post(BACKEND_URL + "/api/subjects/getsubjectdetailsbyuser")
      .then((data) => {
        // console.log(data);
        if (data.data.status === 200) {
          // console.log("data is", data.data.data);
          if (
            data.data.data.subjectDetails &&
            data.data.data.subjectDetails.length > 0
          ) {
            setSubjects(data.data.data.subjectDetails);
          } else {
            setSubjects([]);
          }
          setPending(false);
        } else if (data.data.status === 401) {
          logoutUser();
        } else if (data.data.status === 500) {
          setPending(false);
          setSubjects([]);
          snackbarEmitter.emit("showsnackbar", {
            snackbarText:
              "Some error occured. Please try again after some time.",
            snackbarColor: "error",
          });
        } else {
          setPending(false);
          setSubjects([]);
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: data.data.message,
            snackbarColor: "error",
          });
          // console.log("error");
        }
      });
  };

  return (
    <div className="my-questions">
      {pending && <h4>Loading...</h4>}
      {!pending && subjects && <AllSubjects AllSubjectsCode={subjects} />}
      <SnackbarComponent />
    </div>
  );
};

export default MyQuestionsSubjects;
