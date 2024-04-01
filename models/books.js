const mongoose = require('mongoose')

const SCHEMA = mongoose.Schema

let booksSchema = new SCHEMA({
    name:{
        type: String,
        required: [true, 'Name cannot be emtpy']
    },
    year: {
        type: String,
        unique: [true, 'opps, email already taken']
    },
    author_id:{
        required: [true, 'Name cannot be emtpy'],
        type: SCHEMA.Types.ObjectId,
        ref: 'authors'
    }
})

const booksModel = mongoose.model('books', booksSchema)

module.exports = booksModel