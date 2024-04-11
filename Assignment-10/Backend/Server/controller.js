const service = require('./service');

// User authentication controllers
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await service.authenticateUser(username, password);
    if (user) {
      // Set session or generate token
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logout = (req, res) => {
  // Implement logout logic (e.g., clear session or token)
  res.status(200).json({ message: 'Logout successful' });
};

// Company image controller
exports.getCompanyImages = async (req, res) => {
  try {
    const companyImages = await service.getCompanyImages();
    res.status(200).json(companyImages);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};