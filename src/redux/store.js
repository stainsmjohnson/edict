import {createStore, combineReducers} from 'redux';
import cartReducer from './reducers/cartReducer';

const allReducers = combineReducers({
  cart: cartReducer,
});

export default createStore(allReducers);
