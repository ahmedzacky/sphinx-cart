// we need to add to cart , update and delete from cart so we have a reducer for each 

const cartReducers = (state={cart:[]}, action) => {
    // create copy of current state to avoid mutation
    const cartCopy = [...state.cart]
    let newCart = []
    // switch statment for each action type
    switch (action.type){
        //add to cart reducer
        //recieves product and adds it to cart
        // when adding to cart its either existing product or not existing
        case "ADD_TO_CART":
                const indexToAdd = cartCopy.findIndex(product => product.id === action.payload.id)
                // if item exists in the cart we append to item quantity
                if (indexToAdd !== -1){
                    const newItemToAdd = {
                        ...cartCopy[indexToAdd], 
                        quantity: cartCopy[indexToAdd].quantity + 1
                    }
                    let newCart = [
                        ...cartCopy.slice(0,indexToAdd),            
                        newItemToAdd,
                        ...cartCopy.slice(indexToAdd + 1)
                    ]
                    return {
                        ...state,
                        cart: newCart ,
                        totalAmount: totals(newCart).amount,
                        totalQty: totals(newCart).qty,
                    }
                }
                // if item doesn't exist in cart we add it to the cart and set its quantity to 1
                else {
                    let newCartItem = {
                        ...action.payload,
                        quantity: 1
                    }
                    let newCart = [newCartItem, ...cartCopy]
                    return {
                        ...state,
                        cart: newCart,
                        totalAmount: totals(newCart).amount,
                        totalQty: totals(newCart).qty
                    }
                }
        

        //delete cart reducer
        //splits cart array into before and after object to be deleted
        //returns cart array without the deleted object
        case "DELETE_CART_ITEM":
        const indexToDelete = cartCopy.findIndex(product => product.id === action.id)
        cartCopy.splice(indexToDelete,1)
        return {
            ...state,
            cart: cartCopy,
            totalAmount: totals(cartCopy).amount,
            totalQty: totals(cartCopy).qty
        }

        //update cart reducer
        //works as delete reducer but returns new quantity instead of deleting object 
        case "UPDATE_CART": 
        const indexToUpdate = cartCopy.findIndex(product => product.id === action.id)
        const newItemToUpdate = {
            ...cartCopy[indexToUpdate], 
            quantity: cartCopy[indexToUpdate].quantity + action.unit
        }
        newCart = [
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

        //set quantity (from input field)
        case "SET_QUANTITY": 
        const indexToSetVal = cartCopy.findIndex(product => product.id === action.id)
        const newItemToSetVal = {
            ...cartCopy[indexToSetVal], 
            quantity: action.val
        }
        newCart = [
            ...cartCopy.slice(0,indexToSetVal),            
            newItemToSetVal,
            ...cartCopy.slice(indexToSetVal + 1)
        ]
        return {
            ...state,
            cart: newCart ,
            totalAmount: totals(newCart).amount,
            totalQty: totals(newCart).qty,
        }


        default:
            return state
    }
    
}



export default cartReducers;

// calculating total items and price
export const totals = payload => {
    // we create a new array containing total values from the payload array (cart)
    // then we use reduce to sum up item count
    const total = payload.map(item => item.price * item.quantity).reduce((a,b) => a+b, 0)
    const totalQty = payload.map(item => item.quantity).reduce((a,b) => a+b, 0)
    return {
        amount: total.toFixed(2), 
        qty: totalQty
    }
}

