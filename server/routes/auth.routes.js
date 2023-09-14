const router = require("express").Router()
const User = require("../models/User.model")

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
const { isAuthenticated } = require('./../middleware/jwt.middleware')

router.get('', async (req, res) => {
  try {
    const usersList = await User.find()
    return res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." })
    }

    if (password.length < 4) {
      return res.status(400).json({ message: "Password must be at least 4 characters" })
    }

    const userData = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    })
    res.status(201).json(userData)
  } catch (error) {
    res.status(500).json({ mesagge: "Internal Server Error" })
  }
})

router.post('/login', (req, res) => {

  const { username, password } = req.body

  if (username === '' || password === '') {
    return res.status(400).json({ message: "Username or password not present." })
  }

  User
    .findOne({ username })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).json({ message: "Login not succesful", error: "User not found" })
      }

      if (bcrypt.compareSync(password, foundUser.password)) {

        const { _id, username, email } = foundUser;

        const payload = { _id, username, email }

        const authToken = jwt.sign(
          payload,
          'helloworld', //secret?
          { algorithm: 'HS256', expiresIn: "6h" }
        )
        res.status(200).json({ authToken });
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "Internal Server Error" })
    })
});

router.delete('/:user_id', async (req, res) => {
  try {
    const userId = await User.findByIdAndDelete(req.params.user_id)
    return res.status(200).json(userId)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/verify', isAuthenticated, (req, res) => {
  res.status(200).json(req.payload)
})

module.exports = router