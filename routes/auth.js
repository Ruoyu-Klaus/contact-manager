const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

//@route    GET api/auth
//@desc     Get logged in user
//@access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: 'Server errors' });
  }
});

//@route    POST api/auth
//@desc     Auth user and Get token
//@access   Private
router.post(
  '/',
  [
    check('email', 'Please input a valid email').isEmail(),
    check('password', 'Please input password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invaild Credentials for Email' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: 'Invalid Credentials for Password' });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      // sign a token for user
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: 'Server errors' });
    }
  }
);

module.exports = router;
