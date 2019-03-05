import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */

export class History extends Component {
  constructor() {
    super()
    this.state = {
      history: []
    }
  }
  async componentDidMount() {
    const userId = this.props.user.id
    const {data: history} = await axios.get(`/api/orders/${userId}/history`)
    this.setState({history})
  }

  render() {
    return (
      <div>
        <h1>Order History</h1>
        <div>
          {this.state.history.map(item => (
            <div key={item.id}>
              <div>Product :{item.product.name}</div>
              <div>Quantity : {item.itemQuantity}</div>
              <div>Total : {item.total}</div>
              <div>Purchase Date: {item.orderTS.slice(0, 10)}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(History)
