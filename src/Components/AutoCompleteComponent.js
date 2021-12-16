import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { autoCompleteEmitter } from "./QuestionList";
import Popper from "@mui/material/Popper";
import Autocomplete from "@mui/material/Autocomplete";

export default function FreeSolo(props) {
  const allQuestions = props.questionList;
  // const [selectedObj, setSelectedObj] = React.useState(null);
  const PopperMy = function (props) {
    return (
      <Popper
        {...props}
        className="popper"
        style={{}}
        placement="bottom-start"
      />
    );
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {allQuestions && (
        <Autocomplete
          PopperComponent={PopperMy}
          id="free-solo-demo"
          freeSolo
          options={allQuestions.map((option, index) => {
            option.index = index;
            return option;
          })}
          getOptionLabel={(option) => {
            // console.log(option);
            return `${option.index + 1} ${option.question}`;
          }}
          //   getOptionSelected={(option, value) =>
          //     option.question === value.question
          //   }
          onChange={(event, newValue) => {
            // console.log(newValue);
            autoCompleteEmitter.emit("autoCompleteSeleted", newValue);
            // setSelectedObj(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search Question" />
          )}
        />
      )}
    </Stack>
  );
}
