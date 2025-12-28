import axios from "axios";
import { useState } from "react";

function PostCreate() {
  let [post, setPost] = useState({
    title: "title",
    content: "content",
    published: true,
  });

  let createPost = async () => {
    try {
      let res = await axios.post("http://127.0.0.1:8000/posts", post, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(res);
    } catch {
      return;
    }
  };

  return (
    <>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>

      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <input
          value={post.title}
          onChange={(e) => {
            setPost({ ...post, title: e.target.value });
          }}
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Title"
          type="text"
        />
        <textarea
          onChange={(e) => {
            setPost({ ...post, content: e.target.value });
          }}
          value={post.content}
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          // spellCheck="false"
          placeholder="Describe everything about this post here"
        ></textarea>

        <div className="buttons flex">
          <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            Cancel
          </div>
          <button
            onClick={createPost}
            className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}

export default PostCreate;
