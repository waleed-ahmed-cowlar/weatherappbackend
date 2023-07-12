const { Schema, model } = require('mongoose')
const bcrpyt = require('bcrypt')
const uuid = require('uuid')
// const { token } = require('morgan')
var userSchema = new Schema({
    userid: { type: String, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, default: '' },
    token: { type: String, default: '' },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    updatedOn: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now },
})

userSchema.pre('save', async function (next) {
    this.userid = uuid.v1()
    this.updatedOn = Date.now()
    this.createdOn = Date.now()

    //hashing password
    const salt = await bcrpyt.genSaltSync(10)
    const hash = bcrpyt.hashSync(this.password, salt)
    this.password = hash
    next()
})
userSchema.pre('update,findOneAndUpdate,updateOne', async function (next) {
    this.updatedOn = Date.now()
    const update = this.getUpdate()
    delete update.userid
    delete update._id

    next()
})
const UserModel = model('User', userSchema)
module.exports = UserModel
