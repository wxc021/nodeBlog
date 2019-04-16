/**
 * Created by ziteng016 on 2017/3/16.
 */
const http = require("http"),
    express = require('express'),
    mysql = require("mysql"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    session = require("express-session"),
    sql = require("./module/mysql"),
    app = express();


app.set("views", __dirname + "/views");//配置路由的目录
app.set("view engine", "ejs");//配置是什么模板类型  ejs

app.use(bodyParser.json());//用来接收json数据
app.use(bodyParser.urlencoded({extend: true}));//可以接收任何数据类型的数据
app.use(cookieParser('wxc123'));//设置中间件cookie的秘钥
app.use(session({secret: 'wxc021'}));//设置session秘钥
//use get post
app.use(function (req, res, next) {
    if (req.cookies['login']) {
        res.locals.login = req.cookies['login']['username'];
    }
    if (res.locals.login && req.session.admin==undefined) {
        sql('select * from user where username=?', [req.cookies['login']['username']], (err, data)=> {
            "use strict";
            req.session.admin = data[0].admin;
            //继续往下执行
            next();
        });
    } else {
        next();
    }
});


app.use('/', require('./router/index'));

app.use(express.static(__dirname + "/public"));//设置静态资源目录
http.createServer(app).listen(3000);//启动服务器


