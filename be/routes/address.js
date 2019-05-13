
var express = require('express');
var router = express.Router();

var address_controller = require('../controllers/address')

router.get('/listall', address_controller.listall)
router.post('/listByUser', address_controller.listByUser)
router.post('/addAddress',  address_controller.addAddress)
router.delete('/deleteOne',  address_controller.deleteOne)

module.exports = router