const initialState = {
    materi: [], // Default state is an empty array
  };
  
  const materiReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_MATERI':
        return {
          ...state,
          materi: action.payload, // Replace materi with fetched data
        };
      default:
        return state;
    }
  };
  
  export default materiReducer;
  