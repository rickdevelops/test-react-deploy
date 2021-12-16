import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../CSS/AllChapters.css";
import { getToken } from "./authentication/AuthComponent";

const AllChapters = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [AllChapters, setAllChapters] = React.useState([]);

  React.useEffect(() => {
    if (props.AllChapters && props.AllChapters.length > 0) {
      setAllChapters(props.AllChapters);
    }
  }, [props.AllChapters]);

  return (
    <div className="all-chapters">
      <h1> All chapters</h1>
      {AllChapters && AllChapters.length === 0 && (
        <h4>
          No Chapters Found. Start by creating a Question in a specific topic.
        </h4>
      )}
      {getToken() === true && AllChapters && AllChapters.length === 0 && (
        <span>
          <Link to="/createquestion" className="login-logout-btn">
            <strong> Create Question</strong>
          </Link>
        </span>
      )}
      <div className="all-chapters-content">
        {
          <Grid container justifyContent="space-evenly">
            {AllChapters.map((eachChapter) => (
              <Grid
                key={eachChapter.slug}
                item
                xs={12}
                sm={6}
                md={4}
                textAlign="center"
                sx={{ marginBottom: 10 }}
              >
                <Card
                  style={{ backgroundColor: `#f5f5f5`, borderRadius: 20 }}
                  className="subject-card"
                  onClick={() =>
                    history.push(location.pathname + "/" + eachChapter.slug)
                  }
                  sx={{
                    minWidth: 300,
                    minHeight: 100,
                    height: "90%",
                    pt: 5,
                    my: 2,
                    mx: 3,
                  }}
                >
                  <CardContent
                    className="subject-card-content"
                    sx={{
                      minWidth: 300,
                      minHeight: 100,
                      p: 0,
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h3"
                      component="div"
                      style={{ color: `#f1356d` }}
                    >
                      <strong> {eachChapter.topic_name} </strong>
                    </Typography>
                  </CardContent>
                  <div className="card-footer">
                    <Typography sx={{ color: "#808080" }}>
                      {eachChapter.description}
                    </Typography>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        }
      </div>
    </div>
  );
};

// const AllChapters = [
//   {
//     code: "english",
//     slug: "/grammer",
//     subject: "English",
//     chapter: "Grammer",
//     description: "English Language Grammers",
//     id: "1",
//   },
//   {
//     code: "english",
//     slug: "/literature",
//     subject: "English",
//     chapter: "Literature",
//     description: "English Language Literature",
//     id: "2",
//   },
//   //   {
//   //     code: "others..",
//   //     subject: "coming Soon",
//   //     description: "Others coming Soon",
//   //     id: "4",
//   //   },
//   //   {
//   //     code: "others..",
//   //     subject: "coming Soon",
//   //     description: "Others coming Soon",
//   //     id: "5",
//   //   },
// ];

export default AllChapters;
