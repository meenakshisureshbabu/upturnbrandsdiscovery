import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { userConfig } from "../config/endPointsConfig";
import { properties } from "../properties/properties";
import Cookies from "universal-cookie";
import { getAuthTokenFromCookie } from "./axiosInstance";
import { getTokenFromResponse } from "./axiosInstance";

export const signUpUser = async (regUserName, userEmail, userPassword) => {
  const userData = {
    email: userEmail,
    password: userPassword,
  };
  //API call to send the username and password to sign up the user
  try {
    const authToken = getAuthTokenFromCookie();

    // const signUpUserResponse = await axiosInstance.post(
    //   userConfig.registerUserEndPoint + `${regUserName}`,
    //   userData,{
    //     headers:{
    //       Authorization:`Bearer ${authToken}`
    //     }
    //   }
    // );

    const signUpUserResponse = await axiosInstance.post(
      userConfig.signUpUserEndPoint + `${regUserName}`,
      userData,
      {
        headers:{
          Authorization:'Bearer '+authToken
        },
        withCredentials: true,
      }
    );
    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHH",signUpUserResponse)
    if (signUpUserResponse.status === 200) 
      getTokenFromResponse(signUpUserResponse);
    else
      throw new Error;
    return signUpUserResponse;
  } catch (error) {
    throw new error;
  }
};
