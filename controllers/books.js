const booksModel = require("../models/books");

const process = require("process");
const fs = require("fs");
const fsPromise = fs.promises;

const path = require("path");

const getAllBooks = async (req, res) => {
  try {
    const books = await booksModel.find({}).populate({path:'author_id', select:['name', 'email']});
    res.status(200).json({ status: 1, message: "Successful", data: books });
  } catch (error) {
    res.end("ok");
  }
};

const getAuthorByID = (req, res) => {
  const passedID = req.params.id;
  if (!passedID) {
    // return if no id is present in params sent
    return res.status(400).json({ status: -1, message: `User ID not passed`, data: [] });
  }
  booksModel.findById(passedID).then((result)=>{
    if(!result){ // throw error if no user found
        return res.status(400).json({ status: -1, message: `No author found!`, data: [] });
    }
    //remember to remove sensitive info like password here
    res.status(400).json({ status: 1, message: `author found successfully`, data: [result] });
  }).catch(err => {
    res.status(400).json({ status: -1, message: `Error fetching user, Try again!`, data: [] });
  })
};

const addBook = (req, res) => {
  const { year, author_id, name } = req.body;
  if (!year || !author_id || !name) { // return if no id is present in params sent
    return res.status(400).json({ status: -1, message: `Name, author and year must be present`, data: [] });
  }
  booksModel.findOne({name}).then((book)=>{ // check if the book already exist
    if(book){
        return res.status(401).json({ status: -1, message: `Book already exist`, data: [] });
    }
    booksModel.create(req.body).then((data)=>{ // If Book does not exist, then add
        // remember to remove sensitive information
        res.status(200).json({ status: 1, message: `Book added sucessfully`, data: [data] });
    }).catch(err => {
        res.status(500).json({ status: -1, message: `${err}, try again!`, data: [] });
    })
    // let newAuthor = new booksModel({name, email})
    // newAuthor.save().then(
    //     res.end('ok 4')
    // ).catch(()=>{
    //     res.end('ok 4')
    // })
  }).catch((err)=>{
    res.status(500).json({ status: -1, message: `An error occurred ${err}`, data: [] });
  })
};

const deleteAuthor = (req, res) => {
  const passedID = req.params.id;
  if (!passedID) {
    // return if no id is present in params sent
    return res.status(400).json({ status: -1, message: `User ID not passed`, data: [] });
  }
  booksModel.findByIdAndDelete(passedID).then((result)=>{
    if(!result){ // throw error if no user found
        return res.status(400).json({ status: -1, message: `No author found!`, data: [] });
    }
    //remember to remove sensitive info like password here
    res.status(400).json({ status: 1, message: `author deleted successfully`, data: [result] });
  }).catch(err => {
    res.status(400).json({ status: -1, message: `Error fetching user, Try again!`, data: [] });
  })
};

const updateAuthor = async (req, res) => {
  // update user
  let acceptedFields = ["password", "name"];
  const passedID = req.params.id;
  if (!passedID) {
    // return if no id is present in params sent
    return res.status(400).json({ status: -1, message: `User ID not passed`, data: [] });
  }
  const fields = { ...req.body };
  const newDetails = {};

  // loop through the passed paramaters and only take those allowed for update
  for (let keys in fields) {
    if (acceptedFields.includes(keys) && fields[keys]) {
      newDetails[keys] = fields[keys];
    }
  }

  if (!Object.keys(newDetails).length) {
    return res.status(406).json({ status: -1, message: `No New fields present to update`, data: []});
  }

  if (!fields.action) { // return if no action payload was passed
    return res.status(406).json({ status: -1, message: `Action payload is missing`, data: [] });
  }

  // read DB to get user to update
  try {
      const authorToUpdate = await booksModel.findById(passedID)
      if(!authorToUpdate){
        return res.status(404).json({ status: -1, message: `Author not found!`, data: [] });
      }
      if (fields.action == "password") {
        // updates user password
        if(!fields.password){ // return if not password payload was passed
            return res.status(406).json({ status: -1, message: `Password cannot be empty`, data: []});
        }
        else if (authorToUpdate.password == fields.password) {
          // return if password is same as old one
          return res.status(406).json({ status: -1, message: `You cannot use your old password`, data: []});
        }
        // remember to hash password before sending to DB
        res.end('no password for now to update')
      } else {
        booksModel.findByIdAndUpdate(passedID, newDetails).then(data => {
            if(!data){
                return res.status(404).json({ status: -1, message: `Author not found!`, data: [] });
            }
            res.status(201).json({ status: 1, message: `Author details updated`, data: [data] });
        }).catch(err => {
            res.status(500).json({ status: -1, message: `Error updating author, Try again!`, data: [] });
        })
      }
  } catch (error) {
    res.status(400).json({ status: -1, message: `Error fetching user, Try again!`, data: [] });
  }

};

module.exports = {
  getAllBooks,
  getAuthorByID,
  addBook,
  deleteAuthor,
  updateAuthor,
};
