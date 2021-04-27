import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useAction";
import useSortableData from '../hooks/useSortData'

const LogisticsTable = () => {
    const [query, setQuery] = useState("");
    const [filterCondition, setFilterCondition] = useState("");
    const [searchColumn, setSearchColumn] = useState("");
    const [showFilter , setShowFilter] = useState(false);
    const { logistics, error, loading, numPages, currentPage }= useSelector(state => state.logistics);
    const {items, requestSort, sortConfig} = useSortableData(logistics);
    const {fetchAllLogistics, fetchCurrentPage} = useActions();

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const handleClickFilter = () => {
        setShowFilter(state => !state)
    }

    const search = (rows, config = null, searchColumn) => {
        return rows.filter((row) => {
            switch(config){
                case "contains" : return searchColumn.length === 0 ? 
                    rows :
                    [searchColumn].some(
                        (columns) =>
                            row[columns].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
                    )
                case "equal" : return searchColumn.length === 0 ? 
                    rows :
                    [searchColumn].some(
                        (columns) =>
                            (query.trim() === '') ? 
                                rows :
                                row[columns].toString().toLowerCase() === query.toLowerCase()
                    )
                case "more" : return searchColumn.length === 0 ? 
                        rows :
                        [searchColumn].some(
                            (columns) =>
                            row[columns].toString().toLowerCase() > query
                    )
                case "less" : return searchColumn.length === 0 ?
                        rows :
                        [searchColumn].some(
                            (columns) =>
                                (query.trim() === '') ? 
                                    rows :
                                    row[columns].toString().toLowerCase() < query
                        )
                default :
                    return rows
            }
        }
        )
    }

    useEffect(() => {
        fetchAllLogistics(currentPage)
    },[])

    let pages = [];
    for(let i=1; i <= numPages; i++ ){
        pages.push(i)
    }

    if(loading){
        return <h1>Идет загрузка...</h1>
    }
    
    if(error){
    return <h1>{error}</h1>
    }


    return(
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
                                <select value={searchColumn} onChange={(e) => setSearchColumn(e.target.value)}>
                                    <option value="date">Дата</option>
                                    <option value="name">Название</option>
                                    <option value="amount">Количество</option>
                                    <option value="distance">Расстояние</option>
                                </select>
                            </label>
                        </div>
                        <div className="filter__block">
                            <label>Условия фильтрации
                                <select value={filterCondition} onChange={(e) => setFilterCondition(e.target.value)}>
                                    <option value="equal">Равно</option>
                                    <option value="contains">Содержит</option>
                                    <option value="more">Больше</option>
                                    <option value="less">Меньше</option>
                                </select>
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
                                <button type="button" onClick={() => requestSort("name")} className={getClassNamesFor('name')}>Название</button>
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
                        {items && search(items, filterCondition, searchColumn).map((item) => (
                            <tr key={item.id}>
                                <td align="center">{item.date}</td>
                                <td>{item.name}</td>
                                <td>{item.amount}</td>
                                <td>{item.distance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            {pages.map( p => {
                return <span className={currentPage === p && 'bold'} onClick={() => fetchCurrentPage(p)}>{p}</span>
            })

            }
            </div>
        </div>
    )
}

export default LogisticsTable;