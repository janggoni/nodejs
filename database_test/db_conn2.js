//---db 사용자 추가기능-------- /

// 미들웨어 사용하기
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-Parser')
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
//에러처리
var expressErrorHandler = require('express-error-handler');

//몽고디비 연결
var MongoClient = require('mongodb').MongoClient;

var database;

function connectDB(){
    var databaseUrl = 'mongodb://localhost:27017/local';
    MongoClient.connect(databaseUrl,{ 
        useNewUrlParser:true,
        useUnifiedTopology:true}, function(err, client){
        if(err){
            console.log('데이터베이스 연결시 에러발생');
            return;
        }
        console.log('데이터베이스에연결됨 : '+ databaseUrl);
        database = client.db("local");
    })
}


var app = express();

//웹서버 실행될떄 포트를 정한곳
app.set('port', process.env.PORT || 3000);

//어디서든지 접근가능한 public 지정
app.use('/public',static(path.join(__dirname, 'public')));

//파일 업로드 지정
app.use('/uploads', static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

//세션 적용
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized : true
}));


var router = express.Router();

router.route('/process/login').post(function(req, res){
    console.log('./process/login 라우팅 함수 요청됨');

     var paramId = req.body.id || req.query.id;
     var paramPassword = req.body.password || req.query.password;
     console.log('요청파라미터 :'+paramId+'요청패스워드 : '+paramPassword);

     if(database){
         authUser(database, paramId, paramPassword, function(err, docs){
             if(err){
                 console.log('에러발생');
                 res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
                 res.write('<h1>에러발생</h1>');
                 res.end();
                 return;
             }
             if(docs){
                 console.dir(docs);

                 res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
                 res.write('<h1>사용자 로그인 성공</h1>');
                 res.write('<div><p>사용자: '+ docs[0].name+ '<p></div>');
                 res.write('<br><br><a href="/public/login.html">다시 로그인 바람</a>');
                 res.end();
                 return;
                 
             }else{
                console.log('에러발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
                res.write('<h1>사용자 데이터 조회안됨.</h1>');
                res.end();
             }
         });
     }else{
        console.log('에러발생');
        res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        res.write('<h1>데이터베이스 연결안됨.</h1>');
        res.end();
     }


});

router.route('/process/adduser').post(function(req, res) {
    console.log('/process/adduser 라우팅 함수 호출됨' );

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    console.log('요청파라미터 :' + paramId + ','+ paramPassword+','+paramName);

    if(database){
        addUser(database,paramId, paramName, paramPassword, function(err, result){
            if(err){
                console.log('에러발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
                res.write('<h1>에러발생</h1>');
                res.end();
                return;
            }
            if(result){
                console.dir(result);

                res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
                res.write('<h1>사용자 추가 성공</h1>');
                res.write('<div><p>사용자: '+paramName+ '<p></div>');
                res.write('<br><br><a href="/public/login.html">다시 로그인 바람</a>');
                res.end();
            }else{
                console.log('에러발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
                res.write('<h1>사용자 데이터 조회안됨.</h1>');
                res.end();
             }
        });
    }
})


app.use('/',router);

var authUser= function(db, id, password, callback) {
    console.log('authuser 호출됨');
    var users = db.collection('user');
    users.find({"id":id, "password":password}).toArray(function(err,docs){
        if (err){
            callback(err, null);
            return;
        }
        if(docs.length > 0){
            console.log('일치하는 사용자를 찾음');
            callback(null,docs);
        }else{
            console.log('일치하는 사용자를 찾지 못함');
            callback(null,null);
        }
    })
}

var addUser = function(db, id, password, name, callback){
    console.log('addUser 호출됨: '+ id +','+ password+','+ name);

    var users = db.collection('user');
    users.insertMany([{"id":id, "password":password, "name":name,}],
    function(err, result){
        if(err){
            callback(err, null);
            return;
        }
        if(result.insertedCount > 0){
            console.log('사용자 추가됨: '+ result.insertedCount);
            callback(null, result);
        }else{
            console.log('추가된 레코드가 없음');
            callback(null, null);
        }
    });  
};
// 404 에러페이지 처리
var errorHandler = expressErrorHandler({
    static : {
     '404' : 'public/404.html'   
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// // 페이지 에러 처리(추가됨)
// app.all('*', function(req, res){
//     res.status(404).send('<h1>요청하신 페이지는 없어요</h1>');
// })



// //미들웨어 등록
// app.use(function(req, res, next) {
//     console.log('첫번쨰 미들웨어 호출됨');
//     // 헤더에서 유저에이전트정보
//     var userAgent = req.header('User-Agent');
//     //get방식으로 넘길시
//     var paramId = req.body.id||req.query.id;
//     res.send('<h3>서버에서응답 user-agent ->: '+userAgent +'</h3> <h3>param name ->'+paramId+'</h3>');
// });
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 웹서버 실행 :' +app.get('port'));

    connectDB();
});

