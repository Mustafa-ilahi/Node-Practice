const express = require('express')
const router = express.Router()
const userDetails = require('../controller/userDetails')
const isAuth = require('../middleware/isAuth')

router.get('/getUserDetails', isAuth, userDetails)

module.exports = router