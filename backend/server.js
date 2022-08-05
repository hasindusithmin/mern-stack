require('dotenv').config()

const express = require('express')
const workOutRoute = require('./routes/workouts')
// express app
const app = express()

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
// middleware
app.use("/api/workout",workOutRoute)

// routes(root)
app.get('/', (req, res) => {
  res.json({mssg: 'Welcome to the app'})
})

// listen for requests
app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT)
}) 