import React from "react";
import { List, Divider } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginatedQuestionElement from "./PaginatedQuestionElement";
import Grid from "@mui/material/Grid";
import { NUMBER_OF_QUESTIONS_IN_A_PAGE } from "../Config/config";

const QuestionsPaginated = (props) => {
  //   console.log(props);
  //   const classes = useStyles();
  const itemsPerPage = NUMBER_OF_QUESTIONS_IN_A_PAGE;

  React.useEffect(() => {
    if (props.projectsList) {
      setNoOfPages(
        Math.ceil(props.projectsList.length / NUMBER_OF_QUESTIONS_IN_A_PAGE)
      );
    }
  }, [props.projectsList]);
  const projectsList = props.projectsList;
  const [page, setPage] = React.useState(1);
  const [noOfPages, setNoOfPages] = React.useState(1);
  const [handleSelectedOption, setHandleSelectedOption] = React.useState([]);

  const addItemsToSelectedOption = (item) => {
    // console.log(item);
    let newArray = handleSelectedOption;
    let found = newArray.some((el) => el.id === item.id);
    if (found === false) {
      newArray.push(item);
      setHandleSelectedOption(newArray);
    } else {
      let indexOfArrayToBeEdited = newArray.findIndex(
        (el) => el.id === item.id
      );
      let duplicateObj = newArray.filter((el) => el.id === item.id);
      duplicateObj[0].clickedItemValue = item.clickedItemValue;
      duplicateObj[0].showAnswer = item.showAnswer;
      newArray[indexOfArrayToBeEdited] = duplicateObj[0];
      setHandleSelectedOption(newArray);
      // console.log("updateArray", handleSelectedOption);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="questions-paginated">
      <List dense component="span">
        {projectsList &&
          projectsList
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((projectItem, index) => {
              return (
                <div key={index}>
                  <PaginatedQuestionElement
                    key={index}
                    db={projectItem}
                    questionIndex={index}
                    page={page}
                    itemsPerPage={itemsPerPage}
                    addItemsToSelectedOption={addItemsToSelectedOption}
                    handleSelectedOption={handleSelectedOption}
                    setHandleSelectedOption={setHandleSelectedOption}
                  />
                </div>
              );
            })}
      </List>
      <Divider />
      <div className="pagination-block">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            <Pagination
              sx={{ textAlign: "center" }}
              count={noOfPages}
              page={page}
              onChange={handlePageChange}
              defaultPage={1}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default QuestionsPaginated;
