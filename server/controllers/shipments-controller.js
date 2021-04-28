const response = require('../response')
const db = require('../db/db')

exports.getShipments = async (req, res, next) => {

    let page = parseInt(req.query.page, 10) || 0;
    let numberPerPage = 4;
    let skip = (page-1) * numberPerPage; 
    let limit = skip + ',' + numberPerPage;

    db.query('SELECT count(*) as numRows FROM shipments',function (err, shipments, fields) {
        if(err) {
            response.status(err, null);
        }else{
            let numberAllShipments = shipments[0].numRows;
            let numberPages = Math.ceil(numberAllShipments / numberPerPage);
            db.query('SELECT * FROM shipments LIMIT ' + limit,function (err, shipments, fields) {
                if(err) {
                    response.status(err, null);
                }else{
                    response.status(res, shipments, numberPages, numberPerPage);
                }
            });            
        }
    });

};
