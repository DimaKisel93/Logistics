import * as constants from './../constants';

const initialState = {
  loading: false,
  logistics: [],
  error: null
};

export default function logisticsReducer(state = initialState, action) {
  switch (action.type) {
    case constants.FETCH_LOGISTICS_STARTED:
        return {
            ...state,
            loading: true
        };
    case constants.SET_ALL_LOGISTICS:
        return {
            ...state,
            loading:false,
            error:null,
            logistics: action.payload
        };
    case constants.FETCH_LOGISTICS_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error
        };        
    default:
        return state;
  }
}