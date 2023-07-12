require('dotenv').config()
const userService = require('../services/user_services')

const userControllers = {
    createAccount: async function (req, res) {
        const userData = req.body
        try {
            const newUser = await userService.createUser(userData)
            res.send({ success: true, data: newUser })
        } catch (error) {
            res.status(400).send({
                success: false,
                error: error.message,
            })
        }
    },
    login: async function (req, res) {
        const { email, password } = req.body
        try {
            const { user, token } = await userService.loginUser(email, password)
            res.send({ success: true, user, token })
        } catch (error) {
            res.status(400).send({
                success: false,
                error: error.message,
            })
        }
    },
}

module.exports = userControllers
