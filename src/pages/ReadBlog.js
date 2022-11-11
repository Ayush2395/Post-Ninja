import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import postService from "../config/post.service";
import useFetch from "../hook/useFetch";

const ReadBlog = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState({ error: false, msg: null });

  const { posts } = useFetch();

  const { id } = useParams();

  useEffect(() => {
    const readBlogs = async () => {
      await postService.readPost(id).then((data) => {
        if (!data.id) return setError({ error: true, msg: "Invalid DocRef" });
        if (data.exists()) {
          setPost(data.data());
        }
      });
    };
    readBlogs();
  }, [id]);

  return (
    <>
      {error?.msg && (
        <Alert
          variant={error?.error ? "danger" : "success"}
          dismissible
          onClose={() => setError("")}
        >
          {error?.msg}
        </Alert>
      )}
      <div className="container-lg-fluid">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-9 col-lg-9 mb-3">
            <h1 className="display-5">{post && post.title}</h1>
            <p className="fs-5">
              Post by:{" "}
              <span className="text-success">{post && post.author}</span>
            </p>
            <hr className="my-3" />
            <p className="fs-4">{post && post.content}</p>
          </div>
          <div className="col-12 col-sm-12 col-md-3 col-lg-3 my-3 ">
            <h1 className="fs-3">More Post</h1>
            {posts &&
              posts.map((post) => (
                <div className="post position-sticky top-10" key={post.id}>
                  <PostCard post={post} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadBlog;
