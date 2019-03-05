import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateItemQuantity, updateItemQuantityLocal} from '../store'
import {gotProductFromServer} from '../store/product'

class SingleProduct extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      product: {},
      error: '',
      itemQuantity: 1
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  async componentDidMount() {
    this._isMounted = true
    try {
      const productId = this.props.match.params.productId
      const {data: product} = await axios.get(`/api/products/${productId}`)
      if (this._isMounted) {
        this.setState({product})
      }
    } catch (err) {
      if (err.response.data === 'Product not found') {
        if (this._isMounted) {
          this.setState({error: err.response.data})
        }
      }
    }
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

    var x = document.getElementById('popUp')
    x.className = 'show'
    setTimeout(function() {
      x.className = x.className.replace('show', '')
    }, 3000)
  }

  handleChange(evt) {
    this.setState({
      itemQuantity: evt.target.value
    })
  }

  increment() {
    this.setState(preState => ({itemQuantity: preState.itemQuantity + 1}))
  }

  decrement() {
    if (this.state.itemQuantity > 1) {
      this.setState(preState => ({itemQuantity: preState.itemQuantity - 1}))
    }
  }

  render() {
    const {id, name, imageUrl, price, description} = this.state.product
    const error = this.state.error
    return (
      <div>
        {error ? (
          <div className="isa_error">
            <i className="fa fa-times-circle" />
            <span style={{marginLeft: '7px'}}>{error}</span>
          </div>
        ) : (
          <div className="single-product-div">
            <div className="row-gap">
              <h1>{name}</h1>
            </div>
            <div className="row-gap">
              <img src={imageUrl} />
            </div>
            <div className="row-gap">${price}</div>
            <div className="row-gap">{description}</div>

            <div id="productQty">
              <button type="button" onClick={() => this.decrement()}>
                -
              </button>
              <div>{this.state.itemQuantity}</div>
              <button type="button" onClick={() => this.increment()}>
                +
              </button>
            </div>
            <br />
            <button type="submit" onClick={this.handleSubmit}>
              Add to cart
            </button>

            <div id="popUp">
              {this.state.itemQuantity} {name} added to cart !
            </div>

            <br />
            {this.props.isAdmin && (
              <button
                type="button"
                onClick={() => this.props.gotProductFromServer(id)}
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>
    )
  }

  componentWillUnmount() {
    this._isMounted = false
  }
}

const mapStateToProps = ({user}) => ({
  isLoggedIn: !!user.id,
  isAdmin: user.isAdmin
})

export default connect(mapStateToProps, {
  updateItemQuantity,
  updateItemQuantityLocal,
  gotProductFromServer
})(SingleProduct)
