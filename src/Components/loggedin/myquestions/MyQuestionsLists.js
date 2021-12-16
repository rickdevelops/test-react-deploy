import { useEffect, useState } from "react";
import axios from "axios";
import { getSubjectAndTopicFromUrl } from "../../helper/Helper";
import SnackbarComponent, { snackbarEmitter } from "../../SnackbarComponent";
import QuestionList from "../../QuestionList";
import { logoutUser } from "../../authentication/AuthComponent";

const MyQuestionsLists = () => {
  const [pending, setPending] = useState(true);
  const [questionList, setQuestionList] = useState([]);

  const getQuestionList = () => {
    let slugs = getSubjectAndTopicFromUrl();
    let subjectcode = slugs.subject;
    let topiccode = slugs.topic;
    let payload = {
      subjectcode: subjectcode,
      topiccode: topiccode,
    };
    axios
      .post("/api/projects/showprojectsforauserinasubjectandtopic", payload)
      .then((data) => {
        // console.log(data);
        if (data.data.status === 200) {
          //   console.log("data is", data.data.data);
          if (data.data.data && data.data.data.length > 0) {
            setQuestionList(data.data.data);
          } else {
            setQuestionList([]);
          }
          setPending(false);
        } else if (data.data.status === 401) {
          logoutUser();
        } else if (data.data.status === 500) {
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
      });
  };

  useEffect(() => {
    // console.log(getSubjectAndTopicFromUrl());
    getQuestionList();
  }, []);

  return (
    <div className="my-questions-list">
      <h1>My Questions</h1>
      {!pending && questionList && <QuestionList questionList={questionList} />}
      <SnackbarComponent />
    </div>
  );
};

export default MyQuestionsLists;
