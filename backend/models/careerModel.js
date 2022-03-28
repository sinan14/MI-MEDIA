const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    phone: {
      type: String,
      required: [true, 'Please tell us your phone number!']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: [true, 'This email is already used'],
      lowercase: true
    },

    position: {
      type: String,
      required: [true, 'Please tell us your job positon!']
    },
    dob: {
      type: Date,
      required: [true, 'please provide your date of birth']
    },
    level: {
      type: String,
      enum: ['Experienced', 'Fresher'],
      required: [true, 'Please tell us level!']
    },
    experience: {
      type: Number,
      required: [true, 'Please tell us your name!']
    },
    currentCompanyName: {
      type: String
    },
    links: {
      type: String
    },
    highestQualification: {
      type: String,
      required: [true, 'Please tell us your qualification!']
    },
    medium: {
      type: String,
      required: [true, 'Please tell us your how did you hear about us']
    },
    resume: {
      type: String,
      required: [true, 'please attach your resume']
    },
    expectedSalary: {
      type: Number,
      required: [true, 'please provide a salary expectation']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
const Career = mongoose.model('Career', careerSchema);
careerSchema.virtual('pdf').get(function() {
  const folder = 'docs';
  return `${process.env.BASE_URL}/${folder}/${this.resume}`;
});

module.exports = Career;
