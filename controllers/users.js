const { request, response } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const getAllUsers = async (req = request, res = response) => {
  try {
    const users = await User.find({ state: true }).populate('notes', {
      content: 1,
      date: 1
    })
    res.status(200).json({ users })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

const getUserById = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    res.status(200).json({
      user
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

const createUser = async (req = request, res = response) => {
  try {
    const { username, name, email, password, state = true } = req.body

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({ username, name, email, passwordHash, state })
    const userSaved = await user.save()
    res.status(201).json({
      userSaved
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

const updateUser = () => {}
const deleteUser = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    )
    res.status(200).json({
      message: 'User deleted successfully',
      user
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
