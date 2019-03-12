var express = require("express");
var bodyParser = require('body-parser');
var request = require('request');
var querystring = require('querystring');

var apiKey = 'MjM3OTI0OGMtZTVjOS00OTAwLTg4MDgtYjFjOWRkNmUxNWZi';
var apiSecret = 'ZjY1NjNhYTgtNmNlNi00Y2RkLTk4ZjYtMzNlZDUwNDU0OTM2';

var baseUrl = 'http://localhost:' + PORT;
var redirectUri = baseUrl + '/authorize';

var app = express()
var PORT = process.env.PORT || 9000

var db = require("./models")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/../'));
app.use(bodyParser.json());

app.use(express.static("public"));

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.get('/', function (request, response) {
  var path = 'https://api.rhapsody.com/oauth/authorize?' + querystring.stringify({
    response_type: 'code',
    client_id: apiKey,
    redirect_uri: redirectUri
  });

  response.redirect(path);
});

app.get('/authorize', function (clientRequest, clientResponse) {
  request.post({
    url: 'https://api.rhapsody.com/oauth/access_token',
    form: {
      client_id: apiKey,
      client_secret: apiSecret,
      response_type: 'code',
      code: clientRequest.query.code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    }
  }, function (error, response, body) {
    body = JSON.parse(body);
    clientResponse.redirect(baseUrl + '/client.html?' + querystring.stringify({
      accessToken: body.access_token,
      refreshToken: body.refresh_token
    }));
  });
});

app.get('/reauthorize', function (clientRequest, clientResponse) {
  var refreshToken = request.query.refreshToken;

  if (!refreshToken) {
    clientResponse.json(400, { error: 'A refresh token is required.' });
    return;
  }

  request.post({
    url: 'https://api.rhapsody.com/oauth/access_token',
    form: {
      client_id: apiKey,
      client_secret: apiSecret,
      response_type: 'code',
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }
  }, function (error, response, body) {
    console.log('Platform response:', {
      error: error,
      statusCode: response.statusCode,
      body: body
    });

    if (response.statusCode !== 200) {
      clientResponse.json(response.statusCode, { error: error || body });
      return;
    }

    clientResponse.json(200, JSON.parse(body));
  });
});

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});

// app.listen(port, function () {
//   console.log('Listening on', port);
// });
