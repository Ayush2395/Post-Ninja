import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { db } from "../config/firebase.config";
import useAuth from "../hook/useAuth";

const UserPost = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState(null);

  const collectionRef = collection(db, "post");
  const postQuery = query("user_id", `${user.uid}`);
  console.log(postQuery);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      await getDocs(collectionRef).then((data) => {
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    fetchUserBlogs();
  }, []);

  return (
    <>
      <div className="my-5">
        <Table responsive>
          <thead>
            <tr>
              <th>Sr. No:</th>
              <th>Title</th>
              <th>Author</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* {posts &&
              posts.map((post, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>
                      <button className="btn btn-warning mx-1">Edit</button>
                      <button className="btn btn-danger mx-1">Delete</button>
                    </td>
                  </tr>
                );
              })} */}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default UserPost;
