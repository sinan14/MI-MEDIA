const express = require('express');
const multer = require('multer');
const careerController = require('./../controllers/careerController');

const router = express.Router();
//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/docs');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    // req.body.resume = `files/admin-${file.fieldname}-${Date.now()}.${ext}`;
    req.body.resume = `admin-${file.fieldname}-${Date.now()}.${ext}`;
    cb(null, req.body.resume);
  }
});

// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[1] === 'pdf') {
    cb(null, true);
  } else {
    cb(new Error('Not a PDF File!!'), false);
  }
};

//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
router.get('/', careerController.getApplications);
router.post(
  '/',
  upload.single('resume'),
  careerController.sendMail,
  careerController.saveApplication
);
router.get('/:id', careerController.getOneApplication);
router.delete('/:id', careerController.deleteOneApplication);

module.exports = router;
