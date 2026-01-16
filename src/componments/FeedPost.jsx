import axios from "axios";
import { useContext, useState } from "react";
import { postContext } from "../context/PostContext";
import Comments from "./Comments";
import { Textarea } from "@headlessui/react";

function FeedPost({ _user, avatar, timeAgo, content, image, likes, id, post }) {
  let { setPosts, posts } = useContext(postContext);

  let [isModified, setIsModified] = useState(false);

  let [isEditContent, setIsEditContent] = useState(false);

  let [editedContent, setEditedContent] = useState(content);

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

  let deltePost = async (id) => {
    try {
      let res = await axios.delete("http://127.0.0.1:8000/posts/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 204) {
        setPosts(posts.filter((post) => post.Post.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  let editPost = async (id) => {
    if (editedContent.trim() === "") return;

    try {
      let res = await axios.put(
        `http://127.0.0.1:8000/posts/${id}`,
        {
          content: editedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200) {
        setIsEditContent(false);

        setPosts(
          posts.map((post) => {
            return post.Post.id === id
              ? { Post: { ...post.Post, content: editedContent } }
              : { Post: { ...post.Post } };
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white relative mx-8 rounded-lg shadow overflow-hidden">
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

          {isEditContent && (
            <div className="absolute  top-2 left-56 rounded-md bg-gray-200 overflow-hidden flex flex-col gap-1  w-2/4 h-36">
              <Textarea
                value={editedContent}
                onChange={(event) => setEditedContent(event.target.value)}
                type="text"
                className="w-full h-2/3 px-2 py-3 bg-gray-300 "
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsEditContent(false);
                    setEditedContent("");
                  }}
                  className="border-[1px] px-2 py-1 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    editPost(id);
                    setIsEditContent(false);
                  }}
                  className="border-[1px] px-2 py-1 rounded-md bg-gray-600 text-white"
                >
                  Post
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col relative">
            {isModified && (
              <div className=" absolute -left-32 flex flex-col gap-2 w-32 py-2 bg-gray-200 rounded-md">
                <button
                  onClick={() => deltePost(id)}
                  className="flex hover:bg-slate-400 w-full transition-all rounded-md px-2 py-1"
                >
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
                  <span>Delete</span>
                </button>
                <button
                  onClick={() => setIsEditContent((prev) => !prev)}
                  className="flex hover:bg-slate-400 w-full rounded-md transition-all px-2 py-1"
                >
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
                  <span>Edit</span>
                </button>
              </div>
            )}

            <button
              className="rotate-90 -translate-y-3"
              onClick={() => setIsModified((prev) => !prev)}
            >
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
            </button>
          </div>
        </div>
        <div className="mt-4 text-gray-700">{content}</div>
      </div>
      {image && <img src={image} alt="Post" className="w-full h-auto" />}
      <div className="px-3 py-3 border-t border-gray-100">
        <div className="flex flex-col  justify-end gap-3 py-2 text-gray-500">
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
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
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
