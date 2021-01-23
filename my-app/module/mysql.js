/**
 * Created by ziteng016 on 2017/3/17.
 */

const mysql = require("mysql");

   module.exports = function(sql,value,callback){
    const config =  mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"test"
    });
    config.connect();
     if (value){
         config.query(sql,value,callback);
     }else{
         config.query(sql,callback);
     }
    config.end();
}



