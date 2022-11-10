import React from "react";
import { BsEmojiDizzy } from "react-icons/bs";

const Page404 = () => {
  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "85vh" }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <h1 className="display-3 fw-normal">
            Page not Found <BsEmojiDizzy />
          </h1>
        </div>
      </div>
    </>
  );
};

export default Page404;
