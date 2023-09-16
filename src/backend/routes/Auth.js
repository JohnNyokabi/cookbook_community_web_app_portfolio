const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const multer = require('multer');

const router = express.Router();

const secretKey = process.env.SECRET_KEY;

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Confirm if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    // Save the user to the MongoDB database
    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Compare the entered password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create and send a JSON Web Token (JWT) for authentication
    //const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const authMiddleware = async (req, res, next) => {
  try {
    // Assuming you send the JWT token in the 'Authorization' header
    const token = req.header('Authorization');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication token is missing' });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);

    // Set req.user with the decoded user data
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Apply the authentication middleware to routes that require it
router.use(authMiddleware);

// Protected route to get user data
router.get('/api/user', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user data (PUT)
const upload = multer({ dest: 'uploads/' });

router.put('/api/user', upload.single('profilePicture'), async (req, res) => {
  try {
    // Find and update the user in MongoDB
    const user = await User.findByIdAndUpdate(
      req.user.userId, // Use req.user.userId instead of req.user.id
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle profile picture upload (if provided)
    if (req.file) {
      user.profilePicture = req.file.path;
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
