const express = require("express");

const booksRoutes = express.Router();

const {
  getAllBooks,
  getAuthorByID,
  addBook,
  deleteAuthor,
  updateAuthor,
} = require("../controllers/books");

// MIDDLEWARES FOR BOOK ROUTES
booksRoutes.use((req, res, next)=>{
  console.log('FIRST Middleware')
  req.unknown = 'yes'
  next()
})
booksRoutes.use((req, res, next)=>{
  console.log('Second Middleware', req.unknown)
  next()
})


// ROUTES
// get all users in the data base
booksRoutes.get("/", getAllBooks);

// // get all user by id
booksRoutes.get('/:id', getAuthorByID)

// add a user
booksRoutes.post('/', addBook)

// delete a user
booksRoutes.delete('/:id', deleteAuthor)

// // update a user
booksRoutes.put('/:id', updateAuthor)

module.exports = booksRoutes;
