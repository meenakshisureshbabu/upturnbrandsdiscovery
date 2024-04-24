import axios from "axios";
import { getTokenFromResponse } from "./axiosInstance";
import { axiosInstance } from "./axiosInstance";
import { userConfig } from "../config/endPointsConfig";
import { properties } from "../properties/properties";

export const getRegisterStatus = async (regUserName) => {
  /* 
        ** call the register API to check the username exists or not 
        ** if the username already exists, the response would be Username already exists, please try again with someother username
        ** if the username does not exists, the response would be username and r=token with the status code 200
        ** If anything else goes wrong, the reponse would be error with 502 or 402

    */
  try {
    const response = await axiosInstance.post(
      userConfig.registerUserEndPoint + `${regUserName}`
    );
    if (response.status === 200) getTokenFromResponse(response);
    return response;
  } catch (error) {
    return error.response;
  }
};
