//var c = require('commander');
var fs = require('fs');
var JSRL = require('./jsrl.js');

var files = fs.readdirSync('./jsrl/');
for (var i=0; i<files.length; i++) {
    if ( (files[i].match(/\.jsrl$/)) && (files[i] !== 'test.jsrl') ) {
        var j = new JSRL();
        j.load('./jsrl/'+files[i]);
        j.write();
    }
}

console.log('\n-----------------------------\nLevels has built succesfully.');