const cart = [];

const cartReducer = (state = cart, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'delete':
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};
export default cartReducer;
