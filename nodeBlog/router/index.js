/**
 * Created by ziteng016 on 2017/3/17.
 */
const express = require("express"),
        sql = require("../module/mysql"),
       router = express.Router();

//访问项目名重定向到登录页
router.get("/",(req,res)=>{
    "use strict";
   res.redirect('./login');
});

//博客首页路由
router.get("/index", (req,res)=>{
    //获取用户名:
    if (req.cookies['login']){
        var username = req.cookies['login']['username'];
        res.locals.user=username;
        res.locals.admin=req.session.admin;
        sql('SELECT * FROM article ORDER BY createtime DESC LIMIT 0,10;',[],(err,data)=>{
            if(!err){
                //console.log(data);
                res.render("index.ejs",{data:data});
            }
        });
    }else{
        res.render("login.ejs");
    }
});

//博客文章页面路由
router.get('/article/:id.html',(req,res)=>{
    "use strict";
    //req.params对象获取 :后面的参数   例如:req.params.id
    let id = req.params.id;
    sql('select * from article where id=?',[id],(err,data)=>{
        if(!err){
            if(data.length<=0){
                res.status(404).render('404.ejs');
                return;
            }else{
                //console.log(data);
                console.log(req.cookies['login']['uid']);

                res.render("article.ejs",{data:data});
            }
        }else{
            console.log(err);
        }
    });

});
//提交评论接口
router.post("/article/comment",(req,res)=>{
    "use strict";
    let uid =req.cookies['login']['uid'];//用户id
    let articleid = req.body.articleid;//文章id
    let commentContent =req.body.commentContent;//评论内容
    let commentCreatetime = new Date().toLocaleString();//评论创建的时间
    sql('INSERT INTO comment (uid,articleid,content,createtime) VALUES (?,?,?,?)',[uid,articleid,commentContent,commentCreatetime],
        (err,data)=>{
           if(!err){
               //console.log(data);
               sql('SELECT c.*,u.username FROM `comment`AS c,`user` AS u where articleid=? and uid=?',[articleid,uid],
               (err,data)=>{
                      if(!err){
                          console.log(data);
                          res.json({
                              data:data
                          })
                      } else{
                          console.log(err);
                          res.json({
                              reslut:'数据库失败'
                          })
                      }
                   });
           }else{
               console.log(err);
           }
        });

});


//登录模块
router.use('/login',require('./login'));
//退出模块
router.get('/logout',(req,res)=>{
    "use strict";
    //清除用户的cookie
    res.clearCookie('login');
    //重定向网址
    res.redirect('./login');
})
//注册模块
router.use("/register",require('./register'));
//admin模块
router.use("/admin",require('./admin'));

//use方式 post/get请求方式都可以请求到


module.exports = router;







