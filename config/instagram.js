let inRedirectUri = 'http://dm-mymedia.herokuapp.com/auth';
let inAuthUrl = 'https://api.instagram.com/oauth/authorize/?client_id='
+ process.env.CLIENT_ID + '&redirect_uri='
+ inRedirectUri + '&response_type=code';

module.exports = {
    config: {
        redirectUri: inRedirectUri,
        authUrl: inAuthUrl
    }
};