import React from 'react';
import CartList from './components/Cart'
import CartFooter from './components/Footer'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {addtoCart} from './actions/cartActions'
import products from './products'
import cartReducers from './reducers/cartReducers'

// creating redux store
const store = createStore(cartReducers);

// we add products one by one to simulate reality
store.dispatch(addtoCart(products[0]))
store.dispatch(addtoCart(products[1]))
store.dispatch(addtoCart(products[2]))

// store as provider and rendering cart list and footer
const App = () =>  {
  return (
    <Provider store={store}>
        <div className="container">
          	<div className="title">
            	Shopping Cart
          	</div>
        <CartList />
        <CartFooter />
        </div>
    </Provider>
  );
}

export default App;
