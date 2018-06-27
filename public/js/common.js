'use strict';
/* END - DEBUG Helpers */
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
let debugActivity = {
    activity: 'Test activity',
    activityDate: "6/21/2018",
    activityDuration: "1"
}
function generateRandomSuffix() {
    return Math.floor(Math.random() * 5000);
}
/* END - DEBUG Helpers */
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};
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
/* LOADER */
function showLoader() {
$('body').removeClass('loaded');
}
function hideLoader() {
    $('body').addClass('loaded');
}
/* LOADER */

/* ERROR LOGGER/CLEAR */
function checkAPI(result) {
    let isAPILiveUp = result === undefined;
    writeError(1, `API may be down, or check your connection.`);
}
function writeError(loc, message) {
    let errorElement = (loc === 1) ? $('.errorDesc') : $('.liError');

    let isAPIUp = message.responseJSON !== undefined;
    let errorMessage = (!isAPIUp) ? 'API is down, check your connection.' : `${message.responseJSON.generalMessage}`;
    if (isAPIUp) {
        errorMessage += (message.responseJSON.messages !== undefined) ? `. ${message.responseJSON.messages[0]}` : '';
    }
    errorElement.html(errorMessage).prop('hidden', false);
}
function writeFlashConfirmation(loc, message, success) {
    let msgElement = (loc === 1) ? $('.errorDesc') : $('.liError');

    if (success) {msgElement.addClass('green');}
    msgElement.html(message).prop('hidden', false);
    setTimeout(function() {msgElement.fadeOut();}, 2000);
}
function writeFlash(loc, message) {
    let msgElement = (loc === 1) ? $('.errorDesc') : $('.liError');

    let isAPIUp = message.responseJSON !== undefined;
    let errorMessage = (!isAPIUp) ? 'API is down, check your connection.' : `${message.responseJSON.generalMessage}`;
    if (isAPIUp) {
        errorMessage += (message.responseJSON.messages !== undefined) ? `. ${message.responseJSON.messages[0]}` : '';
    }

    msgElement.html(errorMessage).prop('hidden', false);
}
function clearError() {
    $('.liError').html('').prop('hidden', true);
}
function scrollUptoError() {
    setTimeout(function () {
        $('.js-results-parent').animate({
            scrollTop: 0
        }, 1000);
    }, 500);
}
/* END ERROR LOGGER/CLEAR */

/* UTILITIES */
function formatISODate(dt) {
    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }
    return dt.getUTCFullYear() + '-' + pad(dt.getUTCMonth() + 1) + '-' + pad(dt.getUTCDate());
}
function formatDateTime(dt) {
    return moment(dt).format("MMM D, YYYY h:mm A");
}
function isValidDate(dateString)
{
    // First check for the pattern
    var regex_date = /^\d{4}\-\d{2,2}\-\d{2,2}$/;

    if(!regex_date.test(dateString))
    {
        return false;
    }

    // Parse the date parts to integers
    var parts   = dateString.split("-");
    var day     = parseInt(parts[2], 10);
    var month   = parseInt(parts[1], 10);
    var year    = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
    {
        return false;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}
function validateActivityDate() {
    if (!isValidDate($('#activityDate').val())) {
      writeFlashConfirmation(1, `Date format should be YYYY-MM-DD.`);
      return false;
    }
    return true;
  }
/* UTILITIES */

/* END VALIDATION */
function dWrite(item) {
    (isDebug) ? console.log(`${item}`) : '';
}