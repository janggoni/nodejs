//웹 서버 만들기
 var http = require('http');
 var fs = require('fs');
 var server = http.createServer();

 var host = '172.24.200.182'; 
 var port = 3000;
 server.listen(port, host, 50000, function() {
     console.log('웹서버가 실행되었다.' + host + ':'+ port);
 });

// 이벤트 리스너
 server.on('connection',function(socket){
    console.log('클라이언트가 접속');
 });
 server.on('request', function(req, res){
    console.log('클라이언트 요청이 들어왔다.');
    //console.dir(req);
    var filename = 'house.png';
    fs.readFile(filename, function(err,data){
        // res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
        // res.write('<h1>웹서버로부터 받은응답</h1>');
        res.writeHead(200, {"Content-Type" : "image/png"});
        res.write(data);
        res.end();

    });
})