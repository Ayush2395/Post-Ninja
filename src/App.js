import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Authenticate from "./components/Authenticate";

/*=============components and pages========== */
import Navmenu from "./components/Navmenu";
import useAuth from "./hook/useAuth";
import useLogin from "./hook/useLogin";
import useSignup from "./hook/useSignup";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth();
  const { signup, error, setError } = useSignup();
  const { login, error: errorMessage, setError: setErrorMessage } = useLogin();

  /*==========register new user method========= */
  const signupNewUser = async (e) => {
    e.preventDefault();
    await signup(email, password);
    setEmail("");
    setPassword("");
  };

  /*=============Login existing user============= */
  const handleLoginUser = async (e) => {
    e.preventDefault();
    await login(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Navmenu />
      <div className="container">
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              !user ? (
                <Authenticate
                  title="Login"
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  error={errorMessage}
                  setError={setErrorMessage}
                  fnx={handleLoginUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !user ? (
                <Authenticate
                  title="Signup"
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  error={error}
                  setError={setError}
                  fnx={signupNewUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
