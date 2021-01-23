var express = require('express');
var router = express.Router();
var sqlLeft = require('../module/mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/UTRY/getLogin', function(req, res, next) {
  sqlLeft('select password from user where username=?',[req.body.username],function (err, data) {
    console.log(data);
    
    if(data.length > 0 && req.body.password === data[0].password){
      res.json({
        code:'200',
        data:'登陆成功'
      })
    }else if(data.length === 0){
      res.json({
        code:'100',
        data:'该用户不存在'
      })
    }else{
      res.json({
        code:'100',
        data:'密码不正确'
      })
    }



    
  });
});

module.exports = router;
