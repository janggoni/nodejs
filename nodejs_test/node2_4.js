var output = '안녕';
var buffer1 = new Buffer(10);
var len = buffer1.write(output,'utf8');

console.log('버퍼에 쓰인 문자열의 길이:'+ len);
console.log('첫번쨰 버퍼에 쓰인 문자열:'+ buffer1.toString());

console.log('버퍼객체여부:'+  Buffer.isBuffer(buffer1));

var byteLen = Buffer.byteLength(buffer1);
console.log('bytelen:'+ byteLen);

var str1 = buffer1.toString('utf8',0,6);
console.log('str1:'+str1);