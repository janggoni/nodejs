// 미들웨어 사용하기
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-Parser')

var app = express();

//웹서버 실행될떄 포트를 정한곳
app.set('port', process.env.PORT || 3000);
//어디서든지 접근가능한 public 지정
app.use('/public',static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//라우팅 함수(추가됨)
var router = express.Router();

router.route('/process/login').post(function(req, res){
    console.log('process로그인 라우팅에서 받음')
    var paramId = req.body.id||req.query.id;
    var paramPassword = req.body.password||req.query.password;

    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.write("<h1>서버에서 로그인응답</h1>");
    res.write("<div><p>"+paramId+"</p></div>");
    res.write("<div><p>"+paramPassword+"</p></div>");
    res.end();

});

// 페이지 에러 처리(추가됨)
app.all('*', function(req, res){
    res.status(404).send('<h1>요청하신 페이지는 없어요</h1>');
})

app.use('/',router);


//미들웨어 등록
app.use(function(req, res, next) {
    console.log('첫번쨰 미들웨어 호출됨');
    // 헤더에서 유저에이전트정보
    var userAgent = req.header('User-Agent');
    //get방식으로 넘길시
    var paramId = req.body.id||req.query.id;
    res.send('<h3>서버에서응답 user-agent ->: '+userAgent +'</h3> <h3>param name ->'+paramId+'</h3>');
});
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 웹서버 실행 :' +app.get('port'));
});

