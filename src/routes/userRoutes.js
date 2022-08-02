const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validateRegisterUser, validateLoginUser } = require('../middleware');
const {
  addUserToDb,
  findUserByUsername,
  // getUsers,
} = require('../model/userModel');
const { jwtSecret } = require('../config');

const userRoutes = express.Router();

// POST REGISTER
userRoutes.post('/register', validateRegisterUser, async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    username,
    email,
    password: hashedPassword,
  };

  const insertResult = await addUserToDb(
    newUser.username,
    newUser.email,
    newUser.password
  );
  // console.log('insertResult ===', insertResult);

  if (insertResult === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.status(201).json('user created');
});

// POST LOGIN
userRoutes.post('/login', validateLoginUser, async (req, res) => {
  const gautasUsername = req.body.username;
  const gautasSlaptazodis = req.body.password;

  const foundUser = await findUserByUsername(gautasUsername);
  console.log('foundUser ===', foundUser);
  if (!foundUser) {
    res.status(400).json('username or password not found (email)');
    return;
  }
  if (!bcrypt.compareSync(gautasSlaptazodis, foundUser.password)) {
    res.status(400).json('username or password not found (pass)');
    return;
  }
  const payload = { userId: foundUser.id };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '2h' });
  // console.log('token ===', token);
  res.json({ success: true, token, payload });
});

// GET USERS
// userRoutes.get('/users', async (req, res) => {
//   const getResult = await getUsers();
//   if (getResult === false) {
//     res.status(500).json('something went wrong');
//     return;
//   }
//   res.status(200).json(getResult);
// });

module.exports = userRoutes;
