import React, {Component} from 'react'
import axios from 'axios'
import Product from './product'

export default class ProductList extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }

    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    const {data: products} = await axios.get('/api/products')
    this.setState({products})
  }

  handleClick(productId) {
    this.props.history.push(`/products/${productId}`)
  }

  render() {
    return (
      <div id="product-container">
        {this.state.products.map(pt => (
          <Product key={pt.id} product={pt} handleClick={this.handleClick} />
        ))}
      </div>
    )
  }
}
