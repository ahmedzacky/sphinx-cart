// we need to add to cart , update and delete from cart so we have a reducer for each 

const cartReducers = (state={cart:[]}, action) => {
    // create copy of current state to avoid mutation
    const cartCopy = [...state.cart]
    console.log(cartCopy)
    // switch statment for each action type
    // eslint-disable-next-line default-case
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
        
        // if item doesn't exist in cart we add it to the cart 
        else {
            let newCart = [action.payload, ...cartCopy]
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

