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
function handleDashboardView() {
  if ($('#frmDashboard').length > 0) {
    checkUser();
  }
}
function handleUserActivitiesView() {
  if ($('#userActivities').length > 0) {
    checkUser();
  }
}
function handleNewActivityView() {
  if ($('#userActivityNew').length > 0) {
    checkUser();
  }
}
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
  if ($('#frmSignUp').length > 0) {
    let hashes = getUrlVars();
    $('#frmSignUp #email').val(hashes["email"]);
    $('#frmSignUp #firstName').focus();
  }
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
  if ($('#frmLogin').length > 0) {
    let hashes = getUrlVars();
    if (hashes['msg'] !== undefined && hashes['msg'].length > 0) { writeFlash(1, decodeURIComponent(hashes["msg"])); }
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
  handleDashboardView()
  handleUserActivitiesView();
  handleNewActivityView();
}


$(loadEventWatchers());
