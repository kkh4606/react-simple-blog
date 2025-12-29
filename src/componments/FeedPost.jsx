import axios from "axios";
import { useContext, useEffect } from "react";
import { postContext } from "../context/PostContext";

function FeedPost({ user, avatar, timeAgo, content, image, likes, id }) {
  let { posts, setPosts, getPosts } = useContext(postContext);
  let deletePost = async () => {
    try {
      let res = await axios.delete("http://127.0.0.1:8000/posts/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPosts(posts.filter((post) => post.Post.id != id));
    } catch (err) {
      console.log(err);
    }
  };

  let likePost = async (id) => {
    let payload = { post_id: id, dir: 1 };

    try {
      let res = await axios.post("http://127.0.0.1:8000/vote", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPosts((prev) =>
        prev.map((post) =>
          post.Post.id === id
            ? { ...post, votes: (post.votes ?? 0) + 1 } 
            : post
        )
      );
    } catch (err) {
      return;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={avatar}
              alt={user}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{user}</h3>
              <p className="text-xs text-gray-500">{timeAgo}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 text-gray-700">{content}</div>
      </div>
      {image && <img src={image} alt="Post" className="w-full h-auto" />}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex justify-between text-gray-500">
          <div className="flex items-center space-x-1 hover:text-primary-600">
            <button
              onClick={() => {
                likePost(id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>

            <span>{likes}</span>
          </div>
          <div>
            <button onClick={deletePost} className="pr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedPost;
