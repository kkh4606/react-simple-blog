import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postContext } from "../context/PostContext";
import FeedPost from "./FeedPost";

function UserDetails() {
  let { id } = useParams();

  let { posts, getPosts } = useContext(postContext);

  let [userInfo, setUserInfo] = useState(null);

  let getUserdetails = async (id) => {
    try {
      let res = await axios.get(`http://127.0.0.1:8000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        setUserInfo(res.data);
      }
    } catch (err) {
      console.log(res);
    }
  };

  useEffect(() => {
    getUserdetails(id);
    getPosts();
  }, [id]);
  return (
    <>
      <div className="flex-1  space-y-6">
        <div className=" mx-auto  flex max-w-xs flex-col items-center rounded-xl border px-4 py-4 text-center md:max-w-lg md:flex-row md:items-start md:text-left">
          <div className="mb-4 md:mr-6 md:mb-0">
            <img
              className="h-56 rounded-lg object-cover md:w-56"
              src={
                userInfo && userInfo.profile_pic
                  ? userInfo.profile_pic
                  : "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="">
            <p className="text-xl font-medium text-gray-700">
              {userInfo && userInfo.name}
            </p>
            <p className="mb-4 text-sm font-medium text-gray-500">
              Junior Programmer
            </p>
            <div className="flex space-x-2">
              <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-500">Posts</p>
                <p className="text-3xl font-medium text-gray-600">0</p>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-500">Following</p>
                <p className="text-3xl font-medium text-gray-600">7</p>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-500">Followers</p>
                <p className="text-3xl font-medium text-gray-600">2.5k</p>
              </div>
              <div className=""></div>
            </div>
            <div className="mb-3"></div>
            <div className="flex space-x-2">
              <button className="w-full rounded-lg border-2 bg-white px-4 py-2 font-medium text-gray-500">
                Message
              </button>
              <button className="w-full rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white">
                Follow
              </button>
            </div>
          </div>
        </div>

        <h1 className="font-bold text-2xl ml-9">Posts</h1>
        {posts &&
          userInfo &&
          posts.map((post) => {
            if (post.Post.owner.id === userInfo.id)
              return (
                <div className="space-y-6" key={post.Post.id}>
                  <FeedPost
                    post={post}
                    post_id={post.Post.id}
                    user={post.Post.owner.name}
                    avatar={
                      post.Post.owner.profile_pic
                        ? post.Post.owner.profile_pic
                        : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
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

export default UserDetails;
