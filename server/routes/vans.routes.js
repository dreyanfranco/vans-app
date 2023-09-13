const vansRouter = require("express").Router();
const mongoose = require("mongoose");
const Van = require('../models/Van.model');
const { isAuthenticated } = require("../middleware/jwt.middleware")

// get all vans

vansRouter.get('', async (req, res) => {
  try {
    const vansList = await Van.find()
    return res.status(200).json(vansList);
  } catch (error) {
    res.status(500).json(error);
  }
})

// get all vans from host

vansRouter.get('/user/:user_id', async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.params.user_id);
    const userOwnedVans = await Van
      .find({ owner: userId })
      .populate('owner')

    return res.status(200).json(userOwnedVans)
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})

// get one van by id

vansRouter.get('/:van_id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.van_id)) {
    res.status(404).json({ message: 'Invalid ID' })
    return;
  }
  try {
    const vanId = await Van.findById(req.params.van_id)
    return res.status(200).json(vanId);
  } catch (error) {
    res.status(500).json(error);
  }
})

// edit

vansRouter.patch('/:van_id', async (req, res) => {
  try {
    const vanEditById = await Van.findByIdAndUpdate(req.params.van_id, req.body)
    return res.status(200).json(vanEditById)
  } catch (error) {
    res.status(500).json(error);
  }
})

// delete one van

vansRouter.delete('/:van_id', async (req, res) => {
  try {
    const vanIdAndDelete = await Van.findByIdAndDelete(req.params.van_id)
    return res.status(200).json(vanIdAndDelete)
  } catch (error) {
    res.status(500).json(error)
  }
})

// create a van 

vansRouter.post('', isAuthenticated, async (req, res) => {
  if (!req.payload || !req.payload._id) {
    return res.status(401).json({ error: "User ID not found in payload" });
  }
  const newVanData = {
    ...req.body,
    owner: req.payload._id
  };


  try {
    const newVan = await Van.create(newVanData)
    return res.status(200).json(newVan);
  } catch (error) {
    res.status(500).json(error);
  }
}
)

module.exports = vansRouter;