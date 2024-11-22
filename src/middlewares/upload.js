import multer from 'multer';

// multer configuration
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    // allow only images and videos
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true); // accept file
    } else {
      // create a custom error for unsupported file type
      const error = new Error('Only images and videos are allowed!');
      error.status = 400;
      cb(error, false);
    }
  },
});

export default upload;
