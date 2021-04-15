var fs = require('fs');

fs.writeFile('.././output.txt','hello', function(err){
    if(err){
        console.log('에러발생');
        console.dir(err);
        return;
    }
    console.log('output.txt 파일 데이터 쓰기 완료함')
});