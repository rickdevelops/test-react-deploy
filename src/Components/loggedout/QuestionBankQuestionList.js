import { useEffect, useState } from "react";
import axios from "axios";
import { getSubjectAndTopicFromUrl } from "../helper/Helper";
import SnackbarComponent, { snackbarEmitter } from "../SnackbarComponent";
import QuestionList from "../QuestionList";
import { getToken } from "../authentication/AuthComponent";
import { logoutUser } from "../authentication/AuthComponent";

const QuestionBankQuestionList = () => {
  const [pending, setPending] = useState(true);
  const [questionList, setQuestionList] = useState([]);

  const getQuestionList = () => {
    let slugs = getSubjectAndTopicFromUrl();
    let subjectcode = slugs.subject;
    let topiccode = slugs.topic;
    // console.log("Token is", localStorage.getItem("token"));
    let payload = {
      subjectcode: subjectcode,
      topiccode: topiccode,
    };
    if (getToken()) {
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
    } else {
      axios.defaults.headers.common["Authorization"] = null;
    }
    axios
      .post("/api/projects/showprojectsforsubjectandtopic", payload)
      .then((data) => {
        // console.log(data);
        if (data.data.status === 200) {
          //   console.log("data is", data.data.data);
          if (data.data.data && data.data.data.length > 0) {
            setQuestionList(data.data.data);
          } else {
            setQuestionList([]);
          }
          //   setPending(false);
        } else if (data.data.status === 401) {
          logoutUser();
        } else if (data.data.status === 500) {
          setQuestionList([]);
          snackbarEmitter.emit("showsnackbar", {
            snackbarText:
              "Some error occured. Please try again after some time.",
            snackbarColor: "error",
          });
        } else {
          setQuestionList([]);
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: data.data.message,
            snackbarColor: "error",
          });
          //   console.log("error");
        }
        setPending(false);
      });
  };

  useEffect(() => {
    // console.log(getSubjectAndTopicFromUrl());
    getQuestionList();
  }, []);

  return (
    <div className="question-bank-question-list">
      <h1>Questions</h1>
      <br />
      <br />
      {pending && <h4>Loading...</h4>}
      {!pending &&
        getToken() === true &&
        questionList &&
        questionList.length === 0 && (
          <>
            <h4>Please add questions in this topic</h4>
            <p>
              Create question in this topic by choosing this topic from the
              create question topic dropdown.
            </p>
          </>
        )}
      {!pending &&
        getToken() === false &&
        questionList &&
        questionList.length === 0 && (
          <>
            <h4>It seems you are a genious and eager to learn more.</h4>
            <p>
              But unfortunately no questions added in this topic for Geniouses
              yet.
            </p>
          </>
        )}
      {!pending && questionList && questionList.length > 0 && (
        <QuestionList questionList={questionList} />
      )}
      <SnackbarComponent />
    </div>
  );
};

export default QuestionBankQuestionList;
