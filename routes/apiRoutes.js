var db = require("../models");

module.exports = function(app) {
  // Get all jobs
  app.get("/api/jobposts", function(req, res) {
    db.Jobs.findAll({}).then(function(dbJobs) {
      res.json(dbJobs);
    });
  });

  // Create a new job
  app.post("/api/newJob", function(req, res) {
    db.Job.create({
      company: DataTypes.STRING,
      position: DataTypes.STRING,
      appliedDate: DataTypes.DATE,
      contactInfo: DataTypes.TEXT,
      resumeLink: DataTypes.STRING,
      interviewDate: DataTypes.DATE,
      InterviweeName: DataTypes.STRING,
      JobOffered: DataTypes.BOOLEAN,
      comments: DataTypes.TEXT
    }).then(function(dbJobs) {
      res.json(dbJobs);
    });
  });

  // Delete a job by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Jobs.destroy({ where: { id: req.params.id } }).then(function(dbJobs) {
      res.json(dbJobs);
    });
  });
};

app.put("/api/posts", function (req, res) {
  // Add code here to update a post using the values in req.body, where the id is equal to
  // req.body.id and return the result to the user using res.json
  db.Jobs.update({
    company: DataTypes.STRING,
    position: DataTypes.STRING,
    appliedDate: DataTypes.DATE,
    contactInfo: DataTypes.TEXT,
    resumeLink: DataTypes.STRING,
    interviewDate: DataTypes.DATE,
    InterviweeName: DataTypes.STRING,
    JobOffered: DataTypes.BOOLEAN,
    comments: DataTypes.TEXT
  }, {
      where: {
        id: req.body.id
      }
    }
  ).then(function (dbJobs) {
    res.json(dbJobs);
  })
});
