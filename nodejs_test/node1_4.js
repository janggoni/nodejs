var Calc = require('./node1_3');

var calc1 = new Calc();
    calc1.emit('stop');
console.log('calc에 스탑이벤트 전달함')