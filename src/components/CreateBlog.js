import { serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import postService from "../config/post.service";
import useAuth from "../hook/useAuth";
import UserPost from "./UserPost";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState({ error: false, msg: null });

  const { user } = useAuth();

  const handlePublishPost = async (e) => {
    e.preventDefault();

    if (title === "" || author === "" || content === "")
      return setError({ error: true, msg: "All Fields are required" });

    const postData = {
      title,
      author,
      content,
      user_id: user.uid,
      createdAt: serverTimestamp(),
    };

    await postService
      .createPost(postData)
      .then(() => {
        setError({ error: false, msg: "Your post is published" });
        setTitle("");
        setAuthor("");
        setContent("");
      })
      .catch((err) => {
        setError({ error: true, msg: err.code });
      });
  };

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100 py-4" style={{ maxWidth: "600px" }}>
          {error?.msg && (
            <Alert
              variant={error?.error ? "danger" : "success"}
              dismissible
              onClose={() => setError("")}
            >
              {error?.msg}
            </Alert>
          )}
          <div className="card rounded-4 shadow">
            <div className="card-body">
              <div className="card-title text-center fs-1">Create post</div>
              <hr className="my-3" />
              <form onSubmit={handlePublishPost}>
                <div className="form-group mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="form-control"
                    id="title"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="author" className="form-label">
                    Author
                  </label>
                  <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    type="text"
                    className="form-control"
                    id="author"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    className="form-control"
                    id="content"
                    style={{ resize: "none", height: "180px" }}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-success shadow-sm">
                  Publish post
                </button>
              </form>
            </div>
          </div>
          <UserPost />
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
