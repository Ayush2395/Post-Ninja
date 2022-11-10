import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useSignup = () => {
  const [error, setError] = useState({ error: false, msg: null });
  const { registerNewUser } = useAuth();
  const navigate = useNavigate();

  const signup = async (email, password) => {
    if (email === "" || password === "") {
      return setError({ error: true, msg: "All field are required" });
    }

    try {
      await registerNewUser(email, password);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          return setError({
            error: true,
            msg: (error.code = "This email is already registered"),
          });
        case "auth/weak-password":
          return setError({
            error: true,
            msg: (error.code = "Your password is weak"),
          });
        default:
          return setError({ error: true, msg: error.code });
      }
    }
  };

  return { signup, error, setError };
};

export default useSignup;
