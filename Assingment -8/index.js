const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const multer = require('multer');
const validator = require('validator');

const app = express();
app.use(express.json()); // Body parser

const mongoURI = 'mongodb://localhost:27017';
const client = new MongoClient(mongoURI);

const dbName = 'userManagement';
const db = client.db(dbName);

const usersCollection = db.collection('users');

client.connect().then(() => console.log('Connected to MongoDB'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// User creation
app.post('/user/create', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).send({ message: 'Invalid email address' });
    }
    if (!fullName || fullName.length < 3) {
      return res.status(400).send({ message: 'Full name must be at least 3 characters long' });
    }
    if (!password || password.length < 8) {
      return res.status(400).send({ message: 'Password must be at least 8 characters long' });
    }

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ fullName, email, password: hashedPassword });

    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});
  const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const imageUpload = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .jpeg, .png, .gif format allowed!'));
      }
    }
  });
  
  app.post('/user/uploadImage', imageUpload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded or invalid file format' });
    }
    // Here, save req.file.path to your MongoDB if needed
    res.status(200).send({ message: 'Image uploaded successfully', filePath: req.file.path });
  });

  app.put('/user/edit/:email', async (req, res) => {
    try {
      const { fullName, password } = req.body;
      const email = req.headers.email;
   
      if (!fullName || !password || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      if (!validator.isAlpha(fullName.replace(/ /g, '')) || fullName.length < 3) {
        return res.status(400).json({ message: 'Full name must contain at least three alphabetic characters and do not allow special characters or numbers' });
      }
      if (!validator.isLength(password, { min: 8 }) || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long and include letters and numbers' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findOneAndUpdate(
        { email },
        { fullName, password: hashedPassword },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json({ message: 'User details updated successfully', user });
    } catch (error) {
      console.error('Error updating user details:', error);
      return res.status(500).json({ message: 'Failed to update user details', error: error.message });
    }
  });
  app.delete('/user/delete', async (req, res) => {
    try {
      const email = req.headers.email;
      if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ message: 'Valid email is required in headers' });
      }
      const user = await User.findOneAndDelete({ email });
   
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  });
  app.get('/user/getAll', async (req, res) => {
    try {
      const email = req.headers.email;
      if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ message: 'Valid email is required in headers' });
      }
      const users = await User.find({}, { fullName: 1, email: 1, password: 1, imagePaths: 1 });
      res.json(users);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ message: 'Failed to retrieve users' });
    }
  });
      
    