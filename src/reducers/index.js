import { combineReducers } from 'redux';
import appReducer from './appReducer';  
import bidangReducer from './bidangReducer';
import subBidangReducer from './subBidangReducer';
import materiReducer from './materiReducer';
import soalReducer from './soalReducer';


const rootReducer = combineReducers({
  app: appReducer,    
  bidang: bidangReducer, 
  subBidang: subBidangReducer,
  materi: materiReducer,
  soal: soalReducer
});

export default rootReducer;
