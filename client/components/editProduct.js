import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateProductToServer} from '../store/product'

class editProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {name: '', description: '', imageUrl: '', price: '0.00'},
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const {name, description, imageUrl, price} = this.props.product
    this.setState({product: {name, description, imageUrl, price}})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updateProduct({...this.state.product, id: this.props.product.id})
  }

  handleChange(evt) {
    const {product} = this.state
    this.setState({product: {...product, [evt.target.name]: evt.target.value}})
  }

  render() {
    const {name, imageUrl, description, price} = this.state.product

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            <small>Name</small>
          </label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={this.handleChange}
          />
          <label htmlFor="imageUrl">
            <small>ImageUrl</small>
          </label>
          <input
            name="imageUrl"
            type="text"
            value={imageUrl}
            onChange={this.handleChange}
          />
          <label htmlFor="description">
            <small>Description</small>
          </label>
          <input
            name="description"
            type="text"
            value={description}
            onChange={this.handleChange}
          />
          <label htmlFor="price">
            <small>Price</small>
          </label>
          <input
            name="price"
            type="text"
            value={price}
            pattern="\d{1,5}(?:[.]\d{4})*(?:[.]\d{2})"
            title="Must match 00.00 format"
            onChange={this.handleChange}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: product => dispatch(updateProductToServer(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(editProduct)
