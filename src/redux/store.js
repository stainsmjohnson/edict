import { createStore, combineReducers } from 'redux';
import cartReducer from './reducers/cartReducer';
import authReducer from './reducers/authReducer';

const allReducers = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

export default createStore(allReducers);
