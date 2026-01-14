import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function Layout() {
  return (
    <>
      <div className="bg-gray-50  min-h-screen max-w-7xl  mx-auto  px-4 sm:px-6 lg:px-8">
        <header className="py-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary-700">
              Social<span className="text-secondary-600">Feed</span>
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                <i className="fas fa-bell"></i>
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"></div>
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
