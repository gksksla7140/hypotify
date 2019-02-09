// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Used example on https://github.com/thelinmichael/spotify-web-api-node
// and 
// https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const Spotify = require('spotify-web-api-node');
const express = require('express');
const dotenv = require("dotenv");
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
dotenv.config();
const router = new express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:5000/callback';
const SESSION_KEY = 'session_key';

const scopes = ['user-read-private', 'user-read-email'];


const generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const spotifyServer = new Spotify({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI
});

router.get('/login', (req, res) => {
    //generate key
  const key = generateRandomString(16);
  // insert it into a cookie
  res.cookie(SESSION_KEY, key);
  // redir to spotify to login to spotify with our session key 
  res.redirect(spotifyServer.createAuthorizeURL(scopes, key));
});

// function after user logs in 
router.get('/callback', (req, res) => {
    // session key will be in the query in req
  const { code, state } = req.query;
  const storedkey = req.cookies ? req.cookies[SESSION_KEY] : null;
  if (state === null || state !== storedkey) {
    res.status(301).redirect("http://localhost:3000/notfound");
  } else {
    res.clearCookie(SESSION_KEY);
    // this example below is shown at git repo: spotify-web-api-node
    spotifyServer.authorizationCodeGrant(code).then(data => {
      const { expires_in, access_token, refresh_token } = data.body;
      // set access token
      spotifyServer.setAccessToken(access_token);
      // set refresh token
      spotifyServer.setRefreshToken(refresh_token);

      // checking if access_token is valid
      spotifyServer.getMe().then(({ body }) => {
        console.log(body);
      });
      

      // we can also pass the token to the browser to make requests from there
      res.status(301).redirect(`http://localhost:3000/user/${access_token}/${refresh_token}`);
    }).catch(err => {
      res.status(301).redirect("http://localhost:3000/notfound");
    });
  }
});

module.exports = router;