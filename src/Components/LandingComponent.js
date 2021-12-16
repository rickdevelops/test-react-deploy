import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import quiz from "../assets/landingpage/undraw_quiz_img.png";
import "../CSS/LandingComponent.css";
import { blue } from "@mui/material/colors";

const LandingComponent = () => {
  return (
    <div className="landing-component">
      <Grid container justifyContent="space-evenly">
        <Grid item xs={12} sm={8} textAlign="center">
          <img src={quiz} alt="quiz_img" />
        </Grid>
        <Grid item xs={12} sm={4} textAlign="center">
          {/* Header */}
          <Card
            // style={{ backgroundColor: `#f5f5f5` }}
            className="card-component"
          >
            <Typography
              className="card-component-header"
              gutterBottom
              variant="h3"
              component="div"
              sx={{
                fontSize: "5vw",
              }}
            >
              <strong>Question Bank</strong>
            </Typography>
            <CardContent
              className="card-component-content"
              sx={{
                p: 0,
              }}
            >
              <Typography
                gutterBottom
                variant="p"
                component="div"
                style={{
                  color: blue[600],
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                  marginBottom: "2rem",
                }}
              >
                <strong>
                  Now you can assess yourself from anywhere, from any of the
                  subjects along with the specific chapters.
                </strong>
              </Typography>
            </CardContent>
            <div className="card-footer">
              <Link className="start-btn" to="/questionbank">
                Get Started <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingComponent;
