// Create web server with Express
import express from "express";
var app = express();
import { json, urlencoded } from "body-parser";
import { readFile } from "fs";
import { join } from "path";
var commentsPath = join(__dirname, "comments.json");

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/comments", function(req, res) {
  readFile(commentsPath, "utf8", function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post("/comments", function(req, res) {
  readFile(commentsPath, "utf8", function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    var commentsString = JSON.stringify(comments, null, 2);
    writeFile(commentsPath, commentsString, function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.status(201).json(req.body);
    });
  });
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000");
});

// Path: comments.json
// []
// Run the server and send a POST request with a comment:
// curl -X POST -H "Content-Type: application/json" -d '{"name": "John Doe", "comment": "Hello, world!"}' http://localhost:3000/comments
// Create a new file named comments.json with the following content:
// [
//   {
//     "name": "John Doe",
//     "comment": "Hello, world!"
//   }
// ]
// Run the server again and send a GET request to retrieve the comments:
// curl http://localhost:3000/comments
// [{"name":"John Doe","comment":"Hello, world!"}]
// Create a new file named comments.json with the following content:
// []
// Run the server again and send a GET request to retrieve the comments:
// curl http://localhost:3000/comments
// []
// Add a new comment to the server by sending a POST request:
// curl -X POST -H "Content-Type: application/json" -d '{"name": "Jane Doe", "comment": "Goodbye, world!"}' http://localhost:3000/comments
// Run the server again and send a GET request to retrieve the comments:
// curl http://localhost:3000/comments
// [{"name":"Jane Doe","comment":"Goodbye, world!"}]
// Add another comment to the server by sending a POST request:
// curl -X POST -H "Content-Type: application/json" -d '{"name": "Alice Doe", "comment": "Good morning, world!"}' http://localhost:3000/comments
// Run the server again and send a GET request to retrieve the comments:
// curl http://localhost:3000