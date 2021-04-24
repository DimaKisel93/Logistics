var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port: '3306',
  user     : 'root',
  password : 'root',
  database: 'logistic'
});

connection.connect((error) =>{
  if(error){
    return console.log('Error')
  }else{
    return console.log('Connect succesful')
  }
});


module.exports = connection