const express = require('express');
const bodyParser = require('body-parser');

const Songs = require('../database/Songs.js')

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/songs', function(req, res) {
  console.log('req.query is ', req.query);
  Songs.find({songId: req.query.id})
    .then((results) => {
      // console.log(results[0]);
      res.status(200).send(results[0]);
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
