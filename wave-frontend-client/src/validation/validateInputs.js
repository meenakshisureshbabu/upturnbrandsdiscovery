export const validateUsername = (userName) => {
  // Check if username is empty or null. If so, return false and display error message.
  if (!userName || userName === "") {
    return false;
  } else {
    const userNameRegex = /^[a-zA-Z0-9_$*#!]{6,16}$/;
    return userNameRegex.test(userName);
  }
};

export const validateEmailId = (emailId) => {
  const emailIdRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailIdRegex.test(emailId);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};
