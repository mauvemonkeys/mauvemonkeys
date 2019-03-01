import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateItemQuantity, updateItemQuantityLocal} from '../store'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      product: {},
      itemQuantity: 1
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  async componentDidMount() {
    const productId = this.props.match.params.productId
    const {data: product} = await axios.get(`/api/products/${productId}`)
    this.setState({product})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    if (this.props.isLoggedIn) {
      this.props.updateItemQuantity(
        Number(this.props.match.params.productId),
        this.state.itemQuantity,
        'product'
      )
    } else {
      this.props.updateItemQuantityLocal(
        Number(this.props.match.params.productId),
        this.state.itemQuantity,
        'product'
      )
    }
  }

  handleChange(evt) {
    console.log(evt.target.value)

    this.setState({
      itemQuantity: evt.target.value
    })
  }

  increment() {
    this.setState({
      itemQuantity: this.state.itemQuantity + 1
    })
  }

  decrement() {
    if (this.state.itemQuantity > 1) {
      this.setState({
        itemQuantity: this.state.itemQuantity - 1
      })
    }
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
        <div>{this.state.itemQuantity}</div>
        <button type="button" onClick={() => this.decrement()}>
          -
        </button>
        <button type="button" onClick={() => this.increment()}>
          +
        </button>
        <br />
        <button type="submit" onClick={this.handleSubmit}>
          Add to cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({
  isLoggedIn: !!user.id
})

export default connect(mapStateToProps, {
  updateItemQuantity,
  updateItemQuantityLocal
})(SingleProduct)
