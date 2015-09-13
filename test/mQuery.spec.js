"use strict";

QUnit.module("mQuery Passive Functions");
QUnit.test("mQuery build:", function(asset) {
    asset.notEqual(typeof mQuery, 'undefined', 'mQuery is defined');
    asset.notEqual(typeof media, 'undefined', 'media is defined');
    asset.notEqual(typeof mediaObj, 'undefined', 'media Object is defined');
});

QUnit.test('mQuery base function', function(asset){
    asset.equal(mQuery(), mQuery.version, 'if the view is empty.');
    asset.equal(typeof mQuery('size-xs'), 'object', 'if the view is not empty.');
    asset.equal(typeof mQuery('size-xs').e, 'object', 'enter method exists.');
    asset.equal(typeof mQuery('size-xs').u, 'object', 'update method exists.');
    asset.equal(typeof mQuery('size-xs').l, 'object', 'leave method exists.');
    asset.equal(mQuery('size-xs'), media.DB['size-xs'], 'mQuery returns mediaDB.')
});
QUnit.test('Detect functions',function(asset){
    asset.equal(media.actualMedia, window.getComputedStyle(document.getElementsByTagName('html')[0])['font-family'].replace(/"/g, '').replace(/'/g, ''), 'Actual Media is updated to actual media');
    asset.equal(typeof media.detect, 'function', 'Detect function exists.');
    //asset.equal(media.detect(), window.getComputedStyle(document.getElementsByTagName('html')[0])['font-family'], 'Detects the actual media Query on HTML\'s font-family');
    
});

QUnit.module("mQuery Active Functions");
QUnit.test('Do functions',function(asset){
    asset.equal(typeof media.doAction, 'function', 'doAction function exists.');    
});
QUnit.test('Prototype functions', function(asset){
    asset.equal(typeof mQuery('size-xs').enter, 'function', 'Enter prototype function exists.');    
    
    asset.equal(mQuery('size-xs').enter(), media.DB['size-xs'], 'Fallback if enter is empty');
    asset.equal(mQuery('size-xs').update(), media.DB['size-xs'], 'Fallback if update is empty');
    asset.equal(mQuery('size-xs').leave(), media.DB['size-xs'], 'Fallback if update is empty');
    
    asset.equal(mQuery('size-xs').enter('abc'), 'Error: abc is not a Function' ,'Fallback if in enter callback is not a function');
    asset.equal(mQuery('size-xs').update('abc'), 'Error: abc is not a Function' ,'Fallback if in update callback is not a function');
    asset.equal(mQuery('size-xs').leave('abc'), 'Error: abc is not a Function' ,'Fallback if in leave callback is not a function');
    
    var abc = 102;
    asset.equal(mQuery('size-xs').enter(abc), 'Error: 102 is not a Function' ,'Fallback if callback is not a function');
    asset.equal(mQuery('size-xs').update(abc), 'Error: 102 is not a Function' ,'Fallback if callback is not a function');
    asset.equal(mQuery('size-xs').leave(abc), 'Error: 102 is not a Function' ,'Fallback if callback is not a function');
    
    var initEnter = mQuery('size-xs').e.length; // get actual Length
    var initUpdate = mQuery('size-xs').u.length; // get actual Length
    var initLeave = mQuery('size-xs').l.length; // get actual Length
    
    var abc1 = function() { console.log('enter')};
    var abc2 = function() { console.log('update')};
    var abc3 = function() { console.log('leave')};
    asset.equal(mQuery('size-xs').enter(abc1), media.DB['size-xs'] ,'If callback is a function');
    asset.equal(mQuery('size-xs').update(abc2), media.DB['size-xs'] ,'If callback is a function');
    asset.equal(mQuery('size-xs').leave(abc3), media.DB['size-xs'] ,'If callback is a function');
    
    asset.equal(mQuery('size-xs').e.length, initEnter + 1 ,'Function is added to the cache');
    asset.equal(mQuery('size-xs').u.length, initUpdate + 1 ,'Function is added to the cache');
    asset.equal(mQuery('size-xs').l.length, initLeave + 1 ,'Function is added to the cache');
});
QUnit.test('Resize Functions',function(asset){
    asset.notEqual(typeof media.onWindowResize, "undefined", "Resize Functions exists");
    asset.ok(media.resizeControl(mQuery('size-xs'), mQuery('size-xs')), 'Chck if the the media is the same');
    asset.notOk(media.resizeControl(mQuery('size-xs'), mQuery('lg')), 'Chck if the the media is NOT the same');
    var done1 = asset.async();
    var done2 = asset.async();
    mQuery('size-xs')
        .enter(function() { asset.ok(true, "enter function was trigged"); console.log('entered'); return done1(); })
        .leave(function() { asset.ok(true, "leave function was trigged"); console.log('left'); return done2(); })
        .update(function() { console.log('up!'); });
});
