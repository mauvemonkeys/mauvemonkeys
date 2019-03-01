import React, {Component} from 'react'
import CartLine from './cartLine'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    return (
      <div>
        <h2>Cart</h2>
        <ul>
          {this.props.cart.map(cl => <CartLine key={cl.id} cartLine={cl} />)}
        </ul>
        <div>
          Total:{' '}
          {this.props.cart.reduce(
            (total, cartLine) =>
              total + cartLine.product.price * cartLine.itemQuantity,
            0
          )}{' '}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({cart}) => ({
  cart
})

export default connect(mapStateToProps)(Cart)
