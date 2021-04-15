var person = {};
person.name = '소녀시데';
person['age'] = 20;
person.add = function(a,b){
    return a+b;
}
console.log('더하기결과 : '+person.add(20,20));