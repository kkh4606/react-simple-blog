import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { postContext } from "../context/PostContext";

function UploadProfile() {
  let { logged_in_user, setLoggedInUser } = useContext(authContext);
  let { setPosts } = useContext(postContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("file", file);

      let res = await axios.put("http://127.0.0.1:8000/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        setLoggedInUser({
          ...logged_in_user,
          profile_pic: res.data.profile_pic,
        });

        setPosts((prev) =>
          prev.map((post) =>
            post.Post.owner.id === logged_in_user.id
              ? {
                  ...post,
                  Post: {
                    ...post.Post,
                    owner: {
                      ...post.Post.owner,
                      profile_pic: res.data.profile_pic,
                    },
                  },
                }
              : post
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  return <></>;
}

export default UploadProfile;
