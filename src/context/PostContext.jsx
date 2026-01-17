import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

let postContext = createContext();

let PostContextProvider = ({ children }) => {
  let [posts, setPosts] = useState([]);

  let [error, setError] = useState(null);

  let [postComments, setPostComments] = useState([]);

  let getPosts = async () => {
    try {
      let res = await axios.get("http://127.0.0.1:8000/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        setPosts(res.data);
      }
    } catch (err) {
      setError(err);
    }
  };

  let getComments = async () => {
    try {
      let res = await axios.get("http://127.0.0.1:8000/comments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPostComments(res.data);
    } catch (err) {
      return;
    }
  };

  return (
    <postContext.Provider
      value={{
        posts,
        getPosts,
        setPosts,

        postComments,
        setPostComments,
        getComments,
      }}
    >
      {children}
    </postContext.Provider>
  );
};

export { postContext, PostContextProvider };
