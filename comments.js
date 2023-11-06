// Create Web Server 
// Node.js
// 2018-01-02
// Public Domain

// Define variables
var http = require('http');
var url = require('url');
var fs = require('fs');
var ROOT_DIR = "html"; // Directory for static files

// Create server
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);

  // If the path is /comment, read the comments file and send the response
  if (urlObj.pathname === "/comment") {
    console.log("comment route");
    // Read the comments file
    if (req.method === "POST") {
      console.log("POST comment route");
      // Read the comments file
      var jsonData = "";
      req.on('data', function (chunk) {
        jsonData += chunk;
      });
      req.on('end', function () {
        var reqObj = JSON.parse(jsonData);
        console.log(reqObj);
        console.log("Name: " + reqObj.Name);
        console.log("Comment: " + reqObj.Comment);
        // Now put it into the database
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect("mongodb://localhost/weather", function (err, db) {
          if (err) throw err;
          db.collection('comments').insert(reqObj, function (err, records) {
            console.log("Record added as " + records[0]._id);
          });
        });
      });
    }

    // Send the response
    res.writeHead(200);
    res.end();
  } else {
    // Otherwise serve static files
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }
}).listen(80);

// Print message to console
console.log('Server running at http://')
