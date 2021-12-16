import { useEffect, useState } from "react";
import axios from "axios";
import AllChapters from "../../AllChapters";
import SnackbarComponent, { snackbarEmitter } from "../../SnackbarComponent";
import { logoutUser } from "../../authentication/AuthComponent";
import { BACKEND_URL } from "../../../Config/config";

const MyQuestionTopics = () => {
  const [chapters, setChapters] = useState([]);
  const [pending, setPending] = useState(true);
  useEffect(() => {
    getChapters();
  }, []);

  const getChapters = () => {
    let lastItemOfPath = window.location.pathname.split("/").pop();
    let dataTBS = { subjectcode: lastItemOfPath };
    axios
      .post(BACKEND_URL + "/api/topics/gettopicdetailsbyuser", dataTBS)
      .then((data) => {
        // console.log(data);
        if (data.data.status === 200) {
          // console.log("data is", data.data.data);
          if (data.data.data && data.data.data.length > 0) {
            setChapters(data.data.data);
          } else {
            setChapters([]);
          }
          setPending(false);
        } else if (data.data.status === 401) {
          logoutUser();
        } else if (data.data.status === 500) {
          setChapters([]);
          setPending(false);
          snackbarEmitter.emit("showsnackbar", {
            snackbarText:
              "Some error occured. Please try again after some time.",
            snackbarColor: "error",
          });
        } else {
          setChapters([]);
          setPending(false);
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: data.data.message,
            snackbarColor: "error",
          });
          // console.log("error");
        }
      });
  };

  return (
    <div className="my-question-topic">
      <h1>Topics</h1>
      {pending && <h4>Loading...</h4>}
      {!pending && chapters && <AllChapters AllChapters={chapters} />}
      <SnackbarComponent />
    </div>
  );
};

export default MyQuestionTopics;
