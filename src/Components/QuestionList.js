import { useEffect, useState } from "react";
import AutoCompleteComponent from "./AutoCompleteComponent";
import { EventEmitter } from "fbemitter";
import ListQuestionElement from "./ListQuestionElement";
import { shuffleArray } from "./helper/Helper";
// import AllProjects from "./AllProjects";
import QuestionsPaginated from "./QuestionsPaginated";
import { getToken } from "./authentication/AuthComponent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "../CSS/QuestionList.css";
import { SHUFFLE_QUESTIONS } from "../Config/config";

export const autoCompleteEmitter = new EventEmitter();

const QuestionList = (props) => {
  //   const dbList = [
  //     {
  //       question: "What's the name of our World?",
  //       // options: [{ 1: "Jupitar" }, { 2: "earth" }, { 3: "Mars" }, { 4: "Pluto" }],
  //       options: ["Jupitar", "earth", "Mars", "Pluto"],
  //       answer: 1,
  //       description:
  //         "Earth is the third planet from the Sun and the only astronomical object known to harbour and support life. 29.2% of Earth's surface is land consisting of continents and islands. The remaining 70.8% is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, but also by lakes, rivers, and other freshwater, which together constitute the hydrosphere. Much of Earth's polar regions are covered in ice. Earth's outer layer is divided into several rigid tectonic plates that migrate across the surface over many millions of years, while its interior remains active with a solid iron inner core, a liquid outer core that generates Earth's magnetic field, and a convective mantle that drives plate tectonics.",
  //     },
  //     {
  //       question: "What's the name of our World?",
  //       options: ["Jupitar", "Mars", "earth", "Pluto"],
  //       answer: 2,
  //       description:
  //         "Earth is the third planet from the Sun and the only astronomical object known to harbour and support life. 29.2% of Earth's surface is land consisting of continents and islands. The remaining 70.8% is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, but also by lakes, rivers, and other freshwater, which together constitute the hydrosphere. Much of Earth's polar regions are covered in ice. Earth's outer layer is divided into several rigid tectonic plates that migrate across the surface over many millions of years, while its interior remains active with a solid iron inner core, a liquid outer core that generates Earth's magnetic field, and a convective mantle that drives plate tectonics.",
  //     },
  //   ];

  const [error, setError] = useState(null);
  const [pending, setPending] = useState(true);
  const [questionList, setQuestionList] = useState(null);
  const [autoCompleteValue, setAutoCompleteValue] = useState("");

  useEffect(() => {
    const listener = autoCompleteEmitter.addListener(
      "autoCompleteSeleted",
      (obj) => {
        // console.log(obj);
        setAutoCompleteValue(obj);
        // filteredQuestionList(newList);
        // setSelectedObj(obj);
      }
    );

    return () => {
      listener.remove();
    };
  }, []);
  /*
  useEffect(() => {
    const abortController = new AbortController();

    // setTimeout(() => {
    fetch("http://localhost:8000/questions_db", {
      signal: abortController.signal,
    })
      .then((res) => {
        if (res.status !== 200) {
          throw Error("could not fetch from the resource");
        }
        return res.json();
      })
      .then((data) => {
        //   console.log(data);
        let questionarr = shuffleArray(data);
        setQuestionList(questionarr);
        setPending(false);
      })
      .catch((err) => {
        //   console.log(err);
        if (err.name === "AbortError") {
          console.log("Fetch Aborted");
        } else {
          setError(err.message);
          setPending(false);
        }
      });
    // }, 1000);
    return () => abortController.abort();
  }, []);
  */

  useEffect(() => {
    if (props.questionList && props.questionList.length > 0) {
      setPending(false);
      if (SHUFFLE_QUESTIONS) {
        shuffleArray(props.questionList);
      }
      setQuestionList(props.questionList);
    } else if (props.questionList && props.questionList.length === 0) {
      setPending(false);
    } else {
      setPending(false);
      setError("Some error occured.");
    }
  }, [questionList, props.questionList]);

  // useEffect(() => {
  //   return (
  //     <>
  //       {questionList && <AutoCompleteComponent questionList={questionList} />}
  //     </>
  //   );
  // }, []);

  // const filteredQuestionList = (obj) => {
  //   if (questionList) {
  //     questionList.filter((questions) => {
  //       if (questions.id === obj.id) {
  //         console.log(questions);
  //         setQuestionList(questions);
  //         return questions;
  //       }
  //     });
  //   }
  // };

  return (
    <div className="question-list">
      {/* <h1>QuestionList</h1> */}
      {getToken() && questionList && (
        <Grid container className="autocomplete-component">
          <Grid item xs={2} className="search-question-text">
            <Typography variant="caption" component="h3" align="right">
              Search Question
            </Typography>
          </Grid>
          <Grid
            item
            xs={10}
            sm={6}
            className="autocomplete-input"
            textAlign="center"
          >
            {questionList && getToken() && (
              <AutoCompleteComponent questionList={questionList} />
            )}
          </Grid>
        </Grid>
      )}
      {!pending && !questionList && (
        <h2 className="nothing-found">
          Sorry, no questions added in this Topic yet!
        </h2>
      )}
      {!autoCompleteValue && questionList && (
        <QuestionsPaginated projectsList={questionList}></QuestionsPaginated>
      )}
      {/* {autoCompleteValue && filteredQuestionList} */}
      {/* As the autocompleted value is a json it's sent directly to the elemnet component */}
      {autoCompleteValue && (
        <ListQuestionElement
          db={autoCompleteValue}
          page={1}
          itemsPerPage={10}
          questionIndex={0}
        ></ListQuestionElement>
      )}
      {/* <AllProjects projectsList={projectsList}></AllProjects> */}
      {error && <div> {error} </div>}
      {pending && <div> Loading... </div>}
      {/* {questionList &&
        questionList.map((db, index) => {
          return (
            <div className="question-block" key={index}>
              <ListQuestionElement db={db} questionIndex={index} />
            </div>
          );
        })} */}
    </div>
  );
};

export default QuestionList;
