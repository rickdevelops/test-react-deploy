import "../CSS/Content.css";
import React from "react";
import Button from "@mui/material/Button";
import QuestionList from "./QuestionList";

const Content = () => {
  return (
    <div className="content">
      <h1>Content</h1>
      <QuestionList />
      <Button variant="contained">Hello World</Button>
    </div>
  );
};

export default Content;
