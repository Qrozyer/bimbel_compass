import { combineReducers } from 'redux';
import appReducer from './appReducer';  
import bidangReducer from './bidangReducer';
import subBidangReducer from './subBidangReducer';


const rootReducer = combineReducers({
  app: appReducer,    
  bidang: bidangReducer, 
  subBidang: subBidangReducer,
});

export default rootReducer;
