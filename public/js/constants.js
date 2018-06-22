const isDebug = (location.hostname.toLowerCase().indexOf('localhost') === -1 && location.hostname.toLowerCase().indexOf('dev.volunteertrack') === -1) ? false : true;
const API_URL = (isDebug) ? 'http://localhost:8080' : 'https://stark-reef-77498.herokuapp.com';
const CONST_ACCESS_TOKEN_KEY = "access_token";
const CONST_ACCESS_TOKEN_KEY_EXPIRATION = "access_token_expiration";

