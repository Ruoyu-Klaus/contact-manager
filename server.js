const express = require('express');
const connectDB = require('./config/db');

connectDB();
const app = express();

//User middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res, next) => {
  res.json({ msg: 'Hello, this is the contact manager API.' });
});
// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.port || 4000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
