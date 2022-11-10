import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useLogin = () => {
  const [error, setError] = useState({ error: false, msg: null });
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const login = async (email, password) => {
    if (email === "" || password === "") {
      return setError({ error: true, msg: "All Fields are required" });
    }

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          return setError({
            error: true,
            msg: (error.code = "You entered wrong password"),
          });
        case "auth/user-not-found":
          return setError({
            error: true,
            msg: (error.code = "You are not registered"),
          });
        default:
          return setError({ error: true, msg: error.code });
      }
    }
  };
  return { login, error, setError };
};

export default useLogin;
