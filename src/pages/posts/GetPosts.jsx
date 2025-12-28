import axios from "axios";
import { useEffect, useState } from "react";

function GetPosts() {
  let [posts, setPost] = useState([]);

  let getPosts = async () => {
    try {
      let res = await axios.get("http://localhost:8000/posts");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return <div>GetPosts</div>;
}

export default GetPosts;
