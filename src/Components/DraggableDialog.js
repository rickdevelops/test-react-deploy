import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DraggableDialog(props) {
  //   console.log(props);
  const [open, setOpen] = React.useState(false);
  const dialogTitle = props.dialogTitle;
  const dialogContent = props.dialogContent;

  React.useEffect(() => {
    if (props.dialog) {
      handleClickOpen();
    }
  }, [props.dialog]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.setDialog(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              handleClose();
              props.handleDeleteFunction();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
