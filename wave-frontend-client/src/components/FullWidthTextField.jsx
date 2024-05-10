import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../components/components.css'
import { borderRadius, style } from '@mui/system';


function FullWidthTextField({label,id,handleClickOpen,setOpen,width,maxWidth,borderRadius,handleOnBlur,setMethod}) {

  return (
    <Box
      sx={{
        width: width,
        maxWidth: maxWidth,
      }}
    >
      <TextField fullWidth onChange={(event) => setMethod(event.target.value)} label={label} id={id} size='small' onBlur={handleOnBlur} onClick={handleClickOpen} setOpen={setOpen} InputProps={{style:{borderRadius:borderRadius}}}/>
    </Box>
  )
}

export default FullWidthTextField