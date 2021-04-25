import { combineReducers } from 'redux';
import logistics from './logisticsReducer';

const rootReducer = combineReducers({ logistics });

export default rootReducer;