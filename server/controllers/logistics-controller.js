const response = require('../response')
const db = require('./../db/db')

exports.getLogistics = async (req, res, next) => {

    let page = parseInt(req.query.page, 10) || 0;
    let numPerPage = 4;
    let skip = (page-1) * numPerPage; 
    let limit = skip + ',' + numPerPage;

    db.query('SELECT count(*) as numRows FROM logistic',function (err, rows, fields) {
        if(err) {
            response.status(err, null);
        }else{
            let numRows = rows[0].numRows;
            let numPages = Math.ceil(numRows / numPerPage);
            db.query('SELECT * FROM logistic LIMIT ' + limit,function (err, rows, fields) {
                if(err) {
                    response.status(err, null);
                }else{
                    response.status(res, rows, numPages, numPerPage, numRows);
                }
            });            
        }
    });

};
