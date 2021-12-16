import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useLocation, useHistory } from "react-router-dom";
import "../CSS/AllSubjects.css";

const AllSubjects = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [AllSubjectsCode, setAllSubjectsCode] = React.useState([]);
  const [pending, setPending] = React.useState(true);

  React.useEffect(() => {
    // console.log("AllSubjects.js: useEffect", props);
    if (props.AllSubjectsCode && props.AllSubjectsCode.length > 0) {
      setPending(false);
      setAllSubjectsCode(props.AllSubjectsCode);
    } else if (props.AllSubjectsCode && props.AllSubjectsCode.length === 0) {
      setPending(false);
    }
  }, [props.AllSubjectsCode]);

  return (
    <div className="all-subjects">
      <h1> All Subjects</h1>
      {!pending && AllSubjectsCode.length === 0 && <h4>No Subjects Found</h4>}
      <div className="all-subjects-content">
        {!pending && (
          <Grid container justifyContent="space-evenly">
            {AllSubjectsCode.map((eachSubject) => (
              <Grid
                key={eachSubject.slug}
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
                    history.replace(location.pathname + "/" + eachSubject.slug)
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
                    {!eachSubject.subject_name
                      .toLowerCase()
                      .includes("coming soon") ? (
                      <Typography
                        gutterBottom
                        variant="h3"
                        component="div"
                        style={{ color: `#f1356d` }}
                      >
                        <strong> {eachSubject.subject_name} </strong>
                      </Typography>
                    ) : (
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        style={{ color: `#f1356d` }}
                      >
                        <strong> {eachSubject.subject_name} </strong>
                      </Typography>
                    )}
                  </CardContent>
                  <div className="card-footer">
                    <Typography sx={{ color: "#808080" }}>
                      {eachSubject.description}
                    </Typography>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

// const AllSubjectsCode = [
//   {
//     // code: "english",
//     slug: "/english",
//     subject_name: "English",
//     description: "English Language Grammers",
//     id: "1",
//   },
//   {
//     // code: "others..",
//     slug: "/comingsoon",
//     subject_name: "Coming soon...",
//     description: "Thanks for your patience",
//     id: "2",
//   },
//   //   {
//   //     code: "others..",
//   //     subject_name: "coming Soon",
//   //     description: "Others coming Soon",
//   //     id: "3",
//   //   },
//   //   {
//   //     code: "others..",
//   //     subject_name: "coming Soon",
//   //     description: "Others coming Soon",
//   //     id: "4",
//   //   },
// ];

export default AllSubjects;
