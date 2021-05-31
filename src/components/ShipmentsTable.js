import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useAction";
import { filterData } from "../common/filterData";
import { formatDate } from "../common/formatDate";
import useSortableData from '../hooks/useSortData'
import Filter from "./Filter";

const ShipmentsTable = () => {
    const [query, setQuery] = useState("");
    const [filterCondition, setFilterCondition] = useState("contains");
    const [filterColumn, setFilterColumn] = useState("amount");
    const [showFilter , setShowFilter] = useState(false);
    const { shipments, error, loading, numberPages, currentPage }= useSelector(state => state.shipments);
    const { sortedItems, requestSort, sortConfig } = useSortableData(shipments);
    const { fetchAllShipments, fetchCurrentPage } = useActions();

    const getClassNamesFor = (name) => {
        if (!sortConfig) return
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const handleClickFilter = () => {
        setShowFilter(state => !state)
    }

    useEffect(() => {
        fetchAllShipments(currentPage)
    },[currentPage])

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
                        <Filter query={query} setQuery={setQuery} filterCondition={filterCondition} setFilterCondition={setFilterCondition} filterColumn={filterColumn} setFilterColumn={setFilterColumn}/>
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