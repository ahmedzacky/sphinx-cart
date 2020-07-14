import React from 'react'
import {addtoCart} from '../actions/cartActions'
import { useSelector, useDispatch } from 'react-redux'
import reset from './reset.png'
import products from '.././products'

// showing cart total amount and reset icon since we can't add products once deleted
const CartFooter = () => {
    const state = useSelector(state => ({
        quantity: state.totalQty,
        amount: state.totalAmount
    }))
    const { quantity, amount } = state
    const dispatch = useDispatch()
    const resetCart = () => dispatch(addtoCart(products[0])) && dispatch(addtoCart(products[1])) && dispatch(addtoCart(products[2]))
    return (
        <footer>
            <div className="continue"> Continue Shopping &gt;&gt;&gt;</div>
            {quantity > 0 && <div className="subtotal">Subtotal: <span className="sub-price">${amount}</span></div>}
            {quantity === 0 && <img onClick={() => resetCart()} src={reset} className="reset" alt=""/>}
		</footer>
    )
}


export default (CartFooter)