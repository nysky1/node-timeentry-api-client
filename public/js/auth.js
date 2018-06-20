'use strict';

let debugUser = {
    firstName: 'Jim',
    lastName: 'Test',
    email: 'aa@aa' + generateRandomSuffix() + '.com',
    username: 'aa@aa' + generateRandomSuffix() + '.com',
    password: 'aa@aa' + generateRandomSuffix() + '.com'
}
let debugAcct = {
    username: 'nysky2',
    password: 'qwertyqwerty'
}

function generateRandomSuffix() {
    return Math.floor(Math.random() * 5000);
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
//$(loadLoginSpotifyEventWatchers());