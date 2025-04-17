const initialState = {
    soal: [], // Default state is an empty array
  };
  
  const soalReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SOAL':
        return {
          ...state,
          soal: action.payload, // Replace soal with fetched data
        };
      default:
        return state;
    }
  };
  
  export default soalReducer;
  