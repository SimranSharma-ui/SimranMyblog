import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MyBlogs() {
  const navigateTo = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/blog/api/my-blog",
          { withCredentials: true }
        );
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/blog/api/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Blog deleted successfully");
        navigateTo("/");
        setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.message || "Failed to delete blog");
      });
  };

  return (
    <div className="container mx-auto my-12 p-4 ">
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ml-56">
        {myBlogs && myBlogs.length > 0 ? (
          myBlogs.map((element) => (
            <Link
              to={`/blog/${element._id}`}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105"
              key={element._id}
            >
              {element?.blogImage && (
                <img
                  src={element?.blogImage.url}
                  alt="blogImg"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-6 space-y-4">
                <span className="text-sm text-gray-500 font-medium">
                  {element.category}
                </span>
                <h4 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition duration-300">
                  {element.title}
                </h4>

                <div className="flex justify-between items-center">
                  <Link
                    to={`/blog/update/${element._id}`}
                    className="text-white bg-blue-600 hover:bg-blue-800 rounded-md py-2 px-4 text-sm font-semibold transition duration-300"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(element._id)}
                    className="text-white bg-red-600 hover:bg-red-800 rounded-md py-2 px-4 text-sm font-semibold transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            You have not posted any blogs yet!
          </p>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
