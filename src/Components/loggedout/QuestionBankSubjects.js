import axios from "axios";
import { useEffect, useState } from "react";
import AllSubjects from "../AllSubjects";
import { getToken } from "../authentication/AuthComponent";
import SnackbarComponent, { snackbarEmitter } from "../SnackbarComponent";

const QuestionBankSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    getAllSubjects();
  }, []);

  const getAllSubjects = () => {
    axios.get("/api/subjects/").then((data) => {
      //   console.log(data);
      setPending(false);
      if (data.status === 200 && data.data.length > 0) {
        setSubjects(data.data);
      } else if (data.status === 200 && data.data.length === 0) {
        setSubjects([]);
      } else {
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: `Some error occured. Please try after some time. `,
          snackbarColor: "error",
        });
      }
    });
  };

  return (
    <div className="question-bank-subjects">
      {pending && <h4>Loading...</h4>}
      {!pending && getToken() === true && subjects && subjects.length === 0 && (
        <div className="no-subjects">
          <h3>No Subjects Available</h3>
          <p>Please add subjects to start creating questions.</p>
        </div>
      )}
      {!pending && getToken() === false && subjects && subjects.length === 0 && (
        <div className="no-subjects">
          <h3>No Subjects Available</h3>
          <p> You chose a subject, which has no problems but only Peace!</p>
        </div>
      )}
      {!pending && subjects && subjects.length > 0 && (
        <AllSubjects AllSubjectsCode={subjects} />
      )}
      <SnackbarComponent />
    </div>
  );
};

export default QuestionBankSubjects;
