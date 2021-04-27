exports.status =  (res, rows, numPages, numPerPage, numRows) => {

    const data = {
        "status": 200,
        "numPages": numPages,
        "numPerPage": numPerPage,
        "numRows": numRows,
        "rows": [...rows]
    }
    res.json(data)
    res.end()

}