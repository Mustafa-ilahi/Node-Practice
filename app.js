const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/userDetails')
require('dotenv').config()


const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/auth', authRoutes)
app.use('/api', userRoutes)

mongoose.connect(MONGO_URL).then(() => {
    console.log("db connect");
}).catch((error) => {
    console.log("Error", error);
})

app.get('/', (req, res) => {
    return res.json({ success: true, message: "Server started" })
})

app.listen(PORT, () => {
    console.log("Server started", PORT);
})