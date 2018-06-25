'use strict';

/* END - API METHODS */
function handleDashboardView() {
  $.when(getUser())
    .done(function (user) {
      if (user.role === 'admin') {
        $('.fldAdmin').prop('hidden', false);
      }
    })
    .fail(function (result) {
      writeFlash(1, `Oops, locating the user failed - ${result.statusText} (${result.status})!`);
      dWrite(result.statusText);
    });
    dWrite('Loading dashboard');
}
/* END - Main Event Callback Functions */
function loadEventWatchers() {
  handleDashboardView()
}


$(loadEventWatchers());
