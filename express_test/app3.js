// 미들웨어 여러개 만들어 보기
var express = require('express');
var http = require('http');

var app = express();

//웹서버 실행될떄 포트를 정한곳
app.set('port', process.env.PORT || 3000);

//미들웨어 등록
app.use(function(req, res, next) {
    console.log('첫번쨰 미들웨어 호출됨');

    req.user = 'mike';
    //다음 미들웨어로 넘김
    next();

});


app.use(function(req, res, next) {
    console.log('두번쨰미들웨어 호출');
    var person ={name:'소녀시대', age:20};
    var personStr = JSON.stringify(person);
    //res.send(personStr);

    res.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
    res.write(personStr);
    res.end();
    // res.writeHead(200,{"Content-Type": 'text/html;charset=utf-8'});
    // res.end('<h1>서버에 응답한 결과입니다:'+req.user+'</h1>');
    // == res.send('<h1>서버에 응답한 결과입니다:'+req.user+'</h1>');
})

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 웹서버 실행 :' +app.get('port'));
});