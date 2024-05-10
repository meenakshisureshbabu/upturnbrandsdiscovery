import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterNewUser from "./pages/Register/RegisterNewUser";
import { useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import Profile from "./pages/Profile/Profile";
import EmailIdProvider from "./context/EmailIdContext";
import UserNameProvider from "./context/UserNameContext";
import Home from "./pages/HomePage/Home";
import { getUser } from "./api/axiosInstance";
import Header from "./components/Header/Header";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div className="App">
      {user ? (
        <>
          <EmailIdProvider>
            <UserNameProvider>
              <Header user={user} setUser={setUser}/>
              <Routes>
                <Route
                  path="/home"
                  element={<Home user={user} setUser={setUser} />}
                />
                <Route
                  path="/profile"
                  element={<Profile user={user} setUser={setUser} />}
                />
                <Route path="/*" element={<Navigate to="/home" />} />
              </Routes>
            </UserNameProvider>
          </EmailIdProvider>
        </>
      ) : (
        <>
          <UserNameProvider>
            <EmailIdProvider>
              <Routes>
                <Route
                  path="/register"
                  element={<RegisterNewUser user={user} setUser={setUser} />}
                />
                <Route
                  path="/signup"
                  element={<SignUp user={user} setUser={setUser} />}
                />
                <Route
                  path="/login"
                  element={<LoginPage user={user} setUser={setUser} />}
                />
                <Route path="/*" element={<Navigate to="/login" />} />
              </Routes>
            </EmailIdProvider>
          </UserNameProvider>
        </>
      )}
    </div>
  );
}

export default App;
