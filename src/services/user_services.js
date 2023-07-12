const UserModel = require('../models/user_model')
// const UserModel = require('../models/user_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = {
    createUser: async function (userData) {
        const userFound = await UserModel.findOne({ email: userData.email })
        if (userFound) {
            throw new Error('User already exists')
        }
        const newUser = new UserModel(userData)

        // newUser.token = token

        await newUser.save()
        return newUser
    },
    loginUser: async function (email, password) {
        const foundUser = await UserModel.findOne({ email })
        if (!foundUser) {
            throw new Error('User not found')
        }
        const correctPassword = await bcrypt.compare(
            password,
            foundUser.password
        )
        if (!correctPassword) {
            throw new Error('Incorrect password')
        }
        const token = jwt.sign(
            { userid: foundUser.userid },
            process.env.Secret_key
        )
        return { user: foundUser, token }
    },
}
