const fs = require('fs');
const { promisify } = require('util');
const Career = require('./../models/careerModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

const unlinkAsync = promisify(fs.unlink);

exports.saveApplication = catchAsync(async (req, res, next) => {
  const doc = await Career.create(req.body);
  const link = `${process.env.BASE_URL}/pdf`;
  const mailOptions = {
    email: process.env.COMPANY_MAIL,
    subject: process.env.COMPANY_SUB,
    html: `
      <br />
      <p><b><a href="${link}">${link}</a></b></p>`
  };

  try {
    await sendEmail(mailOptions);
  } catch (err) {
    console.log(err);
  }
  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.getApplications = factory.getAll(Career);
exports.getOneApplication = factory.getOne(Career);
exports.deleteOneApplication = catchAsync(async (req, res, next) => {
  const doc = await Career.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  if (doc.resume) {
    const path = `./public/${doc.resume}`;
    if (fs.existsSync(path)) {
      await unlinkAsync(path);
      // fs.unlink(path, function(err) {
      //   if (err) return next(new AppError('photo not found', 404));
      // });
    }
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
