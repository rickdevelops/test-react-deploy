// import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutUser } from "./authentication/AuthComponent";
import QuestionStructure from "./QuestionStructure";

const UpdateQuestion = (props) => {
  // const questionId = useParams().id;
  const [questionId, setQuestionId] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(true);
  const [problemData, setProblemData] = useState(null);
  const [updateValue] = useState(true);

  // console.log(questionId, useLocation());
  // console.log(props);
  useEffect(() => {
    if (props) {
      // console.log(props);
      setQuestionId(props.paramDetails.computedMatch.params.id);
    }
    // const data = handlePopulateForm(questionId);
    const abortController = new AbortController();
    // setTimeout(() => {
    fetch(`/api/projects/${questionId}`, {
      method: "GET",
      signal: abortController.signal,
    })
      .then((res) => {
        if (res.status === 401) {
          logoutUser();
        }
        if (res.status !== 200) {
          throw Error("could not fetch from the resource");
        }
        return res.json();
      })
      .then((data) => {
        // console.log("data", data);
        setProblemData(data.data);
        console.log("Successfully Populated");
        setPending(false);
        // clearState();
      })
      .catch((e) => {
        if (e.name === "AbortError") {
          console.log("Fetch Aborted");
        } else {
          setError(e.message);
          setPending(false);
        }
      });
    // }, 5000);
    return () => abortController.abort();
    // };
  }, [questionId, props]);

  return (
    <div className="update-question">
      {/* <h1>Update Question</h1> */}
      {error && <div> {error} </div>}
      {pending && <div> Loading... </div>}
      {problemData && (
        <QuestionStructure problemData={problemData} update={updateValue} />
      )}
    </div>
  );
};

export default UpdateQuestion;
