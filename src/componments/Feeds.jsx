import { useContext, useEffect } from "react";
import PostCreate from "../pages/posts/PostCreate";
import SiderBar from "./SiderBar";
import FeedPost from "./FeedPost";
import { postContext } from "../context/PostContext";

export default function Feeds() {
  let { posts, getPosts } = useContext(postContext);

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="py-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-700">
            Social<span className="text-secondary-600">Feed</span>
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              <i className="fas fa-bell"></i>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"></div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-6 py-6">
        <SiderBar />

        <main className="flex-1 space-y-6">
          <PostCreate />

          {posts &&
            posts.map((post) => {
              return (
                <div className="space-y-6" key={post.Post.id}>
                  <FeedPost
                    id={post.Post.id}
                    user={post.Post.owner.name}
                    avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                    timeAgo={new Date(post.Post.created_at).toLocaleString()}
                    content={post.Post.content}
                    // image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80"
                    likes={post.votes ? post.votes : 0}
                  />
                </div>
              );
            })}
        </main>
      </div>
    </div>
  );
}
