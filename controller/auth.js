const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.signUp = async (req, res, next) => {
    try {

        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ status: 400, message: "All fields are required!" })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ status: 400, message: "User already exist." })
        }
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        const obj = {
            email: newUser.email,
            _id: newUser._id
        }
        const jwtSecret = process.env.JWT_SECRET
        const token = await jwt.sign(obj, jwtSecret)
        return res.status(200).json({ status: 200, message: "New user created.", newUser, token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "internal server error" })
    }
}

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(200).json({ status: 200, message: "User not found" })
        }
        const hashedPassword = existingUser.password
        const checkPassword = await bcrypt.compare(password, hashedPassword)
        if (!checkPassword) {
            return res.status(200).json({ status: 200, message: "Incorrect password" })
        }
        const obj = {
            email: existingUser.email,
            _id: existingUser._id
        }
        const jwtSecret = process.env.JWT_SECRET
        const token = await jwt.sign(obj, jwtSecret)
        return res.status(200).json({ status: 200, message: "Login", existingUser , token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "internal server error" })
    }
}

