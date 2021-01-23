/**
 * Created by ziteng016 on 2017/3/31.
 */
const express = require("express"),
    sql = require("../module/mysql"),
    crypto = require("../module/crypto"),
router = express.Router();
//get post 任何方式的访问都会走这个路由
router.use((req,res,next)=>{
    "use strict";
    if (req.session.admin==='1'){
        next()
    }else{
        res.send('请用管理员账号登录');
    }
});
router.get("/",(req,res)=>{
    "use strict";
    res.render("./admin/admin.ejs");
});
//查询用户数据  响应模板
router.get('/user',(req,res)=>{
    "use strict";
    sql('select * from user',(err,data)=>{
        if(!err){
           // console.log(data);
            res.render('./admin/user.ejs',{data:data});
        }
    });
});
//删除用户接口

router.post("/delUser",(req,res)=>{
    "use strict";
    sql('delete from user where id=?',[req.body.id],(err,data)=>{
        if (!err){
           sql("select * from user",(err,data)=>{
               if (!err){
                   res.json({
                       data:data
                   });
               }
           })
        }
    })
});

//修改用户跳转路由  查询修改信息
router.get("/updateUser",(req,res)=>{
    "use strict";
    sql('select * from user where id=?',[req.query.id],(err,data)=>{
       if (!err){
           //console.log(data);
           res.render("./admin/updateUser.ejs",{data:data});
       }else{
           console.log(err);
       }
    });
});
//提交修改用户信息 接口  请求方式:post
router.post("/updateUser", (req, res)=> {
    "use strict";
    //获取前台传递过来的req参数
    let username = req.body.username;//用户名
    let admin = req.body.admin;//用户权限(0:普通用户;1:系统管理员)
    let nicknane = req.body.nicknane;//昵称
    let email = req.body.email;//邮箱
    let password = req.body.password;//密码
    let newpwd = crypto(password);//加密后的密码
    let id = req.body.id;//id
    let updatesql ="";//sql语句
    let queryArr=[];
    if (username =="") {
        updatesql='update user set admin=?,nicknane=?,email=?,password=? where id=?';
         queryArr=[admin,nicknane,email,newpwd,id];
    }else if(password =="") {
        updatesql='update user set username=?,admin=?,nicknane=?,email=? where id=?';
         queryArr=[username,admin,nicknane,email,id];
    }else{
        updatesql='update user set username=?,admin=?,nicknane=?,email=?,password=? where id=?';
         queryArr = [username, admin, nicknane, email, newpass, id];
    }
    sql(updatesql, queryArr, (err, data)=> {
            if (!err) {
                console.log(data);
                sql('select * from user', (err, data)=> {
                    if (!err) {
                        //console.log(data);
                        res.render("./admin/user.ejs", {data: data});
                    } else {
                        //console.log(err);
                    }
                });
            } else {
                //console.log(err);
            }
        });

});

//文章管理页面的路由
router.get('/article',(req,res)=>{
    "use strict";
   res.render('./admin/uploadArticle.ejs');
});
router.post('/article',(req,res)=>{
    "use strict";
    //文章标题
    let articleTitle =req.body.articleTitle;
    //文章标签
    let articleTag = req.body.articleTag;
    //文章作者
    let articleAuthor = req.body.articleAuthor;
    //文章内容
    let articleContent = req.body.articleContent;
    //创建时间
    let crateTime = new Date().toLocaleString();
    crateTime = crateTime.length==18 ?crateTime.substring(0,15) :crateTime.substring(0,16);
    sql('insert into article (id,title,tag,author,content,createtime) values(0,?,?,?,?,?)',
        [articleTitle,articleTag,articleAuthor,articleContent,crateTime],(err,data)=>{
           // console.log(err);
        });

    // console.log(req.body);

    res.render('./admin/uploadArticle.ejs');



});



module.exports=router;

























