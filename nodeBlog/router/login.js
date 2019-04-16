/**
 * Created by ziteng016 on 2017/3/23.
 */

const express = require("express"),
    sql = require("../module/mysql"),
    crypto = require("../module/crypto"),
    router = express.Router();

    //登录页面的路由
    router.get("/",(req,res)=>{
        "use strict";
        if(req.cookies['login']){
            res.locals.login = req.cookies['login']['username'];
            //console.log(req.cookies);
            sql('SELECT * FROM article ORDER BY createtime DESC LIMIT 0,10;',[],(err,data)=>{
                if(!err){
                    //console.log(data);
                    res.render("index.ejs",{data:data});
                }
            });
            //res.render("index");
        }else{
            res.render("login");
        }
    });

    router.post("/",(req,res)=>{
        "use strict";
        sql("select * from user where username=?",[req.body.username],(err,data)=>{

            if (data.length<=0){
                res.json({
                    code:9999,
                    message:"查询失败"
                });
            }else{
                //获取浏览器请求的密码
                var password = req.body.password;
                //md5加密
                var newpassword =crypto(password);
                if (data[0].password==newpassword ){
                    // 参数:1.cookie的名称 2.保存的数据 3.过去时间
                    console.log(data);
                    res.cookie('login',{username:req.body.username,uid:data[0]['id']},{maxAge:1000*60*60*24});
                    //session所有后台也么都可以访问到
                    //保存到服务器上
                    //session 在关闭页面的时候 session 保存的所有数据就会清空
                    req.session.admin = data[0]['admin'];
                    res.json({
                        code:"0000",
                        message:"查询成功",
                        data:data,
                        err:err
                    });
                    //res.render('/index',{data:data});
                    return;
                }else if(data[0].admin==0){
                    //0为管理员权限  1.非管理员权限


                }else{
                    res.json({
                        code:"1111",
                        message:"密码错误",
                        data:data,
                        err:err
                    })
                }

            }

        })
    });


module.exports=router;

