/**
 * Created by ziteng016 on 2017/3/30.
 */
    /*
        密码加密模块
        返回值 是一个string类型的密码
        参数类型:(string,key)  原密码; 加密的key值
     */
    const crypto = require("crypto");//引入node原生的加密模块

module.exports = function (str, key) {
    var md5 = crypto.createHash('md5',key);
    //md5加密
    if(key){
        return md5.update(str).digest();
    }
        return md5.update(str).digest('hex');
};



