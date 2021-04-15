function add(a,b, callback) {
    var result = a+b;
    callback(result);

    var history = function(){
        return a+'+'+b+'=' + result;
    };

    return history;

}

var add_history = add(20,20,function(result){
    console.log('더하기결과 : '+ result);
});
console.log('history의 자료형 : '+ typeof(add_history));
console.log('결과값으로 받은 함수 : '+ add_history());
