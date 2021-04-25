import * as constants from '../constants'; 
import axios from 'axios';

export const fetchAllLogistics = () => {
  return (dispatch) => {
    dispatch(fetchLogisticStarted());
    axios
    .get(`http://localhost:4000/logistic`)
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