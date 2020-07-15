import React from 'react'
import { deleteCartItem, updateCart, setQuantity } from '../actions/cartActions'
import { useSelector, useDispatch } from 'react-redux'


// mapping actions to onclicks increment, decrement and delete
// for decrement we check quantity to avoid negative values
// mapping state.cart array each to its own product section in the cart

const CartList = () => {
    const state = useSelector(state => ({ cart: state.cart }))
    const { cart } = state
    const dispatch = useDispatch()
    const onDelete = id => dispatch(deleteCartItem(id))
     
    const onIncrement = (id) => {
        dispatch(updateCart(id, 1))
    }

    const onDecrement = (id, quantity) => {
        if (quantity > 1){
            dispatch(updateCart(id, -1))
        } else {
            dispatch(deleteCartItem(id))
        }
    }

    const valueExtracter = (e) => {
        let value = parseInt(e.target.value)
        if (isNaN(value)) return ''
        else return value
    }

    //handle value will only run if input is a number 
    const handleValue = (id, value) => {
        if (value === '' || value > 0){
            dispatch(setQuantity(id, value))
        }
    }

    return (
        cart.map(
            function (product){
                let itemPrice = product.quantity * product.price
                return (
                    <section key={product.id} className="product">
                        <img src={product.image} alt="" />
                        <div className="detail">
                            <div className="prod-name">{product.title}</div>
                            <div className="prod-id">{product.id}</div>
                        </div>
                        <div className="prod-count">
                            <button className="minus" onClick={()=> onDecrement(product.id, product.quantity)}>-</button>
                            <input type="text" onChange={(e)=> handleValue(product.id, valueExtracter(e))} className="num-box" value={product.quantity}/>
                            <button className="plus" onClick={()=> onIncrement(product.id)}>+</button>
                        </div>
                        <div className="prod-price">
                           {itemPrice >= product.price ? `$ ${itemPrice.toLocaleString('en-US', {maximumFractionDigits: 2})}` : <span className="disabled-price">$ {product.price}</span>}
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

export default (CartList)