const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post(
  '/',
  [
    check('name', 'Please give a name').not().isEmpty(),
    check('email', 'Pleae input a valid email').isEmail(),
    check('password', 'Please set a minimum 6 character password').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    //check and create user to DB
    try {
      let user = await User.findOne({ email });
      if (user) {
        console.log(user);
        return res.status(400).json({ msg: 'The email has already existed' });
      }
      user = new User({
        name,
        email,
        password,
      });
      let salt = await bcrypt.genSaltSync(10);
      user.password = await bcrypt.hashSync(password, salt);

      await user.save();
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
