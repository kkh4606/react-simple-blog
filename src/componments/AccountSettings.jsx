import axios from "axios";
import { authContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { Form } from "react-router-dom";

function AccountSettings() {
  let { user, setUser } = useContext(authContext);

  let [file, setFile] = useState(null);

  let [imageFile, setImageFile] = useState("");

  let handleInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  let changeProfile = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("file", file);

      let res = await axios.put("http://127.0.0.1:8000/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-gray-200 min-h-screen pt-2 font-mono">
        <div className="container mx-auto">
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
            <h2 className="text-2xl text-gray-900">Account Setting</h2>
            <form className="mt-6 border-t border-gray-400 pt-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-text-1"
                  >
                    email address
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                    type="text"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    password
                  </label>
                  <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md ">
                    change your password
                  </button>
                </div>

                <div className="personal w-full border-t border-gray-400 pt-4">
                  <div className="w-full md:w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      user name
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="text"
                      required
                    />
                  </div>
                  <div className="flex justify-center my-7">
                    <div className="rounded-lg shadow-xl bg-gray-50  w-full  mx-3">
                      <div className="m-4">
                        <label className="inline-block mb-2 text-gray-500">
                          Upload Profile Image(jpg,png,svg,jpeg)
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div className="flex flex-col items-center justify-center pt-7">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                Select a photo
                              </p>
                            </div>
                            <input
                              type="file"
                              onChange={handleInputChange}
                              className="opacity-0"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={changeProfile}
                      className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3"
                      type="submit"
                    >
                      save changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountSettings;
