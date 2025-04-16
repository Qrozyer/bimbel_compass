const initialState = {
    bidang: [], // Default state is an empty array
  };
  
  const bidangReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_BIDANG':
        return {
          ...state,
          bidang: action.payload, // Replace bidang with fetched data
        };
      default:
        return state;
    }
  };
  
  export default bidangReducer;
  