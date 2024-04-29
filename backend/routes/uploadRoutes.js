import express from 'express';
import multer from 'multer';

const router = express.Router();

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  }
});
const upload = multer({ storage: storage });

// Define route for file upload
router.post('/resume', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const file = req.file;
    return res.status(200).json({ message: 'File uploaded successfully', file });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
