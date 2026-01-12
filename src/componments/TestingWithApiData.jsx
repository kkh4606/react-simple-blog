import { useContext, useEffect, useState } from "react";
import { postContext } from "../context/PostContext";
import axios from "axios";

function TestingWithApiData() {
  let [content, setContent] = useState("");

  let [comments, setComments] = useState([]);

  let { postComments, getComments, setPostComments } = useContext(postContext);

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (postComments) {
      setComments(postComments);
    }
  }, [postComments]);

  let onComment = async (newComment) => {
    try {
      let res = await axios.post(
        "http://127.0.0.1:8000/comments/13",
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
  return (
    <>
      <div className="flex flex-col ml-10 mt-10 w-screen h-screen">
        <h1 className="font-bold">Nested Comments</h1>
        <CommentInput onComment={onComment} />

        {comments.map((comment) => (
          <CommentsItems
            comment={comment}
            onComment={onComment}
            key={comment.id}
          />
        ))}
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
      <div key={comment.content} className="border-[1px] py-4 pl-2 my-3 w-3/4">
        <h1 className="font-bold">{comment.content}</h1>
        <button
          className="border-[1px] border-zinc-700 rounded-full px-2"
          onClick={() => {
            setIsReplying((prev) => !prev);
          }}
        >
          reply
        </button>

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

let CommentInput = ({ onComment }) => {
  let [content, setContent] = useState("");
  return (
    <div className="flex flex-col w-screen gap-2">
      <input
        value={content}
        onChange={(event) => setContent(event.target.value)}
        type="text"
        placeholder="what is on your thoughts?"
        className="border-[1px] border-zinc-400 p-2 w-3/4"
      />
      <button
        onClick={() => {
          onComment(content);
          setContent("");
        }}
        className="border-[1px] border-zinc-400 rounded-full px-1 w-20"
      >
        comment
      </button>
    </div>
  );
};

export default TestingWithApiData;
