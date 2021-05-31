import {Select} from './SelectComponent'
import PropTypes from 'prop-types'

const Filter = ({query, setQuery, filterColumn, setFilterColumn, filterCondition, setFilterCondition}) => {
    
    const columnForShipmentsSelect = [
        { id:1, value: 'route', label: 'Маршрут' },
        { id:2, value: 'amount', label: 'Количество' },
        { id:3, value: 'distance', label: 'Расстояние' }
    ]

    const conditionForShipmentsSelect = [
        { id:1, value: 'equal', label: 'Равно' },
        { id:2, value: 'contains', label: 'Содержит' },
        { id:3, value: 'more', label: 'Больше' },
        { id:4, value: 'less', label: 'Меньше' }
    ]

    return(
        <div className="filter__container">
            <div className="filter__query">
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}></input>    
            </div> 
            <div className="filter__block">
                <label>Выберите колонку
                    <Select value={filterColumn} onChange={setFilterColumn} options={columnForShipmentsSelect}/>
                </label>
            </div>
            <div className="filter__block">
                <label>Условия фильтрации
                    <Select value={filterCondition} onChange={setFilterCondition} options={conditionForShipmentsSelect}/>
                </label>
            </div> 
        </div> 
    )
}

Filter.propTypes ={
    query: PropTypes.string,
    setQuery: PropTypes.func,
    filterColumn: PropTypes.string,
    setFilterColumn: PropTypes.func,
    filterCondition: PropTypes.string,
    setFilterCondition: PropTypes.func,
}

export default Filter;