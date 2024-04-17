import mongoose from "mongoose";

const users_schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },

  faceImage: {
    type: String,
    required: false,
  },
  documents: {
    type: Array,
    required: false,
  },
  account_balance: {
    type: Number,
    required: false,
  },
  account_rating: {
    type: Number,
    required: false,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    required: true,
    default: "active",
  },
  role: {
    type: String,
    required: false,
    default: "katiwala",
  },

  uploadedSkills: {
    type: Array,
    required: false,
  },
  //add jwtToken
  jwtToken: {
    type: String,
    required: false,
  },
});

const user_model = mongoose.model("users", users_schema);

export default user_model;
