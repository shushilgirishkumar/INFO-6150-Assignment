const express = require('express');
const router = express.Router();
const controller = require('./controller');

// User authentication routes
router.post('/login', controller.login);
router.post('/logout', controller.logout);

// Company image routes
router.get('/companies/images', controller.getCompanyImages);

// Add more routes as needed

module.exports = router;