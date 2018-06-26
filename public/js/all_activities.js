'use strict';


/* BEGIN - API METHODS */
function getAllUserActivities(userId, token) {
  return $.ajax({
    url: `${API_URL}/api/users`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    dataType: 'json',
    type: 'GET'
  })
}
/* END - API METHODS */

/* BEGIN - DISPLAY RESULTS */
function displayResults(users) {
  let resultsHTML = '';
  let subHeaderHTML = '';
  let errorHTML = '<li class="liError" hidden aria-live="assertive"></li>'
  const replaceHTML = '__TOTAL_HOURS__'
  if (users.length == 0) {
    $('.js-results').html('No users found!');
    return;
  }

  for (let i = 0; i < users.length; i++) {
  let totalHours = 0; 
    resultsHTML += `<li class='js-panel-list-wrapper-all-users'>${users[i].firstName} ${users[i].lastName}<div class="divHoursTotal">__TOTAL_HOURS__ Hour(s)</div></li>`;
    if (users[i].activities.length == 0) {
      resultsHTML += `<p class='js-panel-item'>No activities</p>`
    }
    for (let j = 0; j < users[i].activities.length; j++) {
      resultsHTML += `
      <div class='js-panel-item'>
      <div class='eventDate'>${users[i].activities[j].activityDate}</div>
      <div class="eventNameSpacer">&nbsp;</div>
      <div class="eventHours">${users[i].activities[j].activityDuration} hour(s)</div>
      <div class="eventName">${users[i].activities[j].activity}</div>
      </div>`
      totalHours += +users[i].activities[j].activityDuration;
    }
    resultsHTML = resultsHTML.replace('__TOTAL_HOURS__',totalHours);
    resultsHTML += '</li>'

  }
  $('.js-results').html(subHeaderHTML + errorHTML).append(resultsHTML).append('<div class="spacer"></div>');

}
/* END - DISPLAY RESULTS */

/* END - Main Event Callback Functions */
function loadAllUserActivities() {
  $.when(getUser())
    .done(function (user) {
      const token = sessionStorage.getItem('token');
      let userId = user._id;
      $.when(getAllUserActivities(userId, token))
        .done(function (users) {
          displayResults(users);
        })
        .fail(function (result) {
          writeFlash(1, `Oops, failed locating all user activities - ${result.statusText} (${result.status})!`);
          dWrite(result.statusText);
        });
    })
    .fail(function (result) {
      writeFlash(1, `Oops, locating all user failed - ${result.statusText} (${result.status})!`);
      dWrite(result.statusText);
    });
}

$(loadAllUserActivities());
