/**
 * Created by ziteng016 on 2017/3/23.
 */
const express = require("express"),//引入express框架
    router = express.Router(),//路由模块
    sql =require("../module/mysql"),//数据库连接模块
    crypto = require("../module/crypto");//引入自定义加密模块

//登录页面路由跳转
router.get('/',(req,res)=>{
    "use strict";
    res.render("register");
});

router.post("/",(req,res)=>{
    "use strict";
    sql("select * from user where username=?",[req.body.username],(err,data)=>{
        if (!err){
            if (data.length>0){
                console.log("不可注册");
                res.render("error",{result:"用户已存在"});
                return;
            }else{
                console.log("可以注册");
                var password = req.body.password;
               //引入加密模块
                //新生成的密码
                var newpassword = crypto(password);

                sql("insert into user (username,password,admin) values(?,?,?)",[req.body.username,newpassword,'1'],(err,data)=>{
                    if (!err){

                        res.locals.result='添加成功';
                        res.render("register");
                        return;
                    }else{
                        res.locals.result='添加失败';
                        res.render("register");
                        return;

                    }

                })

            }
        }


    })
});






module.exports = router;




