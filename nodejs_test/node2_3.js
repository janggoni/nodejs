// 파일 쓰기 

var fs = require('fs');

fs.open('.././output.txt','w', function(err, fd){
    if(err){
        console.log('파일 오픈시 에러발생');
        console.dir(err);
        return;
    }
    var buf = new Buffer('안녕!\n');
    fs.write(fd,buf, 0, buf.length, null, function(err, written, buffer){
        if(err){
            console.log('파일쓰기시 에러발생')
            console.dir(err);
            return;
        }
        console.log('파일쓰기 완료함');
        fs.close(fd, function(){
            console.log('파일닫기 완료함');
        });
    });
});