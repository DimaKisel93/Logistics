module.exports = (app) => {
  const ShipmentsController = require('../controllers/shipments-controller');
  const IndexController = require('../controllers/index-controller');
  
  app.route('/').get(IndexController.index)
  app.route('/shipments').get(ShipmentsController.getShipments)
}