import React from 'react';
import CartList from './components/Cart'
import Footer from './components/Footer'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers/reducers';
import {addtoCart} from './actions/cartActions'
import products from './products'

// creating redux store
const store = createStore(reducers);

// we add products one by one to simulate reality
store.dispatch(addtoCart(products[0]))
store.dispatch(addtoCart(products[1]))
store.dispatch(addtoCart(products[2]))
store.dispatch(addtoCart(products[2]))


//store.dispatch(addtoCart(products));   

// store as provider and rendering cart list and footer
const App = () =>  {
  return (
    <Provider store={store}>
        <div className="container">
        <h2>Shopping Cart</h2>
        <CartList />
        <Footer />
        </div>
    </Provider>
  );
}

export default App;
