/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const product = {
      name: 'Netscape',
      description: 'A really old, clunky, monopolized browser',
      price: '50.00'
    }

    beforeEach(() => {
      return Product.create(product)
    })

    it('GET /api/products/:id with valid id returns successfully', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.id).to.be.equal(1)
      expect(res.body.name).to.be.equal(product.name)
      expect(res.body).to.deep.include(product)
    })

    it("GET /api/products/:id with product id that doesn't exist return 404", async () => {
      await request(app)
        .get('/api/products/2')
        .expect(404)
    })

    it('GET /api/products returns successfully', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.have.length(1)
      expect(res.body[0].id).to.be.equal(1)
      expect(res.body[0].name).to.be.equal(product.name)
      expect(res.body[0]).to.deep.include(product)
    })

    it('GET /api/products/1/edit returns not found', async () => {
      await request(app)
        .get('/api/products/1/edit')
        .expect(404)
    })
  })
})
