import NavBar from "../componments/NavBar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  let [posts, setPost] = useState([]);

  let getPosts = async () => {
    console.log("hello world");
    try {
      let res = await axios.get("http://127.0.0.1:8000/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {/* <NavBar /> */}
      <Outlet />
    </>
  );
}

export default Home;
