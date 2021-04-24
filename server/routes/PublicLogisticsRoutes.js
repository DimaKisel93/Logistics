module.exports = (app) => {
  const LogisticsController = require('../controllers/logistics-controller');
  const IndexController = require('../controllers/index-controller');
  
  app.route('/').get(IndexController.index)
  app.route('/logistic').get(LogisticsController.getLogistics)
}