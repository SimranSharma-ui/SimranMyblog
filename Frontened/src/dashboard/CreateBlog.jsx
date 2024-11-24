import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/blog/api/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = data.blogImage;
      d;

      toast.success(data.message || "Blog created successfully");

      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      toast.error(error.message || "Please fill the required fields");
    }
  };

  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h3 className="text-3xl font-semibold mb-8 text-center text-indigo-600">
          Create a New Blog
        </h3>
        <form onSubmit={handleCreateBlog} className="space-y-6">
          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Cartoon</option>
              <option value="Coding">Anime</option>
              <option value="Entertainment">Bussiness</option>
              <option value="Business">e-commerce</option>
            </select>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Blog Image Upload */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Blog Image
            </label>
            <div className="flex items-center justify-center mb-4">
              <img
                src={blogImagePreview ? blogImagePreview : "/imgPL.webp"}
                alt="Image Preview"
                className="w-full max-w-sm h-auto rounded-md object-cover"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* About Textarea */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              About
            </label>
            <textarea
              rows="5"
              placeholder="Write something about your blog"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
