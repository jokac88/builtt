const express = require('express');
const {getCredentials} = require('../data/user');
const router = express.Router();

router.post('/login', async ({body: {email: emailRes, password: passwordRes}}, res) => {
  let user = {};

  try {
    user = await getCredentials();
  } catch (error) {
    return res.status(401).json({message: 'Login failed.'});
  }

  const {email, password} = user;

  if (email !== emailRes || password !== passwordRes) {
    return res.status(422).json({
      message: 'Invalid credentials.',
      errors: {credentials: 'Invalid email or password entered.'},
    });
  }

  res.json({message: 'Login successful'})
});

module.exports = router;
