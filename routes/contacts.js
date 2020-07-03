const express = require('express');
const router = express.Router();

//@route    GET api/contacts
//@desc     Get all user's contacts
//@access   Private
router.get('/', (req, res) => {
  res.send('get all contects');
});

//@route    POST api/contacts
//@desc     Add a new user's contact
//@access   Private
router.get('/', (req, res) => {
  res.send('Add a new contact');
});

//@route    PUT api/contacts/:id
//@desc     Update a contact
//@access   Private
router.put('/:id', (req, res) => {
  res.send('Update a contact');
});

//@route    DELETE api/contacts/:id
//@desc     Delete a contact
//@access   Private
router.put('/:id', (req, res) => {
  res.send('Delete a contact');
});

module.exports = router;
