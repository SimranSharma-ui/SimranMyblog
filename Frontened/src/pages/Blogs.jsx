import React from "react";
import { useAuth } from "../contaxt/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Explore Our Latest Blogs
        </h1>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <Link
                to={`/blog/${blog.id}`}
                key={index}
                className="relative block rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="absolute bottom-4 left-4 text-white px-3 py-2 bg-black bg-opacity-50 rounded-lg">
                  <h2 className="text-lg font-semibold">{blog?.title}</h2>
                  <p className="text-sm">{blog?.category}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No blogs available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
