import React from "react";
import RippleContent from "../../components/RippleContent";
import AvailableServicesList from "../AvailableServicesList/AvailableServicesList";
import { UserNameContext } from "../../context/UserNameContext";
import { useState,useContext } from "react";
import { Button, TextField } from "@mui/material";
import { createWave } from "../../api/waveApi";


function CreateWaveDialog({ clickedService, setClickedService }) {

  const { userName } = useContext(UserNameContext);
  const [disabled, setDisabled] = useState(true);
  const [waveName,setWaveName] = useState("");
  const [error,setError] = useState();
  const [waveId,setWaveId] = useState();

  const handleCreateWave = async() => {
    try{
      const waveId = await createWave(userName);
      setWaveId(waveId)
      setDisabled(false);
    }
    catch(error){
      setError(error)
    }
  }

  const handleChangeWaveName = (event) => {
    setWaveName(event.target.value);
    //alert(waveName)
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
        <TextField
          fullWidth
          label="Create a Wave"
          id="createwave"
          focused={true}
          value={waveName}
          onChange={handleChangeWaveName}
          onKeyDown={(event) => event.key === 'Enter' && handleCreateWave()}
        />
        <Button onClick={handleCreateWave}>Create</Button>
      </div>

      <AvailableServicesList
        setClickedService={setClickedService}
        disabled={disabled}
      />
      <RippleContent clickedService={clickedService} waveId={waveId}/>
    </div>
  );
}

export default CreateWaveDialog;
