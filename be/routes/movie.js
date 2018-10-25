var express = require('express');
var router = express.Router();//express自带的路由工具
// var fileUpload = require('../middlewares/fileUpload')
var movie_fileUpload = require('../middlewares/movie_fileUpload')
var movie_controller = require('../controllers/movie')

/* GET home page. */
router.get('/list', movie_controller.list)
router.post('/save', movie_fileUpload, movie_controller.save)
// router.get('/remove', movie_controller.remove)
router.get('/listone', movie_controller.listone)
router.post('/update', movie_controller.update)


module.exports = router; 
