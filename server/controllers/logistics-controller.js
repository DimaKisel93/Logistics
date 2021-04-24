const response = require('../response')
const db = require('./../db/db')


exports.getLogistics = async (req, res, next) => {

    db.query('SELECT * FROM `logistic`', (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            response.status(rows, res)
        }
    })

};