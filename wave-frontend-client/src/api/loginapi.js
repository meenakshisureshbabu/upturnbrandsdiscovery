import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { userConfig } from "../config/endPointsConfig";
import { properties } from "../properties/properties";
import Cookies from "universal-cookie";
import { getAuthTokenFromCookie } from "./axiosInstance";
import { getTokenFromResponse,saveUserToLocalStorage } from "./axiosInstance";

export const loginUserResponse = async (userName, userPassword) => {
  const userData = {
    username: userName,
    password: userPassword,
  };
  //API call to send the username and password to sign up the user
  try {

    // const signUpUserResponse = await axiosInstance.post(
    //   userConfig.registerUserEndPoint + `${regUserName}`,
    //   userData,{
    //     headers:{
    //       Authorization:`Bearer ${authToken}`
    //     }
    //   }
    // );

    const loginUserResponse = await axiosInstance.post(
      userConfig.loginUserEndPoint,
      userData
    );
    if (loginUserResponse.status === 200) {
      getTokenFromResponse(loginUserResponse);
      saveUserToLocalStorage(userName)
    }
    return loginUserResponse;
  } catch (error) {
    throw new error;
  }
};
