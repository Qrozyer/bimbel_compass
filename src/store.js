import { createStore } from 'redux';
import rootReducer from './reducers'; // Import rootReducer yang sudah digabungkan

// Membuat store Redux dengan rootReducer
const store = createStore(rootReducer);

export default store;
