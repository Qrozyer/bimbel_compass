import {createStore} from 'redux';

// State awal aplikasi
const initialState = {
    user: "-",
    email: "-",
    nama: "-",
    isAuthenticated: false,
};

// Reducer untuk mengelola state
function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET USER':
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false };
        default:
            return state;
    }
}

// Membuat store Redux
const store = createStore(appReducer);

export default store;