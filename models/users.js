const mongoose = require('mongoose')

const SCHEMA = mongoose.Schema

let usersSchema = new SCHEMA({
    name:{
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        unique: [true, 'opps, duplicate records']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
})

const usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel