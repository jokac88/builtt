const express = require('express');
const bodyParser = require('body-parser');

const loginRoutes = require('./routes/login');
const productsRoutes = require('./routes/products');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use(loginRoutes);
app.use(productsRoutes);

app.use(({status: errorStatus, message: errorMessage}, req, {status: resStatus}) => {
  const status = errorStatus || 500;
  const message = errorMessage || 'Something went wrong.';

  resStatus(status).json({message});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
