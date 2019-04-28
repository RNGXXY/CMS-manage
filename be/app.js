var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 解析cookie
var logger = require('morgan');
// var session = require('express-session')

var { version } = require('./config')//加上版本号的

// 路由工具，在routes模块，express框架自带的路由工具
var positionRouter = require('./routes/position');
var singerRouter = require("./routes/singer");
var movieRouter = require("./routes/movie");
var usersRouter = require("./routes/users");
//登录
var adminRouter = require("./routes/admin");
//用户
var userRouter = require('./routes/user');
var userListRouter = require('./routes/userList');
// 菜单管理
var menuRouter = require('./routes/menu');


// 应用程序
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用session中间件，配饰session
// app.use(session({
//   secret: 'keyboard cat',   //相当于只有服务器知道的密钥
//   resave: false,            //重新保存
//   saveUninitialized: true,
//   //httpOnly:只是http，maxAge时间，单位ms
//   cookie: {  httpOnly: false, secure: false, maxAge: 1000 * 60 * 5 }  
// }))


// 使用各种中间件
app.use(logger('dev'));
// body-parser 处理form-data和request payload数据
// express 4.X 内部集成了body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());// 解析cookie

// 静态资源处理
app.use(express.static(path.join(__dirname, 'public')));

// 启用路由工具
app.use('/api/'+ version +'/position', positionRouter);
app.use("/api/"+version+"/singer",singerRouter);
app.use('/api/'+ version +'/movie', movieRouter);
app.use('/api/'+ version +'/user', userRouter);

//注册路由
app.use('/api/'+ version +'/admin', adminRouter);
app.use('/api/'+ version +'/userList', userListRouter);
app.use('/api/'+ version +'/menu', menuRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
