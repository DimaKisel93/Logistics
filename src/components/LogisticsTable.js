import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useAction";
import useSortableData from '../hooks/useSortData'

const LogisticsTable = () => {
    const [q, setQ] = useState("");
    const [showDropDown , setShowDropDown] = useState(false);
    const [searchColumns, setSearchColumns] = useState(["name", "amount"]);
    const { logistics, error, loading }= useSelector(state => state.logistics);
    const {items, requestSort, sortConfig} = useSortableData(logistics);
    const {fetchAllLogistics} = useActions();

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const handleClickDropdown = () => {
        setShowDropDown(state => !state)
    }

    function search(rows){
        return rows.filter((row) => 
            searchColumns.some(
                (columns) =>
                    row[columns].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
            )
        )
    } 
    const columns = items[0] && Object.keys(items[0]);

    useEffect(() => {
        fetchAllLogistics()
    },[])

    if(loading){
        return <h1>Идет загрузка...</h1>
    }
    
    if(error){
    return <h1>{error}</h1>
    }

    return(
        <div className="table__wrapper">  
            <div className="filter__wrapper">
                <button className="button" onClick={() => handleClickDropdown()}>Фильтр</button>
                {showDropDown &&
                    <div className="filter__container">
                        <div className="filter__query">
                            <div className="filter__query_container">
                                <input type="text" value={q} onChange={(e) => setQ(e.target.value)}></input>    
                            </div>
                        </div> 
                        <div className="filter__block">
                            {columns && 
                                columns.map((column) => (
                                    <div key={column[0]}>
                                        <input type="checkbox" checked={searchColumns.includes(column)}
                                            onChange={(e) => {
                                                const checked = searchColumns.includes(column);
                                                setSearchColumns(prev => checked 
                                                    ? prev.filter(sc => sc !== column)
                                                    : [...prev, column]
                                                    )
                                            }}
                                        ></input>
                                        {column}
                                    </div>
                                ))
                            }
                        </div>
                        <div className="filter__block"></div> 
                    </div> 
                }
            </div>
            <div className="table__container">
                <table className="table table-hover">
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
                        {items && search(items).map((item) => (
                            <tr key={item.id}>
                                <td align="center">{item.date}</td>
                                <td>{item.name}</td>
                                <td>{item.amount}</td>
                                <td>{item.distance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LogisticsTable;