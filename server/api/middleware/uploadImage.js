import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },

  filename: function (req, file, cb) {
    cb(null, req.user + 'IMG' + Date.now() + path.extname(file.originalname));
  },
});

export default multer({ storage }).single('image');
