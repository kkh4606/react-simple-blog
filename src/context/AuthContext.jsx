import axios from "axios";
import { createContext, useState, useEffect } from "react";

let authContext = createContext();

let AuthContextProvider = ({ children }) => {
  let [users, setUsers] = useState([]);

  let [logged_in_user, setLoggedInUser] = useState(null);

  async function getUsers() {
    try {
      let res = await axios.get("http://127.0.0.1:8000/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (err) {
      return;
    }
  }

  async function get_login_user() {
    try {
      let res = await axios.get("http://127.0.0.1:8000/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        setLoggedInUser(res.data);
      }
    } catch (err) {
      return;
    }
  }

  return (
    <authContext.Provider
      value={{
        getUsers,
        users,
        logged_in_user,
        get_login_user,
        setUsers,
        setLoggedInUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthContextProvider };
