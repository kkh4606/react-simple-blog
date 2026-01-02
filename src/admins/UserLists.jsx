import { useContext, useEffect } from "react";
import { authContext } from "../context/AuthContext";
import axios from "axios";

function UserLists() {
  let { users, getUsers, setUsers } = useContext(authContext);

  let deleteUser = async (id) => {
    try {
      let res = await axios.delete(`http://127.0.0.1:8000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 204) {
        setUsers(users.filter((user) => user.id != id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div className="mt-2flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
            <button className="text-gray-500 focus:outline-none focus:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <input
              className="mx-4 w-full border rounded-md px-4 py-2"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center pr-4">
            <button className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l-7-7 7-7m5 14l7-7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="bg-white p-8 overflow-auto mt-2 h-screen">
          <div className="relative overflow-auto">
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full bg-white border mb-20">
                <thead>
                  <tr className="bg-[#2B4DC994] text-center text-xs md:text-sm font-thin text-white">
                    <th className="p-0">
                      <span className="block py-2 px-3 border-r border-gray-300">
                        ID
                      </span>
                    </th>
                    <th className="p-0">
                      <span className="block py-2 px-3 border-r border-gray-300">
                        Name
                      </span>
                    </th>
                    <th className="p-0">
                      <span className="block py-2 px-3 border-r border-gray-300">
                        Email
                      </span>
                    </th>

                    <th className="p-0">
                      <span className="block py-2 px-3 border-r border-gray-300">
                        Created at
                      </span>
                    </th>
                    <th className="p-4 text-xs md:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user) => {
                      return (
                        <tr
                          key={user.id}
                          className="border-b text-xs md:text-sm text-center text-gray-800"
                        >
                          <td className="p-2 md:p-4">{user.id}</td>
                          <td className="p-2 md:p-4">{user.name}</td>
                          <td className="p-2 md:p-4">{user.email}</td>
                          <td className="p-2 md:p-4">{user.created_at}</td>
                          <td className="relative p-2 md:p-4 flex justify-center space-x-2">
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs md:text-sm">
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                deleteUser(user.id);
                              }}
                              className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLists;
