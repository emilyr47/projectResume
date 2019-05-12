var db = require("../models");

module.exports = function(app) {
  // Get all jobs
  app.get("/api/jobposts", function(req, res) {
    db.Jobs.findAll({}).then(function(dbJobs) {
      res.json(dbJobs);
    });
  });

  // Find one job

  app.get("/api/jobposts/:id", function(req, res) {
    const jobId = req.params.id;
    db.Jobs.findOne({
      where: {
        id: jobId
      }
    }).then(function(dbJob) {
      res.json(dbJob);
    });
  });

  // Create a new job

  app.post("/api/jobposts", function(req, res) {
    const job = req.body;
    console.log(job);
    db.Jobs.create(job).then(function(dbJobs) {
      res.json(dbJobs);
    });
  });

  // Delete a job by id
  app.delete("/api/jobposts/:id", function(req, res) {
    db.Jobs.destroy({ where: { id: req.params.id } }).then(function(dbJobs) {
      res.json(dbJobs);
    });
  });
  app.put("/api/jobposts/:id", function(req, res) {
    console.log(req.body.id);
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    db.Jobs.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbJobs) {
      res.json(dbJobs);
    });
  });
};
