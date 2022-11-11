import { useEffect, useState } from "react";
import postService from "../config/post.service";

const useFetch = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState({ error: false, msg: null });

  const fetchPost = async () => {
    await postService.getAllPost().then((data) => {
      if (data.empty) {
        return setError({ error: true, msg: "There is no posts." });
      }
      if (data) {
        setError({ error: false });
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return { posts, error,setError };
};

export default useFetch;
