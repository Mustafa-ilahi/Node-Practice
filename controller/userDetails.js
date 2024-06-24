const User = require("../models/user")

module.exports = async (req, res, next) => {
    try {
        const _id = req._id
        const existingUser = await User.find({ _id }).select('-password')
        return res.status(200).json({ status: 200, message: "userDetails", existingUser })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "internal server error" })
    }
}