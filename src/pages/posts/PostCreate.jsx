import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { postContext } from "../../context/PostContext";

function PostCreate() {
  let [new_post, setNewPost] = useState({
    title: "title",
    content: "",
    published: true,
  });

  let [file, setFile] = useState(null);

  let [imageUrl, setImageUrl] = useState(null);

  let { posts, setPosts } = useContext(postContext);

  let [error, setError] = useState(null);

  let createPost = async () => {
    try {
      if (new_post.content === "") {
        setError({ message: "post shouldn't be blank" });
      } else {
        setError(null);
        let res = await axios.post("http://127.0.0.1:8000/posts", new_post, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(res.data);

        if (res.status === 201) {
          setNewPost({ ...new_post, content: "" });
          setPosts([{ Post: res.data }, ...posts]);
        }
      }
    } catch (err) {
      setError(err);
    }
  };

  const handleChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setFile(e.target.files[0]); // store the actual File object
  };

  const uploadProfile = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // append the File object, not URL

    try {
      let res = await axios.put("http://127.0.0.1:8000/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", // important
        },
      });

      console.log("hi");
      setImageUrl(res.data.profile_pic);

      console.log("Uploaded user:", res.data.profile_pic);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-start space-x-3">
          <div>
            <img
              src={
                imageUrl
                  ? imageUrl
                  : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
              }
              alt="User"
              className="w-12 h-12 rounded-full object-cover"
            />

            <form action="" onSubmit={uploadProfile}>
              <input
                type="file"
                onChange={handleChange}
                className="file-input"
              />
              <button type="submit"> upload</button>
            </form>
          </div>

          <div className="flex-1">
            <textarea
              value={new_post.content}
              onChange={(e) => {
                setNewPost({ ...new_post, content: e.target.value });
              }}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows="2"
              placeholder="What's on your mind?"
            />
            {error && (
              <p className="text-red-600 font-semibold text-xl">
                {error.message}
              </p>
            )}
            <div className="flex justify-between items-center mt-3">
              <div className="flex space-x-3">
                <button className="p-2 text-gray-500 hover:text-primary-600 rounded-full hover:bg-primary-50">
                  <i className="fas fa-image"></i>
                </button>
                <button className="p-2 text-gray-500 hover:text-primary-600 rounded-full hover:bg-primary-50">
                  <i className="fas fa-video"></i>
                </button>
                <button className="p-2 text-gray-500 hover:text-primary-600 rounded-full hover:bg-primary-50">
                  <i className="fas fa-link"></i>
                </button>
              </div>
              <button
                onClick={createPost}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium "
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCreate;
