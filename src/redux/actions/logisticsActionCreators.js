import * as constants from '../constants'; 
import axios from 'axios';

export const fetchAllShipments = (currentPage) => {
  return (dispatch) => {
    dispatch(fetchShipmentsStarted());
    return axios
    .get(`http://localhost:4000/shipments?page=${currentPage}`)
    .then(res => {
      dispatch(setAllShipments(res.data));
    })
    .catch(err => {
      dispatch(fetchShipmentsFailure(err.message));
    });
  };
}

const setAllShipments = (data) => ({
    type: constants.SET_ALL_SHIPMENTS,
    payload: data
});
  
const fetchShipmentsStarted = () => ({
    type: constants.FETCH_SHIPMENTS_STARTED
});

const fetchShipmentsFailure = error => ({
    type: constants.FETCH_SHIPMENTS_FAILURE,
    payload: {
      error
    }
});

export const fetchCurrentPage = (currentPage) => {
  return (dispatch) => {
    dispatch(fetchShipmentsStarted());
    return axios
    .get(`http://localhost:4000/shipments?page=${currentPage}`)
    .then(res => {
      res.data.currentPage = currentPage
      dispatch(setCurrentPage(res.data));
    })
    .catch(err => {
      dispatch(fetchShipmentsFailure(err.message));
    });
  }
}

const setCurrentPage = (data) => ({
  type: constants.SET_CURRENT_PAGE,
  payload: data
});
  
