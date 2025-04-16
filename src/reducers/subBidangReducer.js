const initialState = {
    subBidang: [], // Default state is an empty array
  };
  
  const subBidangReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SUB_BIDANG':
        return {
          ...state,
          subBidang: action.payload, // Replace bidang with fetched data
        };
      default:
        return state;
    }
  };
  
  export default subBidangReducer;
  