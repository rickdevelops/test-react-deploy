import * as React from "react";
import Stack from "@mui/material/Stack";
import { EventEmitter } from "fbemitter";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useHistory } from "react-router";

export const snackbarEmitter = new EventEmitter();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/* props to be passed to the component as a property of the Snackbar component.
snackbarDetails={snackbarText: string, snackbarColor: string } */
export default function SnackbarComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState("");
  const [snackbarColor, setSnackbarColor] = React.useState("");
  const [snackbarOnCloseRoute, setSnackbarOnCloseRoute] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    const listener = snackbarEmitter.addListener(
      "showsnackbar",
      (snackbarDetails) => {
        // console.log(
        //   "showsnackbar",
        //   snackbarDetails,
        //   snackbarDetails.snackbarText,
        //   snackbarDetails.snackbarColor
        // );
        setSnackbarText(snackbarDetails.snackbarText);
        setSnackbarColor(snackbarDetails.snackbarColor);
        setSnackbarOnCloseRoute(snackbarDetails.snackbarOnCloseRoute);
        handleClick();
      }
    );
    return () => {
      listener.remove();
    };
  }, []);

  const handleClick = () => {
    setOpen(false);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    handleSnackbarReset();
    if (snackbarOnCloseRoute !== "") {
      history.push(snackbarOnCloseRoute);
    }
  };

  const handleSnackbarReset = () => {
    setSnackbarText("");
    setSnackbarOnCloseRoute("");
    // setSnackbarColor("error");
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarColor}
          sx={{ width: "100%" }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
