// Just a basic server setup for this site
var Stack = require('stack'),
    Creationix = require('creationix'),
    Http = require('http');

var serverDir = __dirname + "/..";
var serverPort = 8080;

Http.createServer(Stack(
  Creationix.log(),
  require('wheat')(serverDir)
)).listen(serverPort);

console.log("Started wheat on "+serverPort+" serving "+serverDir);
