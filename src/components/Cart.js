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
    const onIncrement = id =>  dispatch(updateCart(id, 1))
    const onDecrement = (id, quantity) => {
        if (quantity > 1){
            dispatch(updateCart(id, -1))
        } else {
            dispatch(deleteCartItem(id))
        }
    } 


    const valueExtracter = (e) => {
        return (e.target.value)
    }

    //handle value will only run if input is a number 
    const handleValue = (id, value) => {
        if (parseInt(value)){
            dispatch(setQuantity(id, parseInt(value)))
        }
    }
    return (
        cart.map(
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
                            <input type="text" onChange={(e)=> handleValue(product.id, valueExtracter(e))} className="num-box" placeholder={product.quantity} />
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

export default (CartList)