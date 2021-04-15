// 미들웨어 사용하기
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-Parser')
var cookieParser = require('cookie-parser');
var expressSession = require('express-session')

var app = express();

//웹서버 실행될떄 포트를 정한곳
app.set('port', process.env.PORT || 3000);
//어디서든지 접근가능한 public 지정
app.use('/public',static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

//세션 적용
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized : true
}));


//라우팅 함수(추가됨)
var router = express.Router();
router.route('/process/products').get(function(req, res){
    console.log('/process/products 라우팅 함수 호출됨');
    
    if(req.session.user){
        res.redirect('/public/product.html');
    }else{
        res.redirect('/public/login2.html');
    }
});

// 세션 이용한 로그인 요청
router.route('/process/login').post(function(req, res){
    console.log('/process/login 라우팅 함수 호출됨');
   var paramId = req.body.id || req.query.id
   var paramPassword = req.body.password||req.query.password;
   console.log('요청파라미터 :' + paramId + ','+ paramPassword);

   if(req.session.user){
    console.log('이미 로그인 되어있습니다.');
    res.redirect('/public/product.html');
   }else{
       req.session.user = {
           id : paramId,
           name:'소녀시대', 
        authorized:true
       };
        res.writeHead(200,{"Content-Type": "text/html;charset=utf-8"});
        res.write("<h1>로그인 성공</h1>");
        res.write("<p>Id : "+paramId+"</p>");
        res.write('<br><br><a href = "/public/product.html"> 상품페이지로 이동하기</a>');
        res.end();
   }
})

// 세션 이용한 로그아웃 요청
router.route('/process/logout').get(function(req, res){
    console.log('/process/login 라우팅 함수 호출됨');

    if(req.session.user){
        console.log('로그아웃');
        
        //세션 로그아웃
        req.session.destroy(function(err){
            if(err){
                console.log('세션삭제시 에러 발생');
                return;
            }
            console.log('세션삭제성공');
            res.redirect('/public/login2.html');
        });
    }else{
        console.log('로그인안되있음');
        res.redirect('/public/login2.html');
    }
});







router.route('/process/setUserCookie').get(function(req, res){
    console.log('/process/setUserCookie 라우팅 함수 호출됨');
    res.cookie('user',{
        id:'mike',
        name:'소녀시대', 
        authorized:true
    });
    res.redirect('/process/showCookie');
})


router.route('/process/showCookie').get(function(req, res){
    console.log('showCookie 라우팅에서 받음');
    res.send(req.cookies);
});



// router.route('/process/login').post(function(req, res){
//     console.log('process로그인 라우팅에서 받음')
//     var paramId = req.body.id||req.query.id;
//     var paramPassword = req.body.password||req.query.password;

//     res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
//     res.write("<h1>서버에서 로그인응답</h1>");
//     res.write("<div><p>"+paramId+"</p></div>");
//     res.write("<div><p>"+paramPassword+"</p></div>");
//     res.end();

// });
app.use('/',router);

// 페이지 에러 처리(추가됨)
app.all('*', function(req, res){
    res.status(404).send('<h1>요청하신 페이지는 없어요</h1>');
})



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

