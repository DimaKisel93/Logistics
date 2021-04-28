export const filterData = (items, filterCondition, filterColumn, query) => {
    
    if((filterCondition === "more" || filterCondition === "less") && filterColumn === "route") return items

    return items.filter((row) => {
        switch(filterCondition){
            case "equal" : return filterColumn.length === 0 ? 
                items :
                [filterColumn].some(
                    (columns) =>
                        (query.trim() === '') ? 
                            items :
                            row[columns].toString().toLowerCase() === query.toLowerCase()
                )
            case "contains" : return filterColumn.length === 0 ? 
                items :
                [filterColumn].some(
                    (columns) =>
                        row[columns].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
                )
            case "more" : return filterColumn.length === 0 ? 
                    items :
                    [filterColumn].some(
                        (columns) => 
                            row[columns] > query
                )
            case "less" : return filterColumn.length === 0 ?
                    items :
                    [filterColumn].some(
                        (columns) =>
                            (query.trim() === '') ? 
                                items :
                                row[columns] < query
                    )
            default :
                return items
        }
    }
    )
}