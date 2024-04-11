const { User, Company } = require('./model');

// User authentication service
exports.authenticateUser = async (username, password) => {
  try {
    const user = await User.findOne({ username, password });
    return user;
  } catch (err) {
    throw err;
  }
};

// Company image service
exports.getCompanyImages = async () => {
  try {
    const companies = await Company.find({}, { name: 1, image: 1 });
    return companies;
  } catch (err) {
    throw err;
  }
};