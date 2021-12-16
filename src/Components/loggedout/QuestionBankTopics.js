import axios from "axios";
import { useEffect, useState } from "react";
import AllChapters from "../AllChapters";
import { getToken } from "../authentication/AuthComponent";
import SnackbarComponent, { snackbarEmitter } from "../SnackbarComponent";

const QuestionBankTopics = () => {
  const [topics, setTopics] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    getAllTopics();
  }, []);

  const getAllTopics = () => {
    let lastItemOfPath = window.location.pathname.split("/").pop();
    let dataTBS = { subjectcode: lastItemOfPath };
    axios.post("/api/projects/uniquetopicsinprojects", dataTBS).then((data) => {
      // console.log(data);
      if (data.data.status === 200 && data.data.data.length > 0) {
        setTopics(data.data.data);
      } else if (data.data.status === 404) {
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: `No Topics added for this Subject Yet. Start by creating a Question in this Subject and topic. `,
          snackbarColor: "error",
        });
      } else if (data.data.status === 200 && data.data.data.length === 0) {
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: `No Topics added for this Subject Yet. `,
          snackbarColor: "error",
        });
        setTopics([]);
      } else {
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: `Some error occured. Please try after some time. `,
          snackbarColor: "error",
        });
      }
      setPending(false);
    });
  };

  return (
    <div className="question-bank-topics">
      {pending && <h4>Loading...</h4>}
      {!pending && getToken() === true && topics && topics.length === 0 && (
        <div className="no-topics">
          <h3>No Topics Available</h3>
          <p>Please add topics by creating questions. </p>
        </div>
      )}
      {!pending && getToken() === false && topics && topics.length === 0 && (
        <div className="no-topics">
          <h3>No Topics Available</h3>
          <p>You are too early! No Topics added for this subject yet! </p>
        </div>
      )}
      {!pending && topics && topics.length > 0 && (
        <AllChapters AllChapters={topics} />
      )}
      <SnackbarComponent />
    </div>
  );
};

export default QuestionBankTopics;
