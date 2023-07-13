// const { interpolate } = require('eslint/lib/linter');
// const user_controller=require('../src/controllers/user_controller');
// const app = require('../../src/server')
// const supertest = require('supertest')
// const request = supertest(app)
const userModel = require('../../src/models/user_model')
const { postRequest } = require('../testing_helper')

describe('POST: /user', () => {
    beforeAll(async () => {
        await userModel.deleteMany({})
    })
    describe('success', () => {
        it('POST /user/createAccount', async () => {
            let data = {
                endPoint: '/user/createAccount',
                body: {
                    email: 'waleedahmed10200@gmail.com',
                    password: '123123123',
                },
            }
            const res = await postRequest(data)
            expect(res.status).toBe(200)
            expect(res.body.data.email).toBe(data.body.email)
        })
        it('POST /user/login  should login a user ', async () => {
            let data = {
                endPoint: '/user/login',
                body: {
                    email: 'waleedahmed10200@gmail.com',
                    password: '123123123',
                },
            }
            data.endPoint = '/user/login'
            const res = await postRequest(data)
            expect(res.status).toBe(200)
            // console.log(res.body)
            // expect(res.body.user.email).toBe(data.body.email)
        })
    })
    describe('failure', () => {
        it('Post /user/login  should return error', async () => {
            let data = {
                endPoint: '/user/login',
                body: {
                    email: 'waleedahmed10200@gmail.com',
                    password: '1231233123',
                },
            }
            const res = await postRequest(data)
            // expect(res.body.data.email).toBe(data.body.email)
            expect(res.status).toBe(400)
        })
    })
})
