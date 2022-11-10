import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase.config";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const registerNewUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password).then(
      () => {
        sendEmailVerification(auth.currentUser);
      }
    );
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleAuth = async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider)
      .then(() => {
        sendEmailVerification(auth.currentUser);
      })
      .catch((err) => console.log(err));
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsub();
    };
  }, [user]);

  return (
    <>
      <AuthContext.Provider
        value={{ user, registerNewUser, loginUser, googleAuth, logoutUser }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
