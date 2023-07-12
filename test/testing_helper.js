const app = require('../src/server')
const supertest = require('supertest')
const request = supertest(app)
exports.postRequest = async (data) => {
    return request.post(data.endPoint).send(data.body)
}
// exports.postRequestWithAuthorization = async (data) => {}
