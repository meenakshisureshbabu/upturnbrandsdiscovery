import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

//Axios instance
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
  "token"
)}`;

//Saving the token in Cookies
export const setToken = (authToken) => {
  cookies.set("authtoken", authToken, {
    path: "/",
    //httpOnly: true,
    secure: true,
  });
  //console.log(cookies);
};

export const getTokenFromResponse = (response) => {
  const authToken = response.headers.get("x-auth-token");
  if (authToken !== null) setToken(authToken);
  else throw new Error();
};

export const getAuthTokenFromCookie = () => {
  //console.log(cookies);
  const tokenFromCookie = cookies.get("authtoken");
  return tokenFromCookie;
};

export const getAuthUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? user : null;
}

export const saveUserToLocalStorage = (userName) => {
  localStorage.setItem('user',userName)
  return getUser()
}

export function getUser() {
  const user = getAuthUserFromLocalStorage();
  // If there's a user, return the user, otherwise return null
  return user ? user : null;
}
