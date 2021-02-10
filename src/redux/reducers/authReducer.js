const cart = {
  user_id: null,
  user_name: 'unknown',
};

const authReducer = (state = cart, action) => {
  switch (action.type) {
    case 'login':
      return { ...action.payload };
    default:
      return state;
  }
};
export default authReducer;
