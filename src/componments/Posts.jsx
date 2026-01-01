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
                  user={post.Post.owner.name}
                  avatar={
                    post.Post.owner.profile_pic
                      ? post.Post.owner.profile_pic
                      : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                  }
                  timeAgo={new Date(post.Post.created_at).toLocaleString()}
                  content={post.Post.content}
                  // image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80"
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
