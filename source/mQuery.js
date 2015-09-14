/* mQuery - Copyright (c) 2015 rtenshi (MIT) - https://github.com/rtenshi/mQuery/ 
 * Feel free to distribute, use or modify this software. Any isues please post at the GitHub
 */
'use strict';
var media = {
    DB: {},
    timing: 400,
    timerID: '',
    detect: function(){
        return window.getComputedStyle(document.getElementsByTagName('html')[0])['font-family'].replace(/"/g, '').replace(/'/g, '');
    },
    setMedia: function() {
        this.actualMedia = this.detect();
        return this.actualMedia;
    },
    actualMedia: null,
    doAction: function(m, event, reverse) {
        if (typeof media.DB[m] == "undefined") return false;
        var functions = media.DB[m][event];
        if(reverse) functions = functions.reverse();
        return functions.forEach(function(func) {
            func();
        });
    },
    onWindowResize: function() {
        clearTimeout(media.timerID);
        media.timerID = setTimeout(function() {
            var old = media.actualMedia;
            var news = window.getComputedStyle(document.getElementsByTagName('html')[0])['font-family'].replace(/"/g, '').replace(/'/g, '');
            if(media.resizeControl(old, news)) {
                media.doAction(media.detect(), 'u');
            } else {
                media.doAction(old, 'l', true); // do Functions in reverse
                media.setMedia();
                media.doAction(media.actualMedia, 'e');
                media.doAction(media.actualMedia, 'u');
                
            };
        }, media.timing);
        
    },
    resizeControl: function(oldM, newM) {
        if(oldM === newM) {
            return true;
        } else {
            return false;
        }
    }
};

var mQuery = function(view) {
    if(!view) {
        return mQuery.version;
    }
    if (typeof media.DB[view] == 'undefined') media.DB[view] = new mediaObj;
    return media.DB[view];
};
//mQuery.prototype = function() { return true };
function mediaObj() {this.e=[];this.u=[],this.l=[]};


mQuery.version = "1.0.0";
Object.prototype.enter = function(func) {
    if(!func) return this;
    if(typeof func !== 'function') return 'Error: '+func+' is not a Function';
    this.e.push(func);
    return this;
};
Object.prototype.update = function(func) {
    if(!func) return this;
    if(typeof func !== 'function') return 'Error: '+func+' is not a Function';
    this.u.push(func);
    return this;
};
Object.prototype.leave = function(func) {
    if(!func) return this;
    if(typeof func !== 'function') return 'Error: '+func+' is not a Function';
    this.l.push(func);
    return this;
};

// Callers
media.setMedia(); // Detect on Start
window.addEventListener('resize', media.onWindowResize);
window.onload = function() {
    media.setMedia();
    media.doAction(media.actualMedia, 'e');
    media.doAction(media.actualMedia, 'u');
};
