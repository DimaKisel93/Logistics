import shipmentsReducer, { initialState } from './shipmentsReducer'
import * as t from '../constants'

describe('shipments reducer', () => { //  describe - группировка для наших тестов новостного редьюсера
    it('should return the initial state', () => {
        expect(shipmentsReducer(undefined, {})).toEqual(initialState)
    })

    it('FETCH_SHIPMENTS_STARTED without error', () => { // it - блок, конкретного unit-теста 
        
        const action = {
            type: t.FETCH_SHIPMENTS_STARTED,
        }

        expect(shipmentsReducer(initialState, action)).toEqual({
            ...initialState,
            loading: true,
            error: null
        })
    })  

    it('FETCH_SHIPMENTS_STARTED after error', () => { // it - блок, конкретного unit-теста 
        const initialStateWithError = {
            shipments:[],
            loading: true, 
            numberPages:0,
            numberPerPage:0,
            currentPage:1,
            error:"Unknown error"
        }
    
        const action = {
            type: t.FETCH_SHIPMENTS_STARTED,
        }

        expect(shipmentsReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            loading: true,
            error: null
        })
    })

    it('SET_ALL_SHIPMENTS', () => {
      
        const initialState = {
            shipments:[],
            loading: true, 
            numberPages:0,
            numberPerPage:0,
            currentPage:1,
            error:null
        }  

        const action = {
            type: t.SET_ALL_SHIPMENTS,
            payload: {
                numberPages:3,
                numberPerPage:4,
                shipments:[1,2,3]
            }
        }

        expect(shipmentsReducer(initialState, action)).toEqual({
            ...initialState,
            loading: false,
            numberPages: 3,
            numberPerPage: 4, 
            shipments: action.payload.shipments,
        })

    })

    it('FETCH_SHIPMENTS_FAILURE', () => {
        const initialState = {
            shipments:[],
            loading: true, 
            numberPages:0,
            numberPerPage:0,
            currentPage:1,
            error:null
        }
        
        const action = {
            type: t.FETCH_SHIPMENTS_FAILURE,
            payload:{
                error: "Error with request",
            }
        }
        
        expect(shipmentsReducer(initialState, action)).toEqual({
            ...initialState,
            loading:false,
            error:action.payload.error
        })

    })

    it('SET_CURRENT_PAGE', () => {
        const initialState = {
            shipments:[1,2,3],
            loading: false, 
            numberPages:3,
            numberPerPage:4,
            currentPage:1,
            error:null
        }

        const action = {
            type: t.SET_CURRENT_PAGE,
            payload: {
                numberPages:3,
                numberPerPage:4,
                shipments:[1,2,3],
                currentPage: 2
            }
        }

        expect(shipmentsReducer(initialState, action)).toEqual({
            ...initialState,
            shipments: [1,2,3],
            currentPage:2
        })

    })

})