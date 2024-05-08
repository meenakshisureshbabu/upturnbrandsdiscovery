import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../components/components.css'
import { borderRadius, style } from '@mui/system';


function FullWidthTextField({label,id,handleClickOpen,setOpen,width,maxWidth,borderRadius}) {

  return (
    <Box
      sx={{
        width: width,
        maxWidth: maxWidth,
      }}
    >
      <TextField fullWidth label={label} id={id} onClick={handleClickOpen} setOpen={setOpen} InputProps={{style:{borderRadius:borderRadius}}}/>
    </Box>
  )
}

export default FullWidthTextField