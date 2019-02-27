/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('User model', () => {
    describe('correctNewUser', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'Cody',
          lastName: 'Super',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('should create a user called Cody Super', () => {
        expect(cody.firstName).to.be.equal('Cody')
        expect(cody.lastName).to.be.equal('Super')
      })

      it('should have an email', () => {
        expect(cody.email).to.be.equal('cody@puppybook.com')
      })
    })
  })
})
