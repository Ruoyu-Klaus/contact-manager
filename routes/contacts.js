const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

//@route    GET api/contacts
//@desc     Get all user's contacts
//@access   Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    return res.json(contacts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: 'Server errors' });
  }
});

//@route    POST api/contacts
//@desc     Add a new user's contact
//@access   Private
router.post(
  '/',
  [auth, [check('name', 'Name is Required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      return res.json(contact);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: 'Server errors' });
    }
  }
);

//@route    PUT api/contacts/:id
//@desc     Update a contact
//@access   Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //Contact Object
  let updataContact = {};
  if (name) updataContact.name = name;
  if (email) updataContact.email = email;
  if (phone) updataContact.phone = phone;
  if (type) updataContact.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Authorization Denied' });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: updataContact },
      { new: true }
    );
    return res.json(contact);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: 'Server errors' });
  }
});

//@route    DELETE api/contacts/:id
//@desc     Delete a contact
//@access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Authorization Denied' });
    }
    await Contact.findByIdAndDelete(req.params.id);
    return res.json({ msg: 'Contact has been deleted' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: 'Server errors' });
  }
});

module.exports = router;
