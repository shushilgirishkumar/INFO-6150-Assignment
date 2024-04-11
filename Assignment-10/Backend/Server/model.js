const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

// Company schema
const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  // Add more fields as needed
});

const Company = mongoose.model('Company', companySchema);

module.exports = { User, Company };