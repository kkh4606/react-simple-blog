import { useState } from "react";

function Example() {
  let dummyComments = [
    {
      id: 1,
      content: "first comment",
      comments: [
        {
          id: 2,
          content: "hi",
          comments: [],
        },
      ],
    },

    {
      id: 2,
      content: "second comment",
      comments: [],
    },
  ];

  let [content, setContent] = useState("");

  let [comments, setComments] = useState(dummyComments);

  let onComment = (newComment) => {
    setComments((prev) => [
      { id: 3, content: newComment, comments: [] },
      ...prev,
    ]);
  };
  return (
    <>
      <div className="flex flex-col ml-10 mt-10 w-screen h-screen">
        <h1 className="font-bold">Nested Comments</h1>
        <CommentInput onComment={onComment} />

        {comments.map((comment) => (
          <CommentsItems comment={comment} />
        ))}
      </div>
    </>
  );
}

let CommentsItems = ({ comment }) => {
  let [isReplying, setIsReplying] = useState(false);

  let [comments, setComments] = useState(comment.comments);

  let [newComment, setNewComment] = useState({
    id: 20,
    content: "",
    comments: [],
  });

  let onComment = (new_comment) => {
    console.log("you reply this comment");
    setComments((prev) => [new_comment, ...prev]);
  };

  return (
    <>
      <div key={comment.content} className="border-[1px] py-4 pl-2 my-3">
        <h1 className="font-bold">{comment.content}</h1>
        <button
          className="border-[1px] border-zinc-700 rounded-full px-2"
          onClick={() => setIsReplying((prev) => !prev)}
        >
          reply
        </button>

        {isReplying && (
          <div>
            <div className="py-2 flex gap-2">
              <input
                value={newComment.content}
                onChange={(event) =>
                  setNewComment({ ...newComment, content: event.target.value })
                }
                type="text"
                placeholder="reply this comment"
                className="border-[1px] p-1"
              />
              <button
                onClick={() => onComment(newComment)}
                className="border-[1px] rounded-md px-1 border-zinc-800"
              >
                comment
              </button>
            </div>
            {comments &&
              comments.map((prev) => (
                <CommentsItems key={prev.content} comment={prev} />
              ))}
          </div>
        )}
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

export default Example;
