import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as LogisticsActionCreators from '../redux/actions/logisticsActionCreators'

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(LogisticsActionCreators, dispatch)
}