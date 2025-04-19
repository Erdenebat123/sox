const express = require('express')
const dotenv = require('dotenv').config({ path: './config/config.env' })
const colors = require('colors')
const cors = require('cors')
const { mongoose } = require('mongoose')
const app = express()
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'.bold))
  .catch(err => console.log('Database not connected', err))

app.use(express.json())

app.use('/', require('./Routes/authRoutes'))

app.listen(
  process.env.PORT,
  console.log(`Server  ${process.env.PORT} deer aslaa`.rainbow.bold)
)
