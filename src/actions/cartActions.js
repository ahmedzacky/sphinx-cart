// add - update - delete cart actions

export const addtoCart = product => {
    return {
    type: 'ADD_TO_CART', 
    payload: product
    }
}
export const updateCart = (id, unit) => {
    return {
    type: 'UPDATE_CART', 
    id,
    unit
    }
}

export const deleteCartItem = id => {
    return { 
    type: 'DELETE_CART_ITEM',
    id
    }
}
