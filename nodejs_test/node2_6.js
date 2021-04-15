// log파일 만들기(경로문제 수정해야함...)

var winston = require('winston');
var winstonDaily = require('winston-daily-rotate-file');
// 날짜시간
var moment = require('moment');

function timeStampFormat(){
    return moment().format('yyyy-mm-dd HH:mm:ss.sss zz');
}

var logger = new(winston.Logger)({
    transport: [
        new(winstonDaily)({
            name : 'info-file', 
            filename : './log/server',
            datePattern : '_yyyy-mm-dd.log', 
            colorize : false,
            maxsize : 5000000,
            maxFiles : 1000,
            level : 'info',
            json:false,
            timestamp : timeStampFormat
        }),
        new(winston.transport.Console)({
            name : 'debug-console',
            colorize : true,
            level : 'debug',
            showLevel :true,
            json : false,
            timestamp : timeStampFormat
        })
    ]

});

logger.debug('디버그메세지입니다.');
logger.error('에러메세지입니다.');