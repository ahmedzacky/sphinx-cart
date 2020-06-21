// we need to add to cart , update and delete from cart so we have a reducer for each 

const cartReducers = (state={cart:[]}, action) => {

    // create copy of current state to avoid mutation
    const cartCopy = [...state.cart]
    // switch statment for each action type
    // eslint-disable-next-line default-case
    switch (action.type){

        //add to cart reducer
        //recieves product and adds it to cart
        case "ADD_TO_CART":
        return {...state,
            cart: action.payload,
            totalAmount: totals(action.payload).amount,
            totalQty: totals(action.payload).qty
        }

        //delete cart reducer
        //splits cart array into before and after object to be deleted
        //returns cart array without the deleted object
        case "DELETE_CART_ITEM":
        const indexToDelete = cartCopy.findIndex(product => product.id === action.id)
        let updatedCart = [
            ...cartCopy.slice(0, indexToDelete),
            ...cartCopy.slice(indexToDelete + 1)
            ]
        return {...state,
            cart: updatedCart,
            totalAmount: totals(updatedCart).amount,
            totalQty: totals(updatedCart).qty
        }
        //update cart reducer
        //works as delete reducer but returns new quantity instead of deleting object 
        case "UPDATE_CART": 
        const indexToUpdate = cartCopy.findIndex(product => product.id === action.id)
        const newItemToUpdate = {
            ...cartCopy[indexToUpdate], 
            quantity: cartCopy[indexToUpdate].quantity + action.unit
        }
        let newCart = [
            ...cartCopy.slice(0,indexToUpdate),            
            newItemToUpdate,
            ...cartCopy.slice(indexToUpdate + 1)
        ]
        return {
            ...state,
            cart: newCart ,
            totalAmount: totals(newCart).amount,
            totalQty: totals(newCart).qty,
        }
    }
    return state;
}


export default cartReducers;

// calculating total items and price
export const totals = payload => {
    const total = payload.map(item => item.price * item.quantity).reduce((a,b) => a+b, 0)
    const totalQty = payload.map(item => item.quantity).reduce((a,b) => a+b, 0)
    return {
        amount: total.toFixed(2), 
        qty: totalQty
    }
}

