import * as constants from '../constants'; 
import axios from 'axios';

export const fetchAllLogistics = (currentPage) => {
  return (dispatch) => {
    dispatch(fetchLogisticStarted());
    axios
    .get(`http://localhost:4000/logistic?page=${currentPage}`)
    .then(res => {
      dispatch(setAllLogistic(res.data));
    })
    .catch(err => {
      dispatch(fetchLogisticFailure(err.message));
    });
  };
}

const setAllLogistic = (data) => ({
    type: constants.SET_ALL_LOGISTICS,
    payload: data
});
  
const fetchLogisticStarted = () => ({
    type: constants.FETCH_LOGISTICS_STARTED
});

const fetchLogisticFailure = error => ({
    type: constants.FETCH_LOGISTICS_FAILURE,
    payload: {
      error
    }
});

export const fetchCurrentPage = (currentPage) => {
  return (dispatch) => {
    dispatch(fetchLogisticStarted());
    axios
    .get(`http://localhost:4000/logistic?page=${currentPage}`)
    .then(res => {
      res.data.currentPage = currentPage
      dispatch(setCurrentPage(res.data));
    })
    .catch(err => {
      dispatch(fetchLogisticFailure(err.message));
    });
  }
}

const setCurrentPage = (data) => ({
  type: constants.SET_CURRENT_PAGE,
  payload: data
});
  
