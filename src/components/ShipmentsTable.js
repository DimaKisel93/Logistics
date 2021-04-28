import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useAction";
import { filterData } from "../common/filterData";
import { formatDate } from "../common/formatDate";
import useSortableData from '../hooks/useSortData'
import { Select } from "./SelectComponent";

const ShipmentsTable = () => {
    const [query, setQuery] = useState("");
    const [filterCondition, setFilterCondition] = useState("contains");
    const [filterColumn, setFilterColumn] = useState("amount");
    const [showFilter , setShowFilter] = useState(false);
    const { shipments, error, loading, numberPages, currentPage }= useSelector(state => state.shipments);
    const { sortedItems, requestSort, sortConfig } = useSortableData(shipments);
    const { fetchAllShipments, fetchCurrentPage } = useActions();

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

    const getClassNamesFor = (name) => {
        if (!sortConfig) return
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const handleClickFilter = () => {
        setShowFilter(state => !state)
    }

    useEffect(() => {
        fetchAllShipments(currentPage)
    },[])

    let pages = [];
    for(let i=1; i <= numberPages; i++ ){
        pages.push(i)
    }

    if(loading){
        return <h1>Идет загрузка...</h1>
    }
    
    if(error){
        return <h1>{error}</h1>
    }

    return(
        <>
            <div className="table__wrapper">  
                <div className="filter__wrapper">
                    <button className="filter__button" onClick={() => handleClickFilter()}>Фильтр</button>
                    {showFilter &&
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
                    }
                </div>
                <div className="table__container">
                    <table className="table">
                        <thead>
                            <tr className="thead-dark col-12">
                                <th scope="col">
                                    <button type="button">Дата</button>
                                </th>
                                <th scope="col">
                                    <button type="button" onClick={() => requestSort("route")} className={getClassNamesFor('route')}>Маршрут</button>
                                </th>
                                <th scope="col">
                                    <button type="button" onClick={() => requestSort("amount")} className={getClassNamesFor('amount')}>Количество</button>
                                </th>
                                <th scope="col">
                                    <button type="button" onClick={() => requestSort("distance")} className={getClassNamesFor('distance')}>Расстояние</button>
                                </th>       
                            </tr>
                        </thead>
                        <tbody>
                            {sortedItems && filterData(sortedItems, filterCondition, filterColumn, query).map((item) => (
                                <tr key={item.id}>
                                    <td align="center">{formatDate(item.date)}</td>
                                    <td>{item.route}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.distance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="pagination">
                {pages.map( page => {
                    return <div key={page} className={currentPage === page ? 'page page-active' : 'page'} onClick={() => fetchCurrentPage(page)}>{page}</div>
                })
                }
            </div>
        </>
    )
}

export default ShipmentsTable;