import configureMockStore from 'redux-mock-store'

import thunk from 'redux-thunk' 

import * as constants from '../constants' 
import { fetchAllShipments } from './logisticsActionCreators' 

import fetchMock from 'fetch-mock' 

import expect from 'expect' 

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('ShipmentsActions', () => { 

  describe('async actions', () => { 

    afterEach(() => {
      fetchMock.reset()
      fetchMock.restore()
    })

    
    it('creates SET_ALL_SHIPMENTS when fetching shipments has been done', () => {

      
      fetchMock.getOnce(`${constants.API_ROOT}/shipments?page=1`, {
        headers: { 'content-type': 'application/json' }, 
        body: { shipments: [1, 2, 3] }, 
      })
      
      const expectedActions = [
        {
          type: constants.FETCH_SHIPMENTS_STARTED,
        },
        {
          type: constants.SET_ALL_SHIPMENTS,
          payload: {
            shipments:  [1, 2, 3]
          },
        },
      ]
      
      const store = mockStore({})

      return store.dispatch(fetchAllShipments(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('creates FETCH_SHIPMENTS_FAILURE when fetching shipments has been failure', () => {
          
      fetchMock.getOnce(`${constants.API_ROOT}/shipments?page=1`, {
        headers: { 'content-type': 'application/json' }, 
        body: { error: "Просим прощения! Не удалось загрузить данные" }, 
      })
      
      const expectedActions = [
        {
          type: constants.FETCH_SHIPMENTS_STARTED,
        },
        {
          type: constants.SET_ALL_SHIPMENTS,
          payload: {
            error:  'Просим прощения! Не удалось загрузить данные'
          },
        },
      ]
      
      const store = mockStore({})

      return store.dispatch(fetchAllShipments(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})