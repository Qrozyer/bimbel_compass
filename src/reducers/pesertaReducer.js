const initialState = {
    peserta: [], // Default state is an empty array
  };
  
  const pesertaReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PESERTA':
        return {
          ...state,
          peserta: action.payload, // Replace peserta with fetched data
        };
      default:
        return state;
    }
  };
  
  export default pesertaReducer;
  