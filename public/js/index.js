'use strict';

/* BEGIN - API METHODS */
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
/* END - Main Event Callback Functions */
function loadEventWatchers() {
  handleGetStartedPreload();
  handleGetStarted();
}


$(loadEventWatchers());
