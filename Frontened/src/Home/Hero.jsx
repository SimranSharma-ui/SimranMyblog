import React from "react";
import { useAuth } from "../contaxt/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs } = useAuth();

  console.log(blogs);

  return (
    <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {blogs && blogs.length > 0 ? (
        blogs.slice(1, 5).map((element) => {
          return (
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="group relative">
                {/* Blog Image */}
                <img
                  src={element.blogImage.url}
                  alt={element.title}
                  className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                {/* Title */}
                <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300">
                  {element.title} {/* Corrected access to title */}
                </h1>
              </div>
              <div className="p-6 flex items-center">
                {/* Admin Photo */}
                <img
                  src={element.adminPhoto || "default_admin_photo_url"}
                  alt={element.adminName}
                  className="w-12 h-12 rounded-full border-2 border-yellow-400"
                />
                <div className="ml-4">
                  {/* Admin Name */}
                  <p className="text-lg font-semibold text-gray-800">
                    {element.adminName || "Admin"}{" "}
                    {/* Check if adminName exists */}
                  </p>
                  {/* Optional New Badge */}
                  <p className="text-xs text-gray-400">New</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="flex h-screen items-center justify-center">
          <span className="text-xl text-gray-500">Loading....</span>
        </div>
      )}
    </div>
  );
}

export default Hero;
