const initialState = {
    bidang: [], // Default state is an empty array
  };
  
  const bidangReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_BIDANG':
        return {
          ...state,
          bidang: [...state.bidang, action.payload], // Add new bidang to the list
        };
      case 'EDIT_BIDANG':
        return {
          ...state,
          bidang: state.bidang.map((item) =>
            item.BidangId === action.payload.BidangId ? action.payload : item
          ),
        };
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
  