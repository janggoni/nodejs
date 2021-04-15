const url = require('url');
var urlStr = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=notebook';

var curUrl = url.parse(urlStr);
console.dir(curUrl);

var curStr = url.format(curUrl);
console.log('url->' + curStr);

var queryString = require('querystring');
var params = queryString.parse(curUrl.query);
console.log(queryString);
console.log('param->' + params.query);