import { combineReducers } from 'redux';
import counter from './counter';
import lang from './lang';

const rootReducer = combineReducers({
  counter,
  lang,
});

export default rootReducer;
