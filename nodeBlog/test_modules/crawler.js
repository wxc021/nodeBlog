/**
 * Created by ziteng016 on 2017/4/7.
 * 爬虫模块测试
 */
 const http = require('http'),
    https= require('https');

 let html = '';
http.get('http://car.jd.com/?ccode=2601', function (res) {
    res.on('data', function (data) {
        html+=data;
        //console.log(data);
    });
    res.on('end', function (data) {
        html+=data;
        console.log(html);
    });
})
