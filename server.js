const express = require('express');
const app = express();

const PORT = process.env.port || 4000;

app.get('/', (req, res, next) => {
  res.json({ msg: 'Hello, this is the contact manager API.' });
});
// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
