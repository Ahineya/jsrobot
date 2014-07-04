var chai = require('chai');

var JSRL = require('../jsrl/jsrl.js');
var j = new JSRL();


describe('3 JSRL', function() {
    describe('3.1 Parsing', function() {

        it('3.1.1 should load jsrl file', function() {
            chai.assert(j.load('jsrl/test.jsrl'), "test jsrl file didn't loaded");
        });

        it('3.1.2 should create JSRL properties', function() {
            chai.assert(j.level.name === 'Test', "name property didn't loaded");
            chai.assert(j.level.description === '<p>Test description</p>', "description property didn't loaded");
            chai.assert(typeof(j.level.map) !== 'undefined', "map property didn't loaded");
            chai.assert(j.level.map.mapfile !== '', "map.mapfile property didn't loaded");
            chai.assert(j.level.map.mapcontent !== '', "map.mapcontent property didn't loaded");
            chai.assert(j.level.map.width === '5', "map.width property didn't loaded");
            chai.assert(j.level.map.height === '5', "map.height property didn't loaded");
            chai.assert(typeof(j.level.map.mapfunc) !== 'undefined', "map.mapfunc property didn't loaded");
            chai.assert(typeof(j.level.runnerfunc) !== 'undefined', "map.runnerfunc property didn't loaded");
            chai.assert(typeof(j.level.before) !== 'undefined', "map.before property didn't loaded");
            chai.assert( j.level.code.match(/\s*/), "code property didn't loaded");
            chai.assert(typeof(j.level.after) !== 'undefined', "map.after property didn't loaded");
        });

        /*it('3.1.3 should write results', function() {
            chai.assert(j.write(), "results didn't write");
        });*/

    });
});