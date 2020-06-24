import React from 'react'
import {connect} from 'react-redux'
import {addtoCart} from '../actions/cartActions'
import { bindActionCreators } from 'redux'
import reset from './reset.png'
import products from '.././products'

// showing cart total amount and reset icon since we can't add products once deleted
const Footer = ({quantity, amount, addtoCart}) => {
    const resetCart = () => addtoCart(products[0]) && addtoCart(products[1]) && addtoCart(products[2]) 
    return (
        <footer>
            <div className="continue"> Continue Shopping &gt;&gt;&gt;</div>
            <div className="subtotal">Subtotal: <span className="sub-price">$ {amount}</span></div>
            {quantity === 0 && <img onClick={() => resetCart()} src={reset} className="reset" alt=""/>}
		</footer>
    )
}


const mapStateToProps = state => {
    return {
        quantity: state.cart.totalQty,
        amount: state.cart.totalAmount
    }
}

// using addtoCart action to readd products once deleted

const mapDispatchToProps = dispatch => {
    return bindActionCreators({addtoCart}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer)