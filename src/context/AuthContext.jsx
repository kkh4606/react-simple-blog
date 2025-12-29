import React, { Children, createContext } from "react";

let authContext = createContext();

let AuthContextProvider = ({ Children }) => {
  return <authContext.Provider>{Children}</authContext.Provider>;
};
