import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CreateWaveDialog from "../pages/CreateWaveDialog/CreateWaveDialog";
import { useState } from "react";


function CustomDialog({ open, Transition,setOpen }) {
    const[clickedService,setClickedService] = useState("")
    const handleClose = (event,reason) => {
        if (reason && reason === 'backdropClick') {
          return;
        }
        setOpen(false);
        setClickedService("")
      };

 
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description" 
        fullWidth= {true}
        maxWidth= {"md"}
      >
        <DialogTitle>{"Create a Wave"}</DialogTitle>
        <DialogContent>
          <CreateWaveDialog clickedService={clickedService} setClickedService={setClickedService}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Publish</Button>
          <Button onClick={handleClose}>Discard</Button>
          <Button onClick={handleClose}>Save Wave</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomDialog;
