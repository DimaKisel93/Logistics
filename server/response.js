exports.status =  (res, rows, numberPages, numberPerPage) => {

    const data = {
        "status": 200,
        "numberPages": numberPages,
        "numberPerPage": numberPerPage,
        "shipments": [...rows]
    }
    res.json(data)
    res.end()

}