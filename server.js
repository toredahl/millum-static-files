connect = require('connect');
var port = 5000;
connect.createServer(
    connect.static(__dirname)
).listen(process.env.PORT || port);

