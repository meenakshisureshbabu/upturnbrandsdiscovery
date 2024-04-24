import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../components/components.css'


function FullWidthTextField({label,id,handleClickOpen,setOpen}) {

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
        
      }}
    >
      <TextField className='createWave-Textfield' fullWidth label={label} id={id} onClick={handleClickOpen} setOpen={setOpen}/>
    </Box>
  )
}

export default FullWidthTextField