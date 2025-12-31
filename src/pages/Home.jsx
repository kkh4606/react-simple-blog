import { Outlet } from "react-router-dom";

import { useEffect } from "react";

import Feeds from "../componments/Feeds";
import SiderBar from "../componments/SiderBar";

function Home() {
  return (
    <>
      <Feeds />
      <Outlet />
    </>
  );
}

export default Home;
