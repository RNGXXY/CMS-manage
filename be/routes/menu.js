
var express = require('express');
var router = express.Router();

var menu_controller = require('../controllers/menu')
var logo_fileUpload = require('../middlewares/logo_fileUpload')

router.get('/listPage', menu_controller.listPage)
router.get('/listall', menu_controller.listall)
router.get('/listone', menu_controller.listone)
router.post('/listByShop', menu_controller.listByShop)
router.post('/addData', logo_fileUpload , menu_controller.addData)
router.post('/update',  logo_fileUpload , menu_controller.update)
router.delete('/remove',  menu_controller.remove)


module.exports = router