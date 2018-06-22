'use strict';


/* BEGIN - API METHODS */
function getUserActivities(userId, token) {
  return $.ajax({
    url: `${API_URL}/api/users/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    dataType: 'json',
    type: 'GET'
  })
}
/* END - API METHODS */

/* BEGIN - DISPLAY RESULTS */
function displayResults(activities) {
  let resultsHTML = '';
  let subHeaderHTML = '';
  let errorHTML = '<li class="liError" hidden aria-live="assertive"></li>'
  
  for (let i = 0; i < activities.length; i++) {
    resultsHTML += `<a href="/activity_edit#id=${activities[i]._id}"><li class='js-panel-list-wrapper' aria-activity='${activities[i].activity}' role="button" >
    <div class="editButton"><button class="btnSmall btnStandard">Modify</button></div>
    <div class='eventDate'>${activities[i].activityDate}</div>
    <div class="eventNameSpacer">&nbsp;</div>
    <div class="eventHours">${activities[i].activityDuration} hour(s)</div>
    <div class="eventName">${activities[i].activity}</div>
    
    
    </li></a>`;
  }
  $('.js-results').html(subHeaderHTML + errorHTML ).append(resultsHTML).append('<div class="spacer"></div>');

}
/* END - DISPLAY RESULTS */

/* END - Main Event Callback Functions */
function loadUserActivities() {
  $.when(getUser())
    .done(function (user) {
      const token = sessionStorage.getItem('token');
      let userId = user._id;
      $.when(getUserActivities(userId, token))
        .done(function (activities) {
          displayResults(activities.activities);
        })
        .fail(function (result) {
          writeFlash(1, `Oops, locating the user activities - ${result.statusText} (${result.status})!`);
          dWrite(result.statusText);
        });
    })
    .fail(function (result) {
      writeFlash(1, `Oops, locating the user failed - ${result.statusText} (${result.status})!`);
      dWrite(result.statusText);
    });
}

$(loadUserActivities());
