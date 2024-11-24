const { createTokenAndSaveCookies } = require("../jwt/Authtoken");
const usermodel = require("../model/userModel");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    
    if (!req.files || !req.files.photo) {
      return res.status(400).json({ message: "User photo is required" });
    }

    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];


    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg, png, and webp are allowed",
      });
    }

    const { email, name, password, phone, education, role } = req.body;

    if (!email || !name || !password || !phone || !education || !role || !photo) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

   
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    
    const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
      return res.status(500).json({ message: "Error uploading photo to Cloudinary" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = new usermodel({
      email,
      name,
      password: hashedPassword,
      phone,
      education,
      role,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });
    await newUser.save();

  const token = await createTokenAndSaveCookies(newUser._id, res);
  console.log("register:",token) ;
    return res.status(200).json({ msg: "User registered successfully", user: newUser , token:token });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
 
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const user = await usermodel.findOne({ email }).select("+password");
    console.log(user);
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (user.role !== role) {
      return res.status(400).json({ message: `Given role ${role} not found` });
    }
    let token = await createTokenAndSaveCookies(user._id, res);
    console.log("Login: ", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

exports.getMyProfile = async (req, res) => {
  const user = await req.user;
  res.status(200).json({ user });
};

exports.getAdmins = async (req, res) => {
  const admins = await usermodel.find({ role: "admin" });
  res.status(200).json({ admins });
};

exports.updateUser = async (req, res) => {
  try {
    // Get the user ID from req.params
    const userId = req.params.id;

    // Find the user in the database using the provided ID
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validation for the fields you want to update
    const { email, name, phone, education, role } = req.body;
    const updateData = {};

    // Update fields if provided
    if (email) {
      updateData.email = email;
    }

    if (name) {
      updateData.name = name;
    }

    if (phone) {
      updateData.phone = phone;
    }

    if (education) {
      updateData.education = education;
    }

    if (role) {
      updateData.role = role;
    }

    // Handle photo upload if provided
    if (req.files && req.files.photo) {
      const { photo } = req.files;
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedFormats.includes(photo.mimetype)) {
        return res.status(400).json({
          message: "Invalid photo format. Only jpg, png, and webp are allowed",
        });
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        return res.status(500).json({ message: "Error uploading photo to Cloudinary" });
      }

      // If there's an old photo, delete it from Cloudinary
      if (user.photo?.public_id) {
        await cloudinary.uploader.destroy(user.photo.public_id);
      }

      // Add the new photo data to the update
      updateData.photo = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      };
    }

    // If password is provided, hash it and update it
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updateData.password = hashedPassword;
    }

    // Update the user in the database
    const updatedUser = await usermodel.findByIdAndUpdate(userId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the update follows validation rules
    });

    // Return the updated user data
    return res.status(200).json({
      msg: "User information updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

