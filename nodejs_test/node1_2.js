// process.on('exit', function() {
//     console.log('exit이벤트 발생');
// });

// setTimeout(function() {
//     console.log('2초후에 실행되었음');
//     process.exit();
// }, 2000);

// console.log('2초후에 실행될것임');

process.on('tick', function(count) {
    console.log('tick 이벤트 발생함 : ' + count);
})

setTimeout(function() {
    console.log('emit2초후에 실행되었음');
    process.emit('tick','2');
}, 2000);

