const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var serverOne = 'http://13.57.49.186:3000/',
serverTwo ='http://localhost:3002',
serverThree = 'http://localhost:3003'

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
app.all("/api/inc/:id", function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {target: serverThree});
});
app.all("/api/likedec/:id", function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {target: serverThree});
});
app.all("/api/repostinc/:id", function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {target: serverThree});
});
app.all("/api/repostdec/:id", function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {target: serverThree});
});


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

//https://github.com/hrla-fec-group1/comments.git