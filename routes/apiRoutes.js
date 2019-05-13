var db = require("../models");
var nodemailer = require('nodemailer');
var key=require("../keys");
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
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: key.gmail.user,
          pass: key.gmail.pass
        }
      });
      
      var mailOptions = {
        from: 'dimbaslv@gmail.com',
        to: 'petrenko.mitya@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.json(dbJobs);
    });
  });

  app.delete("/api/jobposts/:id", function(req, res) {
    db.Jobs.destroy({ where: { id: req.params.id } }).then(function(dbJobs) {
      res.json(dbJobs);
    });
  });

  app.put("/api/jobposts/:id", function(req, res) {
    db.Jobs.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbJobs) {
      res.json(dbJobs);
    });
  });
};
