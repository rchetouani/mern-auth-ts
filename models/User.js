const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  username: { type: String },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: { type: String },
  pole: { type: String },
  status: String,
  address: String,
  agency: String,
  startDate: Date,
  phoneNumber: String,
  gender: String,
  disponibility: false,
  birthday: Date,
  projects: [
    {
      name: String,
      description: String,
      technology: String,
      society: String,
      size: String,
      Site: String,
      startDate: Date,
      EndDate: Date,
      status: String,
      Progress: String
    }
  ],
  formationsfollowed: [
    {
      name: String,
      Type: String,
      Site: String,
      EndDate: Date,
      Rank: String,
      startDate: Date,
      Formateur: String
    }
  ],
  formations: [
    {
      name: String,
      Type: String,
      Site: String,
      EndDate: Date,
      Rank: String,
      startDate: Date,
      Formateur: String
    }
  ],
  certifications: [
    {
      code: String,
      name: String,
      EndDate: Date,
      startDate: Date,
      organisme: String
    }
  ],
  objectifs: [
    {
      name: String,
      status: String,
      EndDate: Date,
      Progress: String
    }
  ],

  skills: [
    {
      name: String,
      value: Number
    }
  ],
  calendar: [
    {
      title: String,
      allDay: String,
      start: Date,
      end: Date
    }
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
