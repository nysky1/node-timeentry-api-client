'use strict';
function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

function checkUser() {
    const token = sessionStorage.getItem('token');
    console.log('checking');
    if(!token) {
        location.href = '/';
    } else {
        $.ajax({
            url: `${API_URL}/api/loginValidate`,
            type: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            success: (response) => {
                dWrite('Authorized');
            },
            error: () => {
                dWrite('Unauthorized');
                sessionStorage.removeItem('token');
                location.href = '/';
            }
        })
    }
}

$(() => {
    checkUser();
})