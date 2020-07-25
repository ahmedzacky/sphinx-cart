import React from 'react';
import CartList from './components/Cart'
import CartFooter from './components/Footer'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import cartReducers from './reducers/cartReducers'


import logger from 'redux-logger'

// creating redux store
const store = createStore(cartReducers, applyMiddleware(logger));

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
