import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  updateItemQuantity,
  updateItemQuantityLocal,
  deleteItem,
  deleteItemLocal
} from '../store'

class CartLine extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    this.props.isLoggedIn
      ? this.props.deleteItem(this.props.cartLine.product.id)
      : this.props.deleteItemLocal(this.props.cartLine.product.id)
  }

  handleChange(itemQuantity) {
    this.props.isLoggedIn
      ? this.props.updateItemQuantity(
          this.props.cartLine.product.id,
          itemQuantity,
          'cart'
        )
      : this.props.updateItemQuantityLocal(
          this.props.cartLine.productId,
          itemQuantity,
          'cart'
        )
  }

  render() {
    const cartLine = this.props.cartLine
    return (
      <div>
        <li>
          <div
            className="cart-line"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px'
            }}
          >
            <div
              style={{
                width: '25%',
                fontSize: '20px',
                borderBottom: '1px solid black'
              }}
            >
              {cartLine.product && cartLine.product.name}
            </div>
            <div style={{width: '15%', borderBottom: '1px solid black'}}>
              <p style={{marginTop: 0}}>Price</p>
              <p>${cartLine.product && cartLine.product.price}</p>
            </div>
            <div style={{width: '15%', borderBottom: '1px solid black'}}>
              <p style={{marginTop: 0}}>Quantity</p>
              <p>
                <input
                  onChange={evt => this.handleChange(Number(evt.target.value))}
                  type="number"
                  min="1"
                  step="1"
                  id="itemQuantity"
                  name="itemQuantity"
                  value={cartLine.itemQuantity}
                  style={{width: '25px'}}
                />
              </p>
            </div>
            <div style={{width: '15%', borderBottom: '1px solid black'}}>
              <p style={{marginTop: 0}}>Total</p>
              <p>
                ${cartLine.product &&
                  cartLine.itemQuantity * cartLine.product.price}
              </p>
            </div>

            <div
              style={{
                width: '5%',
                borderBottom: '1px solid black',
                color: 'red',
                cursor: 'pointer'
              }}
              onClick={this.handleDelete}
            >
              X
            </div>
          </div>
        </li>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapStateToProps, {
  updateItemQuantity,
  updateItemQuantityLocal,
  deleteItem,
  deleteItemLocal
})(CartLine)
