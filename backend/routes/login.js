const express = require('express');
const {getCredentials} = require('../data/user');
const router = express.Router();

router.post('/login', async ({body: {username: usernameTest, password: passwordTest}}, res) => {
  const username = usernameTest;
  const password = passwordTest;
  let user = {};

  try {
    user = await getCredentials();
  } catch (error) {
    return res.status(401).json({message: 'Login failed.'});
  }

  if (user.username !== username || user.password !== password) {
    return res.status(422).json({
      message: 'Invalid credentials.',
      errors: {credentials: 'Invalid username or password entered.'},
    });
  }

  res.json({message: 'Login successful'})
});

module.exports = router;
