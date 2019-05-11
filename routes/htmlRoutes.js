var db = require("../models");
var path = require("path");
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Load example page and pass in an example by id
  app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view.html"));
  });
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/add.html"));
  });
  // update application
  app.get("/job/id", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/add.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
