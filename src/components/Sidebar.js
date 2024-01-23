// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-1/5 p-4">
      <h2 className="text-2xl font-bold mb-20">Dashboard App</h2>
      <ul>
        <li className="mb-2">
          <Link
            to="/home"
            className="flex items-center p-3 border rounded hover:bg-gray-700 transition duration-300"
          >
            <span className="mr-2">
              
            </span>
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/reviews"
            className="flex items-center p-3 border rounded hover:bg-gray-700 transition duration-300"
          >
            <span className="mr-2">
            
            </span>
            Reviews
          </Link>
        </li>
     
      </ul>
    </div>
  );
};

export default Sidebar;
