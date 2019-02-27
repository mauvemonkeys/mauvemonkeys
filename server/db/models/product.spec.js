/* global describe beforeEach it */

const chai = require('chai')
const {expect} = chai
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const db = require('../index')
const Product = db.model('product')
const Sequelize = require('sequelize')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  it('fails when name is not entered or entered blank', async () => {
    await expect(
      Product.create({name: '', price: 10})
    ).to.eventually.be.rejectedWith(Sequelize.ValidationError)

    await expect(Product.create({price: 10})).to.eventually.be.rejectedWith(
      Sequelize.ValidationError
    )
  })

  it('succeeds when a non-blank name is entered', async () => {
    const product = await Product.create({name: 'Netscape', price: 10})

    expect(product).to.have.property('id', 1)
  })

  it('succeeds when description is input', async () => {
    const product = await Product.create({
      name: 'Netscape',
      description: 'A badass browser',
      price: 10
    })

    expect(product).to.have.property('id', 1)
  })

  it('succeeds when description is not input', async () => {
    const product = await Product.create({name: 'Netscape', price: 10})

    expect(product).to.have.property('id', 1)
  })

  it('imageUrl defaults to /images/productDefault.png when imageUrl property is missing', async () => {
    const product = await Product.create({name: 'Netscape', price: 10})

    expect(product).to.have.property('imageUrl', '/images/productDefault.png')
  })

  it('fails when price is less than 5', async () => {
    await expect(
      Product.create({name: 'Netscape', price: 1.5})
    ).to.eventually.be.rejectedWith(Sequelize.ValidationError)
  })

  it('succeeds when price is greater than or equal to 5', async () => {
    const product = await Product.create({name: 'Netscape', price: 5})
    const product2 = await Product.create({name: 'Netscape', price: 5.01})

    expect(product).to.have.property('price', '5.00')
    expect(typeof product2).to.equal('object')
    expect(product2).to.have.property('price', '5.01')
  })
})
