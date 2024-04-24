import React from 'react'
import FullWidthTextField from '../../components/FullWidthTextField'
import '../CreateWave/createwave.css'
import { useState } from "react";
import CustomDialog from '../../components/CustomDialog';
import { forwardRef } from "react";
import Slide from "@mui/material/Slide";

function CreateWave() {

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <div className='create-wave-text-box-container'>
        <FullWidthTextField className='createWave' label='Create a Wave' id='createWave' handleClickOpen={handleClickOpen} setOpen={setOpen}/>
        <CustomDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        setOpen = {setOpen}
      />
    </div>
    
  )
}

export default CreateWave