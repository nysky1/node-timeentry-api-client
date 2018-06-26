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
function handlePrelogin() {
  showLoader();
  const token = sessionStorage.getItem('token');
    dWrite('Checking existing login...');
    if (!token) {
        dWrite('No token..."')
        hideLoader();
    } else {
        return $.ajax({
            url: `${API_URL}/api/loginValidate`,
            type: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            success: (response) => {
                dWrite('Returned user');
                const payloadData = parseJwt(token);
                window.location.href = '/dashboard';
            },
            error: () => {
              hideLoader();
                dWrite('Unauthorized (N)');
            }
        })
    }
}

function handleLogin() {
  $('#frmLogin').submit(function () {
    event.preventDefault();
    let user = {
      username: $('#username').val(),
      password: $('#password').val()
    }
    showLoader();
    $.when(
      loginUser(user)
    )
      .done(function (results) {
        sessionStorage.setItem('token', results.token);
        window.location.href = "/dashboard";
      })
      .fail(function (result) {
        hideLoader();
        writeError(1, result);
        dWrite(result.statusText);
      });

  })
}
function handleLoginPostRegistration() {
  if ($('#frmLogin').length > 0) {
    let hashes = getUrlVars();
    if (hashes['msg'] !== undefined && hashes['msg'].length > 0) { writeFlashConfirmation(1, decodeURIComponent(hashes["msg"]),true); }
  }
}
/* END - Main Event Callback Functions */
function loadEventWatchers() {
  handlePrelogin();
  handleLogin();
  handleLoginPostRegistration();
}

$(loadEventWatchers());
