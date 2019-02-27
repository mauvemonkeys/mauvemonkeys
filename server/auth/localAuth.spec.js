/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('auth routes', () => {
  const Henry = {
    email: 'HenryGod@gmail.com',
    password: '666',
    firstName: 'Henry',
    lastName: 'God',
    phone: 66612357
  }
  beforeEach(async () => {
    await db.sync({force: true})
    return User.create(Henry)
  })

  describe('/auth/login', () => {
    it('POST /auth/login logs in user successfully', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({email: 'HenryGod@gmail.com', password: '666'})
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.id).to.be.equal(1)
      expect(res.body.email).to.be.equal(Henry.email)
      expect(res.body).to.deep.include({
        email: 'HenryGod@gmail.com',
        firstName: 'Henry',
        lastName: 'God',
        phone: 66612357
      })
    })

    it('POST /auth/login does not log in user', async () => {
      await request(app)
        .post('/auth/login')
        .send({email: 'HenryGod@gmail.com', password: '6666'})
        .expect(401)
    })
  })
})
