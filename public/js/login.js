'use strict';

/* BEGIN - API METHODS */
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
function handleLogin() {
  $('#frmLogin').submit(function () {
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
function handleLoginPostRegistration() {
  if ($('#frmLogin').length > 0) {
    let hashes = getUrlVars();
    if (hashes['msg'] !== undefined && hashes['msg'].length > 0) { writeFlash(1, decodeURIComponent(hashes["msg"])); }
  }
}
/* END - Main Event Callback Functions */
function loadEventWatchers() {
  handleLogin();
  handleLoginPostRegistration();
}

$(loadEventWatchers());
