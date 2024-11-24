const blogmodel = require("../model/blogModel");
const cloudinary = require("cloudinary").v2;
const mongoose = require('mongoose')

exports.createBlog = async (req, res) => {
  try {
   
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog image is required" });
    }

    const { blogImage } = req.files;

    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg, png, and webp are allowed",
      });
    }

    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res.status(400).json({ message: "Title, category & about are required fields" });
    }

    const { name: adminName, photo: { url: adminPhoto } = {}, _id: createdBy } = req.user || {};

  
    const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Cloudinary upload error:", cloudinaryResponse.error);
      return res.status(500).json({ message: "Error uploading image to Cloudinary" });
    }

    // Prepare blog data
    const blogData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };

    // Create blog entry in the database
    const blog = await blogmodel.create(blogData);

    // Return success response
    return res.status(201).json({
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await blogmodel.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "blog not found" });
  }
  await blog.deleteOne();
  res.status(404).json({ message: "blog deleted successfully" });
};

exports.getAllBlogs = async (req, res) => {
  const allBlogs = await blogmodel.find();
  res.status(200).json({ allBlogs });
};

exports.getSingleBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog Id" });
  }
  const blog = await blogmodel.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(blog);
};

exports.getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const myBlogs = await blogmodel.find({ createdBy });
  res.status(200).json(myBlogs);
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid Blog Id" });
  }
  const updateBlog = await blogmodel.findByIdAndUpdate(id, req.body, { new: true });
  if (!updateBlog) {
    res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(updateBlog);
};
