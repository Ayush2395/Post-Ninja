import React, { useState } from "react";
import { Alert, InputGroup } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import useAuth from "../hook/useAuth";

const Authenticate = ({
  title,
  fnx,
  error,
  setError,
  email,
  password,
  setEmail,
  setPassword,
}) => {
  const [show, setShow] = useState(false);
  const { googleAuth } = useAuth();

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {error?.msg && (
            <Alert
              variant={error?.error ? "danger" : "success"}
              dismissible
              onClose={() => setError("")}
            >
              {error?.msg}
            </Alert>
          )}
          <div className="card">
            <div className="card-body">
              <div className="card-title fs-2 text-center">{title}</div>
              <hr className="my-3" />
              <form onSubmit={fnx}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="type here"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <InputGroup>
                    <InputGroup.Text onClick={() => setShow(!show)}>
                      {!show ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                    </InputGroup.Text>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      type={show ? "text" : "password"}
                      className="form-control"
                      placeholder="type here"
                    />
                  </InputGroup>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {title}
                </button>
              </form>
            </div>
          </div>
          <GoogleButton
            onClick={googleAuth}
            className="my-3 w-100"
            type="light"
            label={`${title} with Google`}
          />
        </div>
      </div>
    </>
  );
};

export default Authenticate;
