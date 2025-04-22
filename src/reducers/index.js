import { combineReducers } from 'redux';
import appReducer from './appReducer';  
import bidangReducer from './bidangReducer';
import subBidangReducer from './subBidangReducer';
import materiReducer from './materiReducer';
import soalReducer from './soalReducer';
import pesertaReducer from './pesertaReducer'; // Import pesertaReducer


const rootReducer = combineReducers({
  app: appReducer,    
  bidang: bidangReducer, 
  subBidang: subBidangReducer,
  materi: materiReducer,
  soal: soalReducer,
  peserta: pesertaReducer,
});

export default rootReducer;
