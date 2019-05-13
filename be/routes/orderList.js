
var express = require('express');
var router = express.Router();

var orderList_controller = require('../controllers/orderList')

router.get('/listPage', orderList_controller.listPage)
router.get('/listall', orderList_controller.listall)
router.post('/listByUser', orderList_controller.listByUser)
router.post('/addData',  orderList_controller.addData)
router.post('/update',  orderList_controller.update)
router.delete('/remove',  orderList_controller.remove)

module.exports = router