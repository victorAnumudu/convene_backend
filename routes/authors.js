const express = require("express");

const authorsRoutes = express.Router();

const {
  getAllAuthors,
  getAuthorByID,
  addAuthor,
  deleteAuthor,
  updateAuthor,
} = require("../controllers/authors");

// get all users in the data base
authorsRoutes.get("/", getAllAuthors);

// // get all user by id
authorsRoutes.get('/:id', getAuthorByID)

// add a user
authorsRoutes.post('/', addAuthor)

// delete a user
authorsRoutes.delete('/:id', deleteAuthor)

// // update a user
authorsRoutes.put('/:id', updateAuthor)

module.exports = authorsRoutes;
