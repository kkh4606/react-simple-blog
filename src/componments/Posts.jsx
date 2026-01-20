import { useContext, useEffect } from "react";
import { postContext } from "../context/PostContext";
import PostCreate from "../pages/posts/PostCreate";
import FeedPost from "./FeedPost";

function Posts() {
  let { posts, getPosts } = useContext(postContext);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="flex-1 space-y-6">
        <PostCreate />
        {posts &&
          posts.map((post) => {
            return (
              <div className="space-y-6" key={post.Post.id}>
                <FeedPost
                  post={post}
                  id={post.Post.id}
                  _user={post.Post.owner.name}
                  avatar={
                    post.Post.owner.profile_pic
                      ? post.Post.owner.profile_pic
                      : "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
                  }
                  timeAgo={new Date(post.Post.created_at).toLocaleString()}
                  content={post.Post.content}
                  likes={post.votes ? post.votes : 0}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Posts;
