import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { postContext } from "../context/PostContext";

function SideBar() {
  let { setUsers, logged_in_user } = useContext(authContext);

  let logOut = () => {
    localStorage.removeItem("token");
  };
  return (
    <>
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow p-4 sticky top-6 space-y-4">
          <Link
            to={"/"}
            className="w-full flex items-center space-x-3 p-3 rounded-lg bg-primary-50 text-primary-700 font-medium"
          >
            <button>
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
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </button>

            <span>Home</span>
          </Link>
          <Link className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <span>Explore</span>
          </Link>
          <Link
            to={"/profile"}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
          >
            <button>
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
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
            <p>Profile</p>
          </Link>

          {logged_in_user && logged_in_user.role === "admin" ? (
            <Link
              to="/dashboard"
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="m20,11h-6c-.55,0-1,.45-1,1v8c0,.55.45,1,1,1h6c.55,0,1-.45,1-1v-8c0-.55-.45-1-1-1Zm-1,8h-4v-6h4v6Z"></path>
                <path d="m10,15h-6c-.55,0-1,.45-1,1v4c0,.55.45,1,1,1h6c.55,0,1-.45,1-1v-4c0-.55-.45-1-1-1Zm-1,4h-4v-2h4v2Z"></path>
                <path d="m20,3h-6c-.55,0-1,.45-1,1v4c0,.55.45,1,1,1h6c.55,0,1-.45,1-1v-4c0-.55-.45-1-1-1Zm-1,4h-4v-2h4v2Z"></path>
                <path d="m10,3h-6c-.55,0-1,.45-1,1v8c0,.55.45,1,1,1h6c.55,0,1-.45,1-1V4c0-.55-.45-1-1-1Zm-1,8h-4v-6h4v6Z"></path>
              </svg>
              <span>Dashboard</span>
            </Link>
          ) : null}

          <Link className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
            <button onClick={logOut}>
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
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </button>

            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
