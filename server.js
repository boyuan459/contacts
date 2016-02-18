var fs = require("fs");
var port = 8100;
var express = require("express");
var cors = require("cors");

var app = express();

app.use(cors());

app.use(express.static(__dirname)); //use static files in ROOT/public folder

app.listen(port);