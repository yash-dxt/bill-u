var express = require('express');
require('express-async-errors');
var bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());


module.exports = app;