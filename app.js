const http = require("http"),
  url = require("url"),
  fs = require("fs");

function route(req, res) {
  var pathname = url.parse(req.url).pathname;
  console.log("Request for " + pathname + " received.");
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf8'
  });
  if (pathname == '/' || pathname == 'index') {
    fs.readFile('./src/views/index.html', function(err, data) {
      if (err) {
        console.log(err.stack);
        return;
      }
      res.write(data.toString());
      res.end();
    });

  } else if (pathname.indexOf('/public/')){
    // static files
    fs.readFile('./' + pathname, function(err, data) {
      if (err) {
        console.log(err.stack);
        return;
      }
      res.write(data.toString());
      res.end();
    });
  } else {
    res.write('404: Not Found!');
    res.end();
  }
}

http.createServer(route).listen(3000, () => {
  console.log('Sever has been started.');
});