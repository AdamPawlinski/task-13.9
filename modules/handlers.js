var fs = require("fs");
var formidable = require("formidable");

exports.upload = function(request, response) {
    console.log("Beginning upload request service.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
      // fs.copyFile(files.upload.path, 'F:/Adam/programowanie/Kodilla/node.js-13.9', function(err) {
      //   if (err) throw err;
      //   console.log(files.upload.path + ' was copied to Kodilla/node.js-13.9');
      // });
      form.on('fileBegin', function(name, file) {
        file.path('F:/Adam/programowanie/Kodilla/node.js-13.9')
      });
      fs.renameSync(files.upload.path, "test.png");
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("received image:<br>");
      response.write("<img src='/show'>");
      response.end();
    });
}

exports.welcome = function(request, response) {
    console.log("Beginnig welcome request service.");
    fs.readFile("templates/start.html", function(err, html) {
      response.write(html);
      response.end();
    });
}

exports.show = function(request, response) {
  fs.readFile("test.png", "binary", function(error, file) {
    response.writeHead(200, {"Content-Type": "image/png"});
    response.write(file, "binary");
    response.end();
  });
}

exports.error = function(request, response) {
    console.log("I don't know what to do");
    response.write("404 :(");
    response.end();
}
