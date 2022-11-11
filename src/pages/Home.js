import React from "react";
import { Alert, Spinner } from "react-bootstrap";
import PostCard from "../components/PostCard";
import useAuth from "../hook/useAuth";
import useFetch from "../hook/useFetch";

const Home = () => {
  const { user } = useAuth();
  const { posts, error, setError } = useFetch();

  return (
    <>
      <div className="container">
        {!user.emailVerified && (
          <Alert className="mt-3" dismissible>
            Please verified your email sent to your mail
          </Alert>
        )}

        {error?.msg && (
          <Alert
            variant={error?.error ? "danger" : "success"}
            dismissible
            onClose={() => setError("")}
          >
            {error?.msg}
          </Alert>
        )}

        {error?.error && (
          <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}
          >
            <Spinner role="status" animation="grow">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <div className="row">
          {posts &&
            posts.map((post) => (
              <div className="col-12 col-sm-12 col-md-5 col-lg-3" key={post.id}>
                <PostCard post={post} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
