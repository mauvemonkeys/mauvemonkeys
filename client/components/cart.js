import React, {Component} from 'react'
import CartLine from './cartLine'
import {connect} from 'react-redux'
import axios from 'axios'
import {clearCart, clearUserError} from '../store'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './checkoutForm'

class Cart extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    await axios.put(`/api/orders/${this.props.user.id}/checkout`)
    this.props.checkoutOrders()

    this.props.history.push('/checkedout')
  }

  render() {
    const {cart, user, history, clearUserError} = this.props

    return (
      <div id="cart" style={{paddingTop: '10px', paddingBottom: '10px'}}>
        <h2 style={{marginTop: '0'}}>Cart</h2>
        <ul style={{paddingLeft: 0}}>
          {cart.map(cl => <CartLine key={cl.id} cartLine={cl} />)}
        </ul>
        <div>
          Total: ${this.props.cart.reduce(
            (total, cartLine) =>
              total + cartLine.product.price * cartLine.itemQuantity,
            0
          )}{' '}
        </div>
        {cart.length ? (
          <div>
            {user.id ? (
              <div>
                <h3>Pay</h3>
                <StripeProvider apiKey="pk_test_QorOLkP9hIdDgJ1rJICv33A8">
                  <Elements>
                    <CheckoutForm
                      user={this.props.user}
                      handleClick={this.handleClick}
                    />
                  </Elements>
                </StripeProvider>
              </div>
            ) : (
              <button
                style={{marginBottom: '10px'}}
                type="button"
                onClick={() => {
                  clearUserError()
                  history.push('/login')
                }}
              >
                Checkout
              </button>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  checkoutOrders: () => dispatch(clearCart()),
  clearUserError: () => dispatch(clearUserError())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
