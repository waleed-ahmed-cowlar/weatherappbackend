const UserModel = require('../models/user_model')
const bcrpyt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const userControllers = {
    createAccount: async function (req, res) {
        const userData = req.body
        const userFound = await UserModel.findOne({ email: userData.email })
        if (userFound) {
            res.send({ success: false, error: 'user already exists' })
            return
        }
        const newUser = new UserModel(userData)
        const token = await jsonwebtoken.sign(
            { userid: userData.userid },
            'myseckey343434343'
        )
        newUser.token = token

        await newUser.save()
        res.send({ success: true, data: newUser })
    },
    login: async function (req, res) {
        const email = req.body.email
        const password = req.body.password
        const founduser = await UserModel.findOne({ email: email })
        if (!founduser) {
            res.send({ success: false, error: 'user not found' })
            return
        }
        const correctpassword = await bcrpyt.compare(
            password,
            founduser.password
        )
        if (!correctpassword) {
            res.send({ success: false, error: 'incorrect password' })
            return
        }
        res.send({
            success: true,
            error: 'user found and login successful',
            user: founduser,
        })
    },
}

module.exports = userControllers
