import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useContext, useState } from "react";
import axios from "axios";
import { postContext } from "../context/PostContext";
import Login from "../pages/users/Login";

function Layout() {
  let { posts, setPosts } = useContext(postContext);
  let [searchData, setSearchData] = useState("");

  let [isSearching, setIsSearching] = useState(false);

  let searchItems = async () => {
    try {
      let res = await axios.get(
        `http://127.0.0.1:8000/posts?search=${searchData}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setPosts(res.data);
      setIsSearching(true);
    } catch (err) {
      return;
    }
  };
  let clearSearch = async () => {
    let res = await axios.get("http://127.0.0.1:8000/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setSearchData("");
    setIsSearching(false);
    setPosts(res.data);
  };

  if (!localStorage.getItem("token")) return <Login />;
  return (
    <>
      <div className="bg-gray-50  min-h-screen max-w-7xl  mx-auto  px-4 sm:px-6 lg:px-8">
        <header className="py-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary-700">
              Social<span className="text-secondary-600">Feed</span>
            </h1>
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                  <input
                    value={searchData}
                    onChange={(event) => setSearchData(event.target.value)}
                    // type="search"
                    className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                  />

                  {!isSearching ? (
                    <button
                      onClick={searchItems}
                      className="btn absolute right-10 translate-x-10 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                      type="button"
                      id="button-addon2"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="search"
                        className="w-4"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                        ></path>
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={clearSearch}
                      className="absolute right-10 -top-1 translate-x-10  px-6 py-2.5 text-gray-500 bg-none font-medium text-xs  uppercase rounded shadow-md transition duration-150 ease-in-out flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-6 py-6">
          <SideBar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
