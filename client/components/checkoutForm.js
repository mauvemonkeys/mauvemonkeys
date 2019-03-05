import React, {Component} from 'react'
import axios from 'axios'
import {CardElement, injectStripe} from 'react-stripe-elements'

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#000000',
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
        '::placeholder': {}
      },
      invalid: {
        color: '#00000'
      }
    }
  }
}

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit() {
    let {token} = await this.props.stripe.createToken({
      name: this.props.user.firstName + ' ' + this.props.user.lastName
    })

    await axios.post(`/api/orders/${this.props.user.id}/charge`, {
      token: token.id
    })

    await this.props.handleClick()
  }

  render() {
    return (
      <div className="checkout">
        <div
          style={{
            paddingLeft: '65px',
            paddingRight: '65px',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              background: 'white',
              border: '1px solid black',
              borderRadius: '5px',
              paddingLeft: '5px'
            }}
          >
            <CardElement {...createOptions()} />
          </div>
        </div>
        <button type="button" onClick={this.handleSubmit}>
          Pay
        </button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
