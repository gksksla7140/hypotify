// #################
//template from spotify/web-api-auth-examples and o_auth-bridege-template
//#################

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const querystring = require('querystring');
const routes = require('./routes');



// use .env variables
let port = process.env.PORT || 5000;

let app = express();

app.set('port', port);
app.use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use('/', routes);


if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("../frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "frontend", "build", "index.html"));
  });
}


console.log(` >>>>>>>>>>Listening on port :  ${port} <<<<<<<<<<<<<<<<<`);
app.listen(port)