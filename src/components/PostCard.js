import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <>
      <div className="card my-4 rounded-4 shadow">
        <div className="card-body">
          <p className="fs-3">{post.title}</p>
          <p className="fs-5">
            Post by: <span className="text-primary">{post.author}</span>
          </p>
          <Link className="btn btn-warning" to={`/post/${post.id}`}>
            Read Post
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostCard;
