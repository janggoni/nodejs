var express = require('express');
var http = require('http');

var app = express();

//웹서버 실행될떄 포트를 정한곳
app.set('port', process.env.PORT || 3000);

//미들웨어 등록
app.use(function(req, res, next) {
    console.log('첫번쨰 미들웨어 호출됨');
    // res.writeHead(200,{"Content-Type": 'text/html;charset=utf-8'});
    // res.end('<h1>서버에 응답한 결과입니다.</h1>');
    //리다이렉트 해줄수있음
    res.redirect('http://google.co.kr');
});




var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 웹서버 실행 :' +app.get('port'));
});