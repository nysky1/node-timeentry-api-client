'use strict';

/* BEGIN - API METHODS */

function registerUser(user) {
  dWrite('Beginning quickstart');

  let request = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    password: user.password
  };

  return $.ajax({
    url: `${API_URL}/api/users`,
    data: request,
    dataType: 'json',
    type: 'POST'
  });
}
function loginUser(user) {
  dWrite('Beginning Login');

  let request = {
    username: user.username,
    password: user.password
  };

  return $.ajax({
    url: `${API_URL}/api/login`,
    data: request,
    dataType: 'json',
    type: 'POST'
  });
}
/* END - API METHODS */

function handleGetStartedPreload() {
  $('#frmQuickStart #email').focus();
}
function handleGetStarted() {
  $('.btnGetStarted').click(function () {
    event.preventDefault();
    let email = $('#email').val();
    window.location.href = '/register' + '#email=' + email;
  })
}
function handleRegisterPreload() {
  let hashes = getUrlVars();
  $('#frmSignUp #email').val(hashes["email"]);
  $('#frmSignUp #firstName').focus();
}
function handleRegister() {
  $('.btnRegister').click(function () {
    event.preventDefault();

    let newUser = (isDebug) ? debugUser : {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      email: $('#email').val(),
      username: $('#username').val(),
      password: $('#password').val()
    }

    $.when(
      registerUser(newUser)
    )
      .done(function (results) {
        window.location.href = '/login#msg=Profile created, now you can login.'
      })
      .fail(function (result) {
        writeError(1, result);
        dWrite(result.statusText);
      });

  });
}
function handleLoginPostRegistration() {
  if ($('#frmLogin').length >0) {
    let hashes = getUrlVars();
    if (hashes['msg'].length > 0) { writeFlash(1, decodeURIComponent(hashes["msg"])); }
  }
}
function handleLogin() {
  $('.btnLogin').click(function () {
    event.preventDefault();
    let user = (isDebug) ? debugAcct : {
      username: $('#username').val(),
      password: $('#password').val()
    }
    $.when(
      loginUser(user)
    )
      .done(function (results) {
        sessionStorage.setItem('token', results.token);
        window.location.href = "/dashboard";
      })
      .fail(function (result) {
        writeError(1, result);
        dWrite(result.statusText);
      });

  })
}
/* END - Main Event Callback Functions */
function loadEventWatchers() {
  handleGetStartedPreload();
  handleGetStarted();
  handleRegisterPreload();
  handleRegister();
  handleLogin();
  handleLoginPostRegistration();
}
/* ERROR LOGGER/CLEAR */
function checkAPI(result) {
  let isAPILiveUp = result === undefined;
  writeError(1, `API may be down, or check your connection.`);
}
function writeError(loc, message) {
  let errorElement = (loc === 1) ? $('.errorDesc') : $('.liError');

  let isAPIUp = message.responseJSON !== undefined;
  let errorMessage = (!isAPIUp) ? 'API is down, check your connection.' : `${message.responseJSON.generalMessage}`;
  errorMessage += (message.responseJSON.messages !== undefined) ? `. ${message.responseJSON.messages[0]}` : '';

  errorElement.html(errorMessage).prop('hidden', false);
}
function writeFlash(loc, message) {
  let msgElement = (loc === 1) ? $('.errorDesc') : $('.liError');

  msgElement.html(message).prop('hidden', false);
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
/* UTILITIES */

/* END VALIDATION */
function dWrite(item) {
  (isDebug) ? console.log(`${item}`) : '';
}

$(loadEventWatchers());
