const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

// FOR WEB SOCKET
const {WebSocketServer} = require('ws')
const url = require('url')
// END OF WEB SOCKET


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// ROUTES
const userRoutes = require('./routes/users')

//AUTHORS
const authorsRoutes = require('./routes/authors')

//BOOKS ROUTE
const booksRoutes = require('./routes/books')

const PORT = process.env.SERVER_PORT
const DB_URL = process.env.DB_URL

//connect to DATABASE
mongoose.connect(DB_URL).then((info)=>{
    console.log(`Connected to Database`)
}).catch((err)=>{
    console.log(err)
})

// app.use('/users', (req,res, next)=>{ // middleware to run for all the below routes
//     console.log('good')
//     next()
// })

app.get('/', (req, res)=>{
    res.status(200).json({status: 1, message:'Sucessful'})
})


// USERS ROUTES
app.use('/users', userRoutes)


// USERS ROUTES
app.use('/authors', authorsRoutes)

// USERS ROUTES
app.use('/books', booksRoutes)




app.all('*', (req, res)=>{
    console.log(req.body)
    res.status(404).json({status: -1, message:'Not Found', data:[]})
})





const server = app.listen(PORT, (err)=>{
    if(err){
        console.log(err) 
        return
    }
    console.log('SERVER CONNECTED')
})


// const wsServer = new WebSocketServer({server})

// wsServer.on('connection', (connection, request)=>{
//     // console.log(url.parse(request.url, true).query.name)

//     // do this if any connection sends a message
//     connection.on('message', (mesData)=>{
//         console.log(JSON.parse(mesData.toString()))
//     })

//     // do this if any connection closes
//     connection.on('close', ()=>{

//     })
// })
