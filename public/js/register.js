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

/* END - API METHODS */
function handleRegisterPreload() {
    let hashes = getUrlVars();
    $('#frmSignUp #email').val(hashes["email"]);
    $('#frmSignUp #firstName').focus();
  
    if (isDebug) {
      $('#frmSignUp input').each( (index,item) => {
        $(item).removeAttr('required');
      })
    }
    
}
function handleRegister() {
  $('#frmSignUp').submit(function () {
    event.preventDefault();
    let newUser = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      email: $('#email').val(),
      username: $('#username').val(),
      password: $('#password').val()
    }
    showLoader();
    $.when(
      registerUser(newUser)
    )
      .done(function (results) {
        window.location.href = '/login#msg=Profile created, now you can login.'
      })
      .fail(function (result) {
        hideLoader();
        writeFlash(1, result);
        dWrite(result.statusText);
      });

  });
}
/* END - Main Event Callback Functions */
function loadEventWatchers() {
  handleRegisterPreload();
  handleRegister();
}


$(loadEventWatchers());
