'use strict';
function authorizeAndLoadEventWatchers() {
    handleLogout();
    checkUser();
}
function handleLogout() {
    $('.lnkLogout').click( (event) => {
        event.preventDefault();
        sessionStorage.removeItem('token');
        location.href = '/';
    })
}

function getUser() {
    const token = sessionStorage.getItem('token');
    dWrite('Getting user...');
    if (!token) {
        location.href = '/';
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
                return payloadData._id;
            },
            error: () => {
                dWrite('Unauthorized (N)');
                sessionStorage.removeItem('token');
                location.href = '/';
            }
        })
    }
}

function checkUser() {
    const token = sessionStorage.getItem('token');
    dWrite('Checking Authorization...');
    if (!token) {
        location.href = '/';
    } else {
        $.ajax({
            url: `${API_URL}/api/loginValidate`,
            type: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            success: (response) => {
                dWrite('Authorized (Y)');
            },
            error: () => {
                dWrite('Unauthorized (N)');
                sessionStorage.removeItem('token');
                location.href = '/';
            }
        })
    }
}

$(authorizeAndLoadEventWatchers());