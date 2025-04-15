import { combineReducers } from 'redux';
import appReducer from './appReducer';  // Import appReducer untuk user state
import bidangReducer from './bidangReducer';  // Import bidangReducer untuk bidang state

// Menggabungkan semua reducer
const rootReducer = combineReducers({
  app: appReducer,    // Untuk user state
  bidang: bidangReducer,  // Untuk bidang state
});

export default rootReducer;
