import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { userConfig } from "../config/endPointsConfig";
import { properties } from "../properties/properties";
import { getAuthTokenFromCookie } from "./axiosInstance";

export const getUpdatedUserProfile = async (
  regUserName,
  userEmail,
  userOrganization
) => {
  const userData = {
    email: userEmail,
    organization: userOrganization,
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

    const userProfileResponse = await axiosInstance.post(
      userConfig.userProfileEndPoint + `${regUserName}` + "/profile",
      userData,
      {
        headers: {
          Authorization: "Bearer " + authToken,
        },
        withCredentials: true,
      }
    );
    if(userProfileResponse.status === 200)
        return userProfileResponse;
    else{
        throw new Error;
    }
  } catch (error) {
    throw new error;
  }
};
