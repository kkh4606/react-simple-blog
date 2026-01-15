import { useContext, useEffect, useState } from "react";
import { postContext } from "../context/PostContext";
import { authContext } from "../context/AuthContext";
import axios from "axios";

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
        setPostComments((prev) => [...prev, res.data]);
      }
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
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onFocus={() => setShowButtons(true)}
          type="text"
          placeholder="Write a comment"
          className="border-[1px] border-zinc-400 py-6 px-2 w-full rounded-md"
        />

        {showButtons && (
          <div className="flex gap-1 justify-end">
            <button
              onClick={() => {
                setShowButtons(false);
                setContent("");
              }}
              className="rounded-md border-[1px] border-zinc-400 px-1"
            >
              cancel
            </button>
            <button
              onClick={() => {
                onComment(content);
                setContent("");
              }}
              className="rounded-md  border-[1px] border-zinc-400 px-1 bg-gray-600 text-white "
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
  function addReplyById(comments, parentId, newReply) {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          comments_arr: [...(comment.comments_arr || []), newReply],
        };
      }

      return {
        ...comment,
        comments_arr: addReplyById(
          comment.comments_arr || [],
          parentId,
          newReply
        ),
      };
    });
  }

  let { setPostComments } = useContext(postContext);

  let [isReplying, setIsReplying] = useState(false);

  let comments = comment.comments_arr || [];

  let [newComment, setNewComment] = useState("");

  let [showReply, setShowReply] = useState(true);

  let { user } = useContext(authContext);

  let onComment = async (newComment) => {
    if (newComment.trim() === "") {
      return;
    }

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

      setPostComments((prev) => addReplyById(prev, comment.id, res.data));
    } catch (err) {
      console.log(err);
    }
  };

  function removeCommentById(comments, id) {
    return comments
      .filter((comment) => comment.id !== id)
      .map((comment) => ({
        ...comment,
        comments_arr: removeCommentById(comment.comments_arr || [], id),
      }));
  }

  let deleteComment = async (id) => {
    console.log(comment);
    try {
      let res = await axios.delete(`http://127.0.0.1:8000/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPostComments((prev) => removeCommentById(prev, id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div key={comment.id} className=" pt-3  pl-1  ml-3  ">
        <div className="flex relative flex-col justify-center  bg-gray-100 rounded-md py-5">
          {comment.parent_id === null && (
            <button
              onClick={() => {
                setShowReply((prev) => !prev);
              }}
              className="absolute -left-3"
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          )}
          <div className="flex items-center gap-2 ml-2">
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
          <div className="ml-3">
            <h1 className="font-semibold">{comment.content}</h1>

            <div className="flex gap-5">
              <button
                className="flex items-center"
                onClick={() => {
                  setIsReplying((prev) => !prev);
                }}
              >
                <svg
                  className="mr-1.5 w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  ></path>
                </svg>
                <span>Reply</span>
              </button>

              {user && user.id === comment.owner_id && (
                <>
                  <button>Edit</button>
                  <button onClick={() => deleteComment(comment.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {isReplying && (
          <div className="h-10 relative">
            <input
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              type="text"
              placeholder="reply this comment"
              className="border-[1px] h-full w-full pl-2 rounded-md overflow-hidden"
            />
            <button
              onClick={() => {
                onComment(newComment);

                setNewComment("");
                setIsReplying(false);
              }}
              className="absolute right-1 top-2 -rotate-45"
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
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        )}

        {showReply &&
          comments &&
          comments.map((comment) => {
            return <CommentsItems key={comment.id} comment={comment} />;
          })}
      </div>
    </>
  );
};

export default Comments;
