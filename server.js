var connect = require('connect');
var port = 7000;
connect.createServer(
    connect.static(__dirname)
).listen(process.env.PORT || port);
