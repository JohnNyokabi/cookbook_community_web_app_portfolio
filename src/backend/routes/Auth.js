
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/User');
const multer = require('multer');

const router = express.Router();

const secretKey = process.env.SECRET_KEY;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.userId);
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false, { message: 'Authentication failed' });
      }
    }
  )
);

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

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

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get(
  '/api/user',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

const upload = multer({ dest: 'uploads/' });

router.put(
  '/api/user',
  passport.authenticate('jwt', { session: false }),
  upload.single('profilePicture'),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user.userId,
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
  
      if (req.file) {
        user.profilePicture = req.file.path;
        console.log('User selected pic effectively: ', user.profilePicture);
        await user.save();
      }
      
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;