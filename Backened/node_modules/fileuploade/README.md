# File Uploader Package

This Node.js package provides a simple file uploader middleware for Express applications using [multer](https://www.npmjs.com/package/multer).

## Installation

Install the package via npm:

```bash
npm install file-uploader
```

## Usage

```javascript
const express = require('express');
const multer = require('multer');
const fileUploader = require('file-uploader');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Define routes
app.post('/upload', fileUploader.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## API

### fileUploader

- **fileUploader.single(fieldName[, maxFileSize])**: Middleware for handling single file uploads. `fieldName` specifies the name of the file input field in the form. `maxFileSize` (optional) specifies the maximum file size allowed for upload (in bytes).

### Configuration Options

- **destination**: Function that determines where to store the uploaded files.
- **filename**: Function that determines the name of the uploaded files.

## License

This project is licensed under the [MIT License](LICENSE).
