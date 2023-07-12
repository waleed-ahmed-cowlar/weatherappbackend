const jsonwebtoken = require('jsonwebtoken')

//make a verfiy middle ware that will be used to verfiy the token
async function verify(req, res, next) {
    //now getting token from header of req
    const token = req.headers['auth-token']
    const userid = req.headers['userid']

    const result = jsonwebtoken.verify(token, process.env.secret_key)
    try {
        if (result.userid == userid) {
            next()
        } else {
            res.send({ success: false, message: 'access-denied' })
        }
    } catch (ex) {
        res.json({ success: false, message: ex })
    }
}
module.exports = verify
