import * as constants from '../constants'; 

const httpGet = async endPoint => {
  try {
    const response = await fetch(`${constants.API_ROOT}/${endPoint}`)
    if (response.ok) {
      const json = await response.json()
      return json
    } else {
      throw new Error(response.status)
    }
  } catch (err) {
    console.warn('httpGet error ', err)
  }
}

export const fetchAllShipments = (currentPage) => {
  return (dispatch) => {
    dispatch(fetchShipmentsStarted());
    return httpGet(`shipments?page=${currentPage}`)
    .then(res => {
      if(res){
        dispatch(setAllShipments(res));
      }else{
        dispatch(fetchShipmentsFailure("Просим прощения! Не удалось загрузить данные"))
      }
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
    return httpGet(`shipments?page=${currentPage}`)
    .then(res => {
      if(res){
        res.currentPage = currentPage
        dispatch(setCurrentPage(res));
      }else{
        dispatch(fetchShipmentsFailure("Просим прощения! Не удалось загрузить данные"))
      }
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
  
