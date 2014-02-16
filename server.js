varr gzippo = require('gzippo');
var express = require('express');
var app = express();
var port = 5000;
process.env.PWD = process.cwd();

app.configure(function() {
    app.use(express.static(process.env.PWD + '/'));
});
app.get('*', function(req, res) {
     res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
app.use(express.logger('dev'));
app.use(gzippo.staticGzip("" + process.env.PWD + "/dist"));
app.listen(process.env.PORT || port);
