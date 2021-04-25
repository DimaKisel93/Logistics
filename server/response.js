exports.status =  (values, res) => {

    const data = {
        "status": 200,
    }
    res.status(data.status)
    res.json(values)
    res.end()

}