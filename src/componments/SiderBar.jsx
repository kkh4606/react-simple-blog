import React from "react";

function SiderBar() {
  return (
    <>
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow p-4 sticky top-6 space-y-4">
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-primary-50 text-primary-700 font-medium">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
            <i className="fas fa-compass"></i>
            <span>Explore</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
            <i className="fas fa-bookmark"></i>
            <span>Bookmarks</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
            <i className="fas fa-users"></i>
            <span>Communities</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default SiderBar;
