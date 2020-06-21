import React from 'react'
import {connect} from 'react-redux'
import {addtoCart} from '../actions/cartActions'
import { bindActionCreators } from 'redux'
import reset from './reset.png'
import products from '.././products'

// showing cart total amount and reset icon since we can't add products once deleted

const Footer = ({total, addtoCart}) => {
    const resetCart = () => addtoCart(products)
    return (
        <footer>
            <div className="continue"> Continue Shopping &gt;&gt;&gt;</div>
            <div className="subtotal">Subtotal: <span className="sub-price">$ {total}</span></div>
            {total === "0.00" && <img onClick={() => resetCart()} src={reset} className="reset" alt=""/>}
		</footer>
    )
}


const mapStateToProps = state => {
    return {
        total: state.cart.totalAmount
    }
}

// using addtoCart action to readd products once deleted

const mapDispatchToProps = dispatch => {
    return bindActionCreators({addtoCart}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer)