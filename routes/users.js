const express = require('express')

const userRoutes = express.Router()

const {getAllUsers, getAllUserByID, addUser, loginUser, deleteUser, updateUser} = require('../controllers/users/users')

const {userDoesNotExistByEmail, userExistByEmail, validUserToken} = require('../middlewares/users/userExist') //middleware to check if user already exist


// get all users in the data base
userRoutes.get('/', getAllUsers)

// get user by id
userRoutes.get('/:id', validUserToken, getAllUserByID)

// add a user
userRoutes.post('/', userDoesNotExistByEmail, addUser)

// login a user
userRoutes.post('/login', userExistByEmail, loginUser)

// delete a user
userRoutes.delete('/:id', deleteUser)

// update a user
userRoutes.put('/:id', updateUser)

module.exports = userRoutes