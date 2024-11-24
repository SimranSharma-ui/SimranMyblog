require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const cloudinary = require("cloudinary");
const userRouter = require('./Routes/userRouter'); // Assuming you have this file
const blogRouter = require('./Routes/blogRouter'); // Assuming you have this file
const fileUpload = require('express-fileupload');
const cors = require('cors'); // Import CORS to handle cross-origin requests

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser()); 
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' })); // For handling file uploads

// Port and MongoDB URL from environment variables
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

// CORS configuration
app.use(
  cors({
    origin:process.env.Frontened_Url, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  })
);

// Connect to MongoDB
mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Routes setup
app.use('/user/api', userRouter); // Assuming you have the userRouter file
app.use('/blog/api', blogRouter); // Assuming you have the blogRouter file

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
