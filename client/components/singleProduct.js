import React, {Component} from 'react'
import axios from 'axios'

export default class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      product: {}
    }
  }

  async componentDidMount() {
    const productId = this.props.match.params.productId
    const {data: product} = await axios.get(`/api/products/${productId}`)
    this.setState({product})
  }

  render() {
    const {name, imageUrl, price, description} = this.state.product
    return (
      <div className="single-product-div">
        <div className="row-gap">
          <h1>{name}</h1>
        </div>
        <div className="row-gap">
          <img src={imageUrl} />
        </div>
        <div className="row-gap">${price}</div>
        <div className="row-gap">{description}</div>
      </div>
    )
  }
}
