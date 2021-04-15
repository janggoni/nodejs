// 파일 시스템 (파일을 다읽을때까지 대기)
var fs = require('fs');

var data = fs.readFileSync('.././package.json','utf8');

console.log(data);

// 파일시스템(비동기방식)
var fs = require('fs');

fs.readFile('.././package.json','utf8', function(err, data){
  console.log(data);  
});
