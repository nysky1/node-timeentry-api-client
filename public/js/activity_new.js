'use strict';


/* BEGIN - API METHODS */

function addActivity(activity) {

  let request = {
    activity: activity.activity,
    activityDate: activity.activityDate,
    activityDuration: activity.activityDuration
  };

  $.when(getUser())
    .done(function (user) {
      const token = sessionStorage.getItem('token');
      request.id = user._id;

      return $.ajax({
        url: `${API_URL}/api/users/${user._id}/activity`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: request,
        dataType: 'json',
        type: 'PUT'
      })
        .done(function (result) {
          window.location.href = "/activities";
          dWrite('Saved activity');
        })
        .fail(function (result) {
          hideLoader();
          writeFlash(1, `Oops, adding the activity failed - ${result.statusText} (${result.status})!`);
          dWrite(result.statusText);
        });
    })
    .fail(function (result) {
      hideLoader();
      writeFlash(1, `Oops, locating the user failed - ${result.statusText} (${result.status})!`);
      dWrite(result.statusText);
    });
}
/* END - API METHODS */
function handleUserActivitiesView() {

}
function handleNewActivityPreload() {
  if (isDebug) {
    $('#frmNewActivity input').each((index, item) => {
      $(item).removeAttr('required');
    })
  }
  $('#activity').focus();
}

function handleNewActivityView() {
  $('#activityDate').focus(function () {
    $('#activityDate').attr('type', 'date');
  });
  $('#frmNewActivity').submit(function () {
    event.preventDefault();
    if (!validateActivityDate()){
      return false;
    };
    let newActivity = {
      activity: $('#activity').val(),
      activityDate: $('#activityDate').val(),
      activityDuration: $('#activityDuration').val(),
    };

    addActivity(newActivity);
  })
}

/* END - Main Event Callback Functions */
function loadEventWatchers() {
  handleNewActivityPreload();
  handleNewActivityView();
}

$(loadEventWatchers());
