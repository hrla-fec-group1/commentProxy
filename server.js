const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var serverOne = 'http://13.57.49.186:3000/',
serverTwo ='http://54.183.184.86/',
serverThree = 'http://52.13.8.105/'

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

var data;

app.all("/api/songs", function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {target: serverTwo});
});
app.all("/data", function(req, res) {
    apiProxy.web(req, res, {target: serverOne});
});
app.all('/artists', function(req, res) {
  apiProxy.web(req, res, {target: serverThree});
  });


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

//https://github.com/hrla-fec-group1/comments.git
