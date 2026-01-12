import { useContext, useEffect, useState } from "react";
import { postContext } from "../context/PostContext";
import { authContext } from "../context/AuthContext";
import axios from "axios";
import { flushSync } from "react-dom";

function Comments({ id }) {
  let [content, setContent] = useState("");

  let [comments, setComments] = useState([]);

  let { postComments, getComments, setPostComments } = useContext(postContext);

  let { user, getUser } = useContext(authContext);

  let [showButtons, setShowButtons] = useState(false);

  let onComment = async (newComment) => {
    if (!newComment) {
      return;
    }
    try {
      let res = await axios.post(
        "http://127.0.0.1:8000/comments/" + id,
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 201) {
        console.log(res.data);
        setPostComments((prev) => [...prev, res.data]);
      }

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComments();
    getUser();
  }, []);

  useEffect(() => {
    if (postComments) {
      setComments(postComments);
    }
  }, [postComments]);
  return (
    <>
      <div className="flex flex-col gap-1">
        <input
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onFocus={() => setShowButtons(true)}
          type="text"
          placeholder="Leave a comment"
          className="border-[1px] border-zinc-400 p-1 w-full rounded-md"
        />

        {showButtons && (
          <div className="flex gap-1 justify-end">
            <button
              onClick={() => {
                setShowButtons(false);
                setContent("");
              }}
              className="rounded-full border-[1px] border-zinc-400 px-1"
            >
              cancel
            </button>
            <button
              onClick={() => {
                onComment(content);
                setContent("");
              }}
              className="rounded-full border-[1px] border-zinc-400 px-1 bg-gray-600 text-white"
            >
              comment
            </button>
          </div>
        )}

        {comments.map((comment) => {
          if (comment.post_id === id) {
            return (
              <CommentsItems
                comment={comment}
                onComment={onComment}
                key={comment.id}
              />
            );
          }
        })}
      </div>
    </>
  );
}

let CommentsItems = ({ comment }) => {
  let [isReplying, setIsReplying] = useState(false);

  let [comments, setComments] = useState(comment.comments_arr);

  let [newComment, setNewComment] = useState("");

  let onComment = async (newComment) => {
    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/comments/${comment.id}/replies`,
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 201) {
        console.log(res.data);
        setComments((prev) => [...prev, res.data]);
      }

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        key={comment.content}
        className="border-[1px]  pl-2  py-3 ml-5 my-2 "
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
              alt=""
            />
            <h1 className="font-bold text-[14px]">{comment.owner.name}</h1>
            <p className="text-[12px]">
              {new Date(comment.created_at).toLocaleString()}
            </p>
          </div>
          <div className="ml-4">
            <h1 className="font-semibold">{comment.content}</h1>
            <button
              className="border-[1px] border-zinc-700 rounded-full px-2"
              onClick={() => {
                setIsReplying((prev) => !prev);
              }}
            >
              reply
            </button>
          </div>
        </div>

        {isReplying && (
          <div>
            <div className="py-2 flex gap-2">
              <input
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
                type="text"
                placeholder="reply this comment"
                className="border-[1px] p-1"
              />
              <button
                onClick={() => {
                  onComment(newComment);
                  setNewComment("");
                }}
                className="border-[1px] rounded-md px-1 border-zinc-800"
              >
                comment
              </button>
            </div>
          </div>
        )}
        {comments &&
          comments.map((comment) => (
            <CommentsItems key={comment.id} comment={comment} />
          ))}
      </div>
    </>
  );
};

export default Comments;
