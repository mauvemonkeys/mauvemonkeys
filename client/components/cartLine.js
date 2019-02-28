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
          itemQuantity
        )
      : this.props.updateItemQuantityLocal(
          this.props.cartLine.productId,
          itemQuantity
        )
  }

  render() {
    const cartLine = this.props.cartLine
    return (
      <div>
        <li>
          <div>
            <h4>{cartLine.product && cartLine.product.name}</h4>
            <span style={{paddingRight: '5px'}}>
              Price: {cartLine.product && cartLine.product.price}
            </span>
            <span style={{paddingRight: '5px'}}>
              Quantity:{' '}
              <input
                onChange={evt => this.handleChange(Number(evt.target.value))}
                type="number"
                min="1"
                step="1"
                id="itemQuantity"
                name="itemQuantity"
                value={cartLine.itemQuantity}
              />
            </span>
            <span style={{paddingRight: '5px'}}>
              Total:{' '}
              {cartLine.product &&
                cartLine.itemQuantity * cartLine.product.price}
            </span>

            <span
              style={{color: 'red', marginLeft: '20px'}}
              onClick={this.handleDelete}
            >
              X
            </span>
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
