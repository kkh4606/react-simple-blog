import { Outlet } from "react-router-dom";

import Feeds from "../componments/Feeds";

function Home() {
  return (
    <>
      <Feeds />
      <Outlet />
    </>
  );
}

export default Home;
