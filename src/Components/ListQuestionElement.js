import React from "react";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { useHistory } from "react-router";
import { SHUFFLE_OPTIONS } from "../Config/config";
import { shuffleArray } from "./helper/Helper";
const ListQuestionElement = (props) => {
  // console.log(props);
  const db = props.db;
  const [value, setValue] = useState("");
  const [helperText, setHelperText] = useState("");
  const [descText, setDescText] = useState("");
  const [error, setError] = useState(false);
  const [shuffArr, setShuffArr] = useState([...db.options]);
  const history = useHistory();

  useEffect(() => {
    // let arr = shuffleArray(shuffArr);
    // setShuffArr(arr);
    // console.log(arr, ...db.options);
    let newOptions = [...db.options];
    if (SHUFFLE_OPTIONS) {
      setShuffArr(shuffleArray(newOptions));
    }
    //   console.log(shuffArr, db.options);
  }, [props.db, db.options]);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText("");
    setDescText("");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("db is", db.answer, value, db.options[db.answer], db.options);
    if (
      value.toLowerCase().trim() === db.options[db.answer].toLowerCase().trim()
    ) {
      setHelperText("You got it!");
      setDescText(db.description);
      setError(false);
    } else if (value !== db.options[db.answer] && value !== "") {
      setHelperText("Sorry, wrong answer!");
      setDescText(db.description);
      setError(true);
    } else {
      setHelperText("Please select an option.");
      // setDescText("I'm the Description Text");
      setError(true);
    }
  };

  return (
    <div className="question">
      {/* <h1>Question</h1> */}
      {/* {JSON.stringify(db[0].question)} */}
      <div className="card">
        <div className="options">
          <form onSubmit={handleSubmit}>
            <FormControl
              sx={{ m: 3, width: "90%" }}
              component="fieldset"
              error={error}
              variant="standard"
            >
              <Grid container>
                <Grid item xs={8} sm={10} md={10}>
                  {Number(props.page * props.itemsPerPage) -
                    (props.itemsPerPage - (props.questionIndex + 1))}
                  . {db.question}
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={2}
                  md={2}
                  textAlign={"center"}
                  fontSize={20}
                >
                  <Icon
                    className="fas fa-edit"
                    onClick={(e) => {
                      history.push(`/updatequestion/${db.id}`);
                    }}
                  ></Icon>
                </Grid>
              </Grid>
              <RadioGroup
                aria-label="quiz"
                name="quiz"
                value={value}
                onChange={handleRadioChange}
                sx={{ m: 3 }}
              >
                <Grid container>
                  {shuffArr.map((optioned, index) => {
                    // // return <p key={index}>{optioned}</p>;
                    return (
                      <Grid item xs={12} sm={12} md={6} key={index}>
                        <FormControlLabel
                          value={optioned}
                          control={<Radio />}
                          label={optioned}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </RadioGroup>
              <FormHelperText
                className={"answer " + (error ? "unsuccess" : "success")}
              >
                {/* {error.toString()} */}
                {helperText}
              </FormHelperText>
              <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                Check Answer
              </Button>
              <FormHelperText sx={{ fontWeight: 20, color: "black" }}>
                {descText}
              </FormHelperText>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ListQuestionElement;
