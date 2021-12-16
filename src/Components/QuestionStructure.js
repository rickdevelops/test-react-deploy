import "../CSS/QuestionStructure.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import DraggableDialog from "./DraggableDialog";
import Grid from "@mui/material/Grid";
import axios from "axios";
import SnackbarComponent, { snackbarEmitter } from "./SnackbarComponent";
import { logoutUser } from "./authentication/AuthComponent";
const QuestionStructure = ({ problemData = {}, update = false }) => {
  //   console.log("problemData", problemData, update);

  const OtherOptionsObj = {
    topic_name: "Others",
    description: null,
    slug: "others",
  };
  const [subjectOption, setSubjectOption] = useState([OtherOptionsObj]);
  const [subjectSelected, setSubjectSelected] = useState("");
  const [topicOption, setTopicOption] = useState([OtherOptionsObj]);
  const [topicSelected, setTopicSelected] = useState("");
  // const [showNewTopic, setShowNewTopic] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [questionStatement, setQuestionStatement] = useState("");
  const [description, setDescription] = useState("");
  const [pending, setPending] = useState(false);
  const [option, setOption] = useState(["opt1", "opt2", "opt3", "opt4"]);
  const [answer, setAnswer] = useState("");
  const [dialog, setDialog] = useState(false);
  const history = useHistory();
  const abortController = new AbortController();

  const subjectsForUser = () => {
    // .post("/api/subjects/getsubjectdetailsbyuser")
    axios.post("/api/subjects/getsubjectdetailsbyuser").then((data) => {
      // console.log(data);
      if (data.data.status === 200) {
        // console.log("data is", data.data.data);
        if (
          data.data.data.subjectDetails &&
          data.data.data.subjectDetails.length > 0
        ) {
          setSubjectOption(data.data.data.subjectDetails);
          if (update === true) {
            let index = data.data.data.subjectDetails.findIndex(
              (subject) => subject.slug === problemData.subject_code
            );
            // console.log("index", index);
            setTopicSelected(index);
            setSubjectSelected(index);
          }
        } else {
          setSubjectOption([]);
        }
        setPending(false);
      } else if (data.data.status === 401) {
        logoutUser();
      } else if (data.data.status === 500) {
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: "Some error occured. Please try again after some time.",
          snackbarColor: "error",
        });
      } else {
        setSubjectOption([]);
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: data.data.message,
          snackbarColor: "error",
        });
        // console.log("error");
      }
    });
  };
  useEffect(() => {
    if (problemData && update) {
      subjectsForUser();
    }
    // eslint-disable-next-line
  }, [problemData, update]);

  useEffect(() => {
    subjectsForUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let OtherOptions = {
      topic_name: "Others",
      description: null,
      slug: "others",
    };
    if (subjectSelected !== "" && subjectSelected !== 0 && update === false) {
      topicsFromSubject(subjectOption[subjectSelected]);
    } else if (
      subjectSelected !== "" &&
      subjectSelected !== 0 &&
      update === true
    ) {
      // console.log(
      //   "update is ",
      //   problemData.subject_code,
      //   problemData.topic_code
      // );
      topicsFromSubject(problemData.subject_code);
    } else if (subjectSelected === 0 || subjectSelected === "") {
      setTopicOption([OtherOptions]);
      setTopicSelected("");
    } else {
      setTopicOption([OtherOptions]);
      // setTopicSelected(0);
    }
    // eslint-disable-next-line
  }, [subjectSelected, setSubjectSelected]);

  useEffect(() => {
    if (update) {
      // console.log("update", problemData);
      setSubjectSelected(problemData.subject_code);
      setTopicSelected(problemData.topic_code);
      setQuestionStatement(problemData.question);
      setDescription(problemData.description);
      setOption(problemData.options);
      setAnswer(problemData.answer);
    }
  }, [problemData, update]);

  const createSlug = (valueGiven) => {
    let resultSlug;
    if (valueGiven)
      resultSlug = valueGiven.toLowerCase().replace(/[^a-zA-Z]+/g, "");
    return resultSlug;
  };
  const showHideNewTopic = () => {
    // if (topicOption[topicSelected]) {let temp= topicOption[topicSelected].topic_name; console.log(temp.trim())}
    if (
      subjectOption[subjectSelected] &&
      subjectOption[subjectSelected].trim !== "" &&
      topicOption[topicSelected] &&
      topicOption[topicSelected].topic_name.trim().toLowerCase() === "others"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const clearState = () => {
    setQuestionStatement("");
    setDescription("");
    setPending(false);
    setOption(["opt1", "opt2", "opt3", "opt4"]);
    setAnswer("");
  };

  // Create A topic
  const createTopic = async (subjectSlug, topicSlug) => {
    let payload = {
      topicname: topicSlug,
      subjectcode: subjectSlug,
    };
    // console.log("payload", payload);
    let result = {};
    await axios.post("/api/topics/create", payload).then((data) => {
      // console.log(data);
      if (data.data.status === 200) {
        result = {
          topicslug: data.data.topic.slug,
          status: 200,
          message: data.data.message,
        };
      } else if (data.data.status === 401) {
        logoutUser();
      } else if (data.data.status === 500) {
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: "Some error occured. Please refresh and try again.",
          snackbarColor: "error",
        });
      } else if (data.data.status === 403) {
        result = {
          status: 403,
          message: data.data.message,
        };
      } else {
        result = {
          status: data.data.status,
          message: data.data.message,
        };
        // console.log("error");
      }
    });
    return result;
  };

  const topicsFromSubject = async (subject) => {
    // console.log("subject", subject);
    if (subject) {
      let payload =
        update === true
          ? { subjectcode: subject }
          : { subjectcode: subject.slug };
      await axios
        .post("/api/topics/gettopicsbysubjectfordropdown", payload)
        .then((data) => {
          // console.log(data);
          let OtherOptions = {
            topic_name: "Others",
            description: null,
            slug: "others",
          };
          if (data.data.status === 200) {
            // console.log("data is", data.data.data);
            if (data.data.data && data.data.data.length > 0) {
              if (!update) {
                data.data.data.push(OtherOptions);
              }
              // console.log("temp", data.data.data);
              setTopicOption(data.data.data);
              if (update === true) {
                let index = data.data.data.findIndex(
                  (topic) => topic.slug === problemData.topic_code
                );
                // console.log("index", index);
                setTopicSelected(index);
              }
            } else {
              setTopicOption([]);
            }
            setPending(false);
            return data.data.data;
          }
          if (data.data.status === 404) {
            if (!update) {
              // data.data.data.push(OtherOptions);
              setTopicOption([OtherOptions]);
            }
          } else if (data.data.status === 401) {
            logoutUser();
          } else if (data.data.status === 500) {
            snackbarEmitter.emit("showsnackbar", {
              snackbarText:
                "Some error occured. Please try again after some time.",
              snackbarColor: "error",
            });
          } else {
            setTopicOption([]);
            snackbarEmitter.emit("showsnackbar", {
              snackbarText: data.data.message,
              snackbarColor: "error",
            });
            // console.log("error");
          }
        });
    }
  };

  const handleDBOperation = (url, method, operation, body = {}) => {
    // setTimeout(() => {
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
      signal: abortController.signal,
    })
      .then((res) => {
        // console.log(res);
        if (res.status === 401) {
          logoutUser();
        } else if (!res.status === 200 || !res.status === 201) {
          throw Error("could not fetch from the resource");
        }
        return res.json();
      })
      .then((data) => {
        // console.log("Successfully " + operation);
        setPending(false);
        // if (method === "POST") clearState();
        if (operation && operation.toLowerCase() !== "updated") {
          clearState();
          history.go(-1);
        } else {
          snackbarEmitter.emit("showsnackbar", {
            snackbarText: `Successfully ${operation}`,
            snackbarColor: "success",
          });
        }
      })
      .catch((e) => {
        // console.log(e.message);
        setPending(false);
      });
    // }, 5000);
    return () => abortController.abort();
  };

  const handleDelete = () => {
    // e.preventDefault();
    // console.log("delete");
    handleDBOperation(
      // "http://localhost:8000/questions_db/" + problemData.id + "/",
      "/api/projects/delete/" + problemData._id + "/",
      "DELETE",
      "Deleted"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(update);
    setPending(true);
    var subjectCode, topicCode;
    if (subjectOption[subjectSelected])
      subjectCode = subjectOption[subjectSelected].slug;
    else {
      snackbarEmitter.emit("showsnackbar", {
        snackbarText: "Please select a Subject",
        snackbarColor: "error",
      });
      setPending(false);
      return;
    }
    if (topicOption[topicSelected]) {
      topicCode = topicOption[topicSelected].slug;
    } else {
      snackbarEmitter.emit("showsnackbar", {
        snackbarText: "Please select a Topic",
        snackbarColor: "error",
      });
      setPending(false);
      return;
    }
    var slugOfCreatedTopic = null;
    if (showHideNewTopic() === true) {
      //Create a New Topic
      let subjectSlug = subjectOption[subjectSelected].slug;
      let topicSlug = createSlug(newTopic.trim());
      // console.log("topicSlug", topicSlug);
      if (
        subjectSlug &&
        topicSlug &&
        topicSlug.length > 0 &&
        topicSlug === "others"
      ) {
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: `Please Enter a Different Topic other than "${newTopic}"`,
          snackbarColor: "error",
        });
        setPending(false);
        return;
      }
      if (subjectSlug && topicSlug !== "" && topicSlug.length > 0) {
        slugOfCreatedTopic = await createTopic(
          subjectSlug,
          // topicOption[topicSelected].slug
          newTopic
        );
      } else if (topicSlug.length === 0) {
        snackbarEmitter.emit("showsnackbar", {
          snackbarText: "Topic cannot be empty or blank",
          snackbarColor: "error",
        });
        setPending(false);
        return;
      } else {
        snackbarEmitter.emit("showsnackbar", {
          snackbarText:
            "Please select a Subject Some error occured with the subject selected",
          snackbarColor: "error",
        });
        setPending(false);
        return;
      }
    }
    if (slugOfCreatedTopic && slugOfCreatedTopic.status === 200) {
      topicCode = slugOfCreatedTopic.topicslug;
    } else if (slugOfCreatedTopic && slugOfCreatedTopic.status !== 200) {
      snackbarEmitter.emit("showsnackbar", {
        snackbarText: slugOfCreatedTopic.message,
        snackbarColor: "error",
      });
      setPending(false);
      return;
    }
    const question = {
      subject_code: subjectCode,
      topic_code: topicCode,
      question: questionStatement,
      description,
      options: option,
      answer: Number(answer),
      id: update ? problemData._id : "",
    };

    // console.log(question);

    if (update) {
      //   Update Call
      handleDBOperation(
        // "http://localhost:8000/questions_db/" + problemData.id + "/",
        "/api/projects/update",
        "POST",
        "Updated",
        question
      );
    } else {
      //   Create Call
      handleDBOperation(
        // "http://localhost:8000/questions_db",
        "/api/projects/create",
        "POST",
        "Created",
        question
      );
    }
  };

  return (
    <div className="question-structure">
      {dialog && (
        <DraggableDialog
          dialogTitle="Delete Confirmation"
          dialogContent="Are you sure you want to delete this question?"
          dialog={dialog}
          setDialog={setDialog}
          handleDeleteFunction={handleDelete}
        />
      )}
      <h1>{update ? "Update" : "Create"} Question</h1>
      <form onSubmit={handleSubmit}>
        <label>Subject: </label>
        <select
          value={subjectSelected}
          onChange={(e) => {
            setSubjectSelected(e.target.value);
          }}
          required
        >
          <option value="" disabled></option>
          {subjectOption.map((opt, index) => {
            return (
              <option value={index} key={index}>
                {opt.subject_name}
              </option>
            );
          })}
        </select>
        <label>Topic: </label>
        <select
          value={topicSelected}
          onChange={(e) => setTopicSelected(e.target.value)}
          required
        >
          <option value="" disabled></option>
          {topicOption.map((opt, index) => {
            return (
              <option value={index} key={index}>
                {opt.topic_name}
              </option>
            );
          })}
        </select>
        {showHideNewTopic() && (
          <>
            <label>New topic</label>
            <input
              xs={8}
              value={newTopic}
              type="text"
              required
              onChange={(e) => {
                setNewTopic(e.target.value);
              }}
            />
          </>
        )}
        <label>Question: </label>
        <input
          className="question-input"
          value={questionStatement}
          onChange={(e) => setQuestionStatement(e.target.value)}
          type="text"
          required
        />
        <label>Description: </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="5"
        ></textarea>

        <label>Options: </label>
        {option.map((opt, index) => {
          return (
            <div className="row" key={index}>
              <span xs={4}>{index + 1}.</span>
              <input
                xs={8}
                value={opt}
                type="text"
                required
                onChange={(e) => {
                  let temp_option = [...option];
                  temp_option[index] = e.target.value;
                  setOption(temp_option);
                }}
              />
            </div>
          );
        })}

        <label>Correct option: </label>
        <select
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        >
          <option value="" disabled></option>
          {option.map((opt, index) => {
            return (
              <option value={index} key={index}>
                {opt}
              </option>
            );
          })}
        </select>
        <Grid container>
          {!pending && (
            <Grid item xs={4}>
              <button className="update-button">
                {update ? "Update" : "Add"} Problem
              </button>
            </Grid>
          )}
          {pending && (
            <Grid item xs={4}>
              <button className="update-button">
                {update ? "Updating" : "Adding"} Problem...
              </button>
            </Grid>
          )}
          {update && (
            <Grid item xs={4}>
              <button
                type="button"
                onClick={() => {
                  setDialog(true);
                  // handleDelete();
                }}
                className="delete-button"
              >
                Delete Problem
              </button>
            </Grid>
          )}
        </Grid>
      </form>
      <SnackbarComponent />
    </div>
  );
};

export default QuestionStructure;
