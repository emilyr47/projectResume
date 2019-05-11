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
<<<<<<< HEAD
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
=======
>>>>>>> c97e10aba952757bca64de1483cf4826ff088fc1
      res.json(dbJobs);
    });
  });

  // Delete a job by id
  app.delete("/api/jobposts/:id", function(req, res) {
    db.Jobs.destroy({ where: { id: req.params.id } }).then(function(dbJobs) {
      res.json(dbJobs);
    });
<<<<<<< HEAD
  })
=======
  });
>>>>>>> c97e10aba952757bca64de1483cf4826ff088fc1
  app.put("/api/jobposts", function(req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    db.Jobs.update(
      {
        company: DataTypes.STRING,
        position: DataTypes.STRING,
        appliedDate: DataTypes.DATE,
        contactInfo: DataTypes.TEXT,
        resumeLink: DataTypes.STRING,
        interviewDate: DataTypes.DATE,
        interviweeName: DataTypes.STRING,
        jobOffered: DataTypes.BOOLEAN,
        comments: DataTypes.TEXT
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbJobs) {
      res.json(dbJobs);
    });
  });

  app.put("/api/jobposts", function(req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    db.Jobs.update(
      {
        company: req.body.company,
        position: req.body.position,
        appliedDate: req.body.appliedDate,
        contactInfo: req.body.contactInfo,
        resumeLink: req.body.resumeLink,
        interviewDate: req.body.interviewDate,
        InterviweeName: req.body.InterviweeName,
        JobOffered: req.body.JobOffered,
        comments: req.body.comments
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbJobs) {
      res.json(dbJobs);
    });
  });
};
