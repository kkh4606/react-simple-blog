import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { postContext } from "../context/PostContext";
import Comments from "./Comments";

function FeedPost({ _user, avatar, timeAgo, content, image, likes, id, post }) {
  let { setPosts } = useContext(postContext);

  let likePost = async (id) => {
    let payload = { post_id: id, dir: 1 };

    try {
      let res = await axios.post("http://127.0.0.1:8000/vote", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 201) {
        setPosts((prev) =>
          prev.map((post) =>
            post.Post.id === id
              ? { ...post, votes: (post.votes ?? 0) + 1 }
              : post
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white mx-8 rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={avatar}
              alt={_user}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{_user}</h3>
              <p className="text-xs text-gray-500">{timeAgo}</p>
            </div>
          </div>

          <div className="flex flex-col relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>
          </div>
        </div>
        <div className="mt-4 text-gray-700">{content}</div>
      </div>
      {image && <img src={image} alt="Post" className="w-full h-auto" />}
      <div className="px-3 py-3 border-t border-gray-100">
        <div className="flex flex-col justify-end gap-3 py-2 text-gray-500">
          <div className="flex gap-7 items-center space-x-1 hover:text-primary-600">
            <button
              className="flex items-center gap-1"
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
              <span>{likes}</span>
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
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
            </button>
          </div>
          <Comments id={id} />
        </div>
      </div>
    </div>
  );
}

export default FeedPost;
