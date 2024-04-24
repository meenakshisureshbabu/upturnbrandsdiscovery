import axios from "axios";
import {waveConfig} from "../config/endPointsConfig";
import { getAuthTokenFromCookie } from "./axiosInstance";
import { axiosInstance } from "./axiosInstance";
import askGPTConfig, { temperature } from "../config/systemconfig";

export const createWave = async (regUserName) => {
  //API call to get the waveId
  try {
    const authToken = getAuthTokenFromCookie();

    const getWaveIdUserResponse = await axiosInstance.post(
      waveConfig.allWaveEndPoint + `${regUserName}/wave/create`,
      {
        headers: {
          Authorization: "Bearer " + authToken,
        },
        withCredentials: true,
      }
    );
    if (getWaveIdUserResponse.status === 200) return getWaveIdUserResponse.data.waveId;
    else throw new Error();
  } catch (error) {
    throw new error();
  }
};


export const getGPTResponse = async(userQuery,userName,waveId,messageArray) => {
  console.log("MESSAGES",messageArray);
  
  //API call to get the GPT reponse
  const askGPTData = {
    //change the data to whole data
    
    messages: messageArray,
    model:askGPTConfig.version,
    temperature:askGPTConfig.temperature
  };
  try{
    const authToken = getAuthTokenFromCookie();

    const getGPTResponseForWave = await axiosInstance.post(
      waveConfig.allWaveEndPoint + `${userName}/wave/${waveId}/ripple/gpt`,askGPTData,
      {
        headers: {
          Authorization: "Bearer " + authToken,
        },
        withCredentials: true,
      }
    )
    if (getGPTResponseForWave.status === 200) return getGPTResponseForWave.data;
    else throw new Error();
  }
  catch(error){
    throw new error()
  }

}
