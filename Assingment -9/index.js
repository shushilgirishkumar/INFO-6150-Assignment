const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const multer = require('multer');
const validator = require('validator');
// const User = require('./models/user'); // The path should be relative to the current file where you're using it

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
 
  
  app.put('/user/edit/:email', async (req, res) => {
    try {
      const { fullName, password } = req.body;
      const { email } = req.params;
      console.log('Attempting to update:',email);
      
      if (!fullName || !password || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      if (!validator.isAlpha(fullName.replace(/ /g, '')) || fullName.length < 3) {
        return res.status(400).json({ message: 'Full name must contain at least three alphabetic characters and do not allow special characters or numbers' });
      }
      if (!validator.isLength(password, { min: 8 }) || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long and include letters and numbers' });
      }
      if (!validator.matches(fullName, /^[a-zA-Z ]+$/)) {
        return res.status(400).json({ message: 'Full name must only contain alphabetic characters and spaces' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Use the MongoDB client to find and update the user
      const result = await usersCollection.findOneAndUpdate(
        { email: email },
        { $set: { fullName: fullName, password: hashedPassword } },
        { returnDocument: 'after' }
      );
      console.log('Update result:', result);
      if (!result.value) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Since you're using the MongoDB native client, you have to manually omit the password from the response
      const updatedUser = result.value;
      delete updatedUser.password;
  
      return res.json({ message: 'User details updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user details:', error);
      return res.status(500).json({ message: 'Failed to update user details', error: error.message });
    }
  });
  
  
  app.delete('/user/delete/:email', async (req, res) => {
    const { email } = req.params;
  
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: 'A valid email is required' });
    }
  
    try {
      const result = await usersCollection.deleteOne({ email });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
  });
  
  app.get('/user/getAll', async (req, res) => {
    try {
      const users = await usersCollection.find({}).toArray();
  
      // Optionally, you can remove password field from the user objects before sending the response
      const sanitizedUsers = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
  
      res.json(sanitizedUsers);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
    }
  });
// upload images 

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // make sure this uploads directory exists
    },
    filename: function (req, file, cb) {
      // You could rename the file to include the userId or some other unique identifier
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  };
  
  const upload = multer({ storage: storage, fileFilter: fileFilter });

  app.post('/user/uploadImage', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
      }
  
      // At this point, the file is saved to the server
      // You can now save the file path in the user's document or return it in the response
      const imagePath = req.file.path;
  
      // If needed, find the user by id and set the imagePath
  
      res.status(200).json({
        message: 'Image uploaded successfully',
        imagePath: imagePath // you might want to return a URL instead
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ message: 'Failed to upload image', error: error.message });
    }
  });
  
  
      
    