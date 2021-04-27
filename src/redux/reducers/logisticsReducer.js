import * as constants from './../constants';

const initialState = {
  loading: false,
  logistics: [],
  numPerPage: 0,
  totalLogisticsCount: 0,
  numPages: 0,
  currentPage:1,
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
            logistics: action.payload.rows,
            numPages: action.payload.numPages,
            totalLogisticsCount: action.payload.numRows,
            numPerPage: action.payload.numPerPage
        };
    case constants.FETCH_LOGISTICS_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error
        };
    case constants.SET_CURRENT_PAGE:
        return {
            ...state,
            loading:false,
            logistics: action.payload.rows,
            numPages: action.payload.numPages,
            totalLogisticsCount: action.payload.numRows,
            numPerPage: action.payload.numPerPage,
            currentPage: action.payload.currentPage
        };        
    default:
        return state;
  }
}