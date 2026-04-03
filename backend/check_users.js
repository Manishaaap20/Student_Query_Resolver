const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    const users = await User.find({});
    console.log('Users:');
    users.forEach(u => {
      console.log(`- ${u.email}: password=${u.password.substring(0, 10)}... (length: ${u.password.length})`);
    });
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
