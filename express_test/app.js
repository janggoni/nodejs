var express = require('express');
var http = require('http');

var app = express();

//웹서버 실행될떄 포트를 정한곳
app.set('port', process.env.PORT || 3000);
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 웹서버 실행 :' +app.get('port'));
});