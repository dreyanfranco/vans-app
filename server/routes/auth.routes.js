const router = require("express").Router()
const User = require("../models/User.model")

// const bcrypt = require('bcryptjs')
// const saltRounds = 10
// const jwt = require('jsonwebtoken')
// const { isAuthenticated } = require('./../middleware/jwt.middleware')



router.get('', async (req, res) => {
  try {
    const usersList = await User.find();
    return res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (password.length < 2) {
    return res.status(400).json({ message: "Password must have at least 3 characters" })
  }
  try {
    await User
      .findOne({ username })
      .then((foundUser) => {

        if (foundUser) {
          res.status(400).json({ message: "User already exists." })
          return
        }
        return User.create({ password, username })
      })
      .then((createdUser) => {
        const { username, _id } = createdUser
        const user = { username, _id }

        res.status(201).json({ user })
      })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

router.post('/login', async (req, res) => {

  const { username, password } = req.body;

  if (username === '' || password === '') {
    res.status(400).json({ message: "Username or password not present." });
    return;
  }

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(401).json({
        messaje: "Login not succesfull",
        error: "User not found"
      })
    } else {
      res.status(200).json({
        messaje: "Login succesful",
        user
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error ocurred",
      error: error.mesagge
    })
  }

});

router.delete('/:user_id', async (req, res) => {
  try {
    const userId = await User.findByIdAndDelete(req.params.user_id)
    return res.status(200).json(userId)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router