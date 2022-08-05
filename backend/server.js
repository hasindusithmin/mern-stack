require('dotenv').config()

const express = require('express')
const workOutRoute = require('./routes/workouts')
const mongoose = require('mongoose')
// express app
const app = express()

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
// middleware
app.use("/api/workouts", workOutRoute)

// routes(root)
app.get('/', (req, res) => {
    res.json({ mssg: 'Welcome to the app' })
})

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to database')
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    }) 