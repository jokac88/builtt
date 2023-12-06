const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const loginRoutes = require('./routes/login');
const productsRoutes = require('./routes/products');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use(loginRoutes);
app.use(productsRoutes);

app.use(({status: errorStatus, message: errorMessage}, req, {status: resStatus}, next) => {
  const status = errorStatus || 500;
  const message = errorMessage || 'Nešto nije u redu.';

  resStatus.status(status).json({message});
});

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
