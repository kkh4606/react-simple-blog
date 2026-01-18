import React from 'react'

function Testing() {

const handleChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setFile(e.target.files[0]);
  };

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
        setImageUrl(res.data.profile_pic);

        console.log(logged_in_user.id);
        setLoggedInUser({
          ...logged_in_user,
          profile_pic: res.data.profile_pic,
        });

        setUsers((prev) =>
          prev.map((user) =>
            user.id === logged_in_user.id
              ? { ...users, profile_pic: imageUrl }
              : user
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
        )
      }

    }
  };

  return (
    <div>Testing</div>
  )
}

export default Testing