const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
  res.render('users/register');
});
//post route for registration form sent to
router.post('/register', async (req, res) => {
  res.send(req.body)
})

module.exports = router;