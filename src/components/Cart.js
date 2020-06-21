import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {deleteCartItem, updateCart} from '../actions/cartActions'


// mapping actions to onclicks increment, decrement and delete
// for decrement we check quantity to avoid negative values
// mapping state.cart array each to its own product section

const CartList = (props) => {
    const onDelete = id => props.deleteCartItem(id) 
    const onIncrement = id =>  props.updateCart(id, 1)
    const onDecrement = (id, quantity) => {
        if (quantity > 1){
            props.updateCart(id, -1)
        }
    } 
    return (
        props.cart.map(
            function (product){
                return (
                    <section key={product.id} className="product">
                        <img src={product.image} alt="" />
                        <div className="detail">
                            <div className="prod-name">{product.title}</div>
                            <div className="prod-id">{product.id}</div>
                        </div>
                        <div className="prod-count">
                            <button className="plus" onClick={()=> onIncrement(product.id)}>+</button>
                            <div className="num-box">{product.quantity}</div>
                            <button className="minus" onClick={()=> onDecrement(product.id, product.quantity)}>-</button>
                        </div>
                        <div className="prod-price">
                            $ {(product.quantity*product.price).toLocaleString('en-US', {maximumFractionDigits: 2})}
                        </div>
                        <button onClick={()=> onDelete(product.id)} className="prod-delete">
                            X 
                        </button>
                    </section>
                )
            }
        )
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({deleteCartItem, updateCart}, dispatch)
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList)