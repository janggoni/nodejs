
// 파일 읽기
var fs = require('fs');

var infile = fs.createReadStream('.././output.txt',{flags:'r'});

infile.on('data',function(data){
    console.log('읽어들인 데이터:' + data);
})

infile.on('data',function(){
    console.log('읽기종료');
})