/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { deleteCartItem, updateCart, setQuantity, addtoCart } from '../actions/cartActions'
import { useSelector, useDispatch } from 'react-redux'
import products from '../products'


// mapping state.cart array each to its own product section in the cart
const CartList = () => {
    const { cart } = useSelector(state => ({ cart: state.cart }))
    const dispatch = useDispatch()

    //to simulate some sort of api call we add products once component mounts
    useEffect(()=> {
        dispatch(addtoCart(products[0]))
        dispatch(addtoCart(products[1]))
        dispatch(addtoCart(products[2]))
    },[])

    //delete cart item on delete
    const onDelete = id => dispatch(deleteCartItem(id))
     
    //if the quantity is set to '' we dispatch setQuantity to avoid adding 1 to ''
    const onIncrement = (id, quantity) => {
        if (quantity === ''){
            dispatch(setQuantity(id, 1))
        } else {
            dispatch(updateCart(id, 1))
        }
    }

    //if quantity is greater than 1 we decrement from quantity
    // else quantity will be (1 || '') we delete the item 
    const onDecrement = (id, quantity) => {
        if (quantity > 1){
            dispatch(updateCart(id, -1))
        } else {
            dispatch(deleteCartItem(id))
        }
    }

    //we extract value from input or enable user to pass in '' to delete the current value
    const valueExtracter = (e) => {
        let value = parseInt(e.target.value)
        if (isNaN(value)) return ''
        else return value
    }

    //handle value will only run if input is a number  or ''
    const handleValue = (id, value) => {
        if (value === '' || value > 0){
            dispatch(setQuantity(id, value))
        }
    }

    return (
        cart.map((product) => {
                const { quantity,price,title,id,image } = product
                const itemPrice = quantity * price
                return (
                    <section key={id} className="product">
                        <img src={image} alt="" />
                        <div className="detail">
                            <p className="prod-name">{title}</p>
                            <p className="prod-id">{id}</p>
                        </div>
                        <div className="prod-count">
                            <button className="minus" onClick={()=> onDecrement(id, quantity)}>-</button>
                            <input type="text" onChange={(e)=> handleValue(id, valueExtracter(e))} className="num-box" value={quantity}/>
                            <button className="plus" onClick={()=> onIncrement(id, quantity)}>+</button>
                        </div>
                        <div className="prod-price">
                           {itemPrice ? `$ ${itemPrice.toFixed(2)}` : <span className="disabled-price">$ {price}</span>}
                        </div>
                        <button onClick={()=> onDelete(id)} className="prod-delete">
                            X 
                        </button>
                    </section>
                )
            }
        )
    )
}

export default (CartList)