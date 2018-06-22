'use strict';


/* BEGIN - API METHODS */
function fillForm(activities, activityId) {
  let activity = activities.find( function(activity) {
    return activity._id === activityId;
  })
  let activityDate = new Date(activity.activityDate);
  var day = ((activityDate.getDate() < 10) ? '0' : '') + activityDate.getDate();
  var month = ((activityDate.getMonth() < 9) ? '0' : '') + (activityDate.getMonth()+1);
  var year = activityDate.getFullYear();

  $('#activity').val(activity.activity);
  $('#activityDate').val(year + '-' + month + '-' + day);
  $('#activityDuration').val(activity.activityDuration);
}
function loadActivity(activityId) {
  showLoader();
  $.when(getUser())
    .done(function (user) {
      const token = sessionStorage.getItem('token');
      
      return $.ajax({
        url: `${API_URL}/api/users/${user._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        dataType: 'json',
        type: 'GET'
      })
      .done(function (result) {
        fillForm(result.activities, activityId);
        dWrite('Loaded user');
      })
      .fail(function (result) {
        hideLoader();
        writeFlash(1, `Oops, looking up user failed - ${result.statusText} (${result.status})!`);
        dWrite(result.statusText);
      });
    })
    .fail(function (result) {
      hideLoader();
      writeFlash(1, `Oops, locating the user failed - ${result.statusText} (${result.status})!`);
      dWrite(result.statusText);
    });

}
function saveActivity(revisedActivity,activityId) {
  let request = revisedActivity;
  showLoader();
  $.when(getUser())
    .done(function (user) {
      const token = sessionStorage.getItem('token');
      request.id = user._id;
      request.eventId = activityId;
      return $.ajax({
        url: `${API_URL}/api/users/${user._id}/activities/${activityId}`,
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
        writeFlash(1, `Oops, saving the user's activity failed - ${result.statusText} (${result.status})!`);
        dWrite(result.statusText);
      });
    })
    .fail(function (result) {
      hideLoader();
      writeFlash(1, `Oops, locating the user failed - ${result.statusText} (${result.status})!`);
      dWrite(result.statusText);
    });

}
function removeActivity(activityId) {
  showLoader();
  $.when(getUser())
  .done(function (user) {
    const token = sessionStorage.getItem('token');

    return $.ajax({
      url: `${API_URL}/api/users/${user._id}/removeActivity/${activityId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      dataType: 'json',
      type: 'DELETE'
    })
    .done(function (result) {
      window.location.href = "/activities";
      dWrite('Deleted activity');
    })
    .fail(function (result) {
      hideLoader();
      writeFlash(1, `Oops, deleting the user's activity failed - ${result.statusText} (${result.status})!`);
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
function handleEditActivityPreload() {
  if (isDebug) {
    $('#frmEditActivity input').each((index, item) => {
      $(item).removeAttr('required');
    })
  }
}
function handleEditActivityView() {
  
  let urlVars = getUrlVars();
  let activityId = urlVars['id'];
  loadActivity(activityId);

  $('.lnkDelete').click( function() {
    event.preventDefault();
    removeActivity(activityId);
  })

  $('#frmEditActivity').submit(function () {
    event.preventDefault();
    
    let revisedActivity = (isDebug) ? debugActivity : {
      activity: $('#activity').val(),
      activityDate: $('#activityDate').val(),
      activityDuration: $('#activityDuration').val(),
    };
    saveActivity(revisedActivity,activityId);
  })
}

/* END - Main Event Callback Functions */
function loadEventWatchers() {
  handleEditActivityPreload();
  handleEditActivityView();
}

$(loadEventWatchers());
