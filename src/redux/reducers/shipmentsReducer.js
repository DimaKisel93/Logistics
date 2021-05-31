import * as constants from '../constants';

export const initialState = {
  loading: false,
  shipments: [],
  numberPerPage: 0,
  numberPages: 0,
  currentPage:1,
  error: null
};

export default function shipmentsReducer(state = initialState, action) {
  switch (action.type) {
    case constants.FETCH_SHIPMENTS_STARTED:
        return {
            ...state,
            loading: true,
            error:null
        };
    case constants.SET_ALL_SHIPMENTS:
        return {
            ...state,
            loading:false,
            error:null,
            shipments: action.payload.shipments,
            numberPages: action.payload.numberPages,
            numberPerPage: action.payload.numberPerPage
        };
    case constants.FETCH_SHIPMENTS_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error
        };
    case constants.SET_CURRENT_PAGE:
        return {
            ...state,
            loading:false,
            shipments: action.payload.shipments,
            numberPages: action.payload.numberPages,
            numberPerPage: action.payload.numberPerPage,
            currentPage: action.payload.currentPage
        };        
    default:
        return state;
  }
}