const router = require('express').Router()
// const verify = require("../middlewares/jwt");
const userControllers = require('../controllers/user_controller')

router.post('/createAccount', userControllers.createAccount)
router.post('/login', userControllers.login)

module.exports = router
