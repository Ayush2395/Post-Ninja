import React from "react";
import { Alert } from "react-bootstrap";
import useAuth from "../hook/useAuth";

const Home = () => {
  const { user } = useAuth();
  return (
    <>
      {!user.emailVerified && (
        <Alert className="mt-3" dismissible>
          Please verified your email sent to your mail
        </Alert>
      )}
      <div>Home</div>
    </>
  );
};

export default Home;
