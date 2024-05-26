// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];

var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), function(err, data) {
            if (err) {
                res.writeHead(404, 'Not Found');
                res.end('404 Not Found');
            }
            res.writeHead(200, 'OK');
            res.end(data);
        });
    } else if (pathname === '/comment') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile(path.join(__dirname, pathname), function(err, data) {
            if (err) {
                res.writeHead(404, 'Not Found');
                res.end('404 Not Found');
            }
            res.writeHead(200, 'OK');
            res.end(data);
        });
    }
});

server.listen(9090, function() {
    console.log('server is listening on port 9090');
});