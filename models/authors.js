const mongoose = require('mongoose')

const SCHEMA = mongoose.Schema

let authorsSchema = new SCHEMA({
    name:{
        type: String,
        required: [true, 'Name cannot be emtpy']
    },
    email: {
        type: String,
        unique: [true, 'opps, email already taken']
    }
})

const authorsModel = mongoose.model('authors', authorsSchema)

module.exports = authorsModel