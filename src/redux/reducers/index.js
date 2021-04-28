import { combineReducers } from 'redux';
import shipments from './shipmentsReducer';

const rootReducer = combineReducers({ shipments });

export default rootReducer;