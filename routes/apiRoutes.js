var db = require("../models");
var nodemailer = require('nodemailer');
var key = require("../keys");
var axios = require("axios");
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
    if (job.interviewDate.length<1){
      job.interviewDate = null;
    }

    db.Jobs.create(job).then(function(dbJobs) {
      function sendEmail(){
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "projectResume314159@gmail.com",
            pass: "123$qweR"
          }
        });
        
        var mailOptions = {
          from: 'projectResume314159@gmail.com',
          to: 'projectResume314159@gmail.com',
          subject: 'Resume Tracker',
          text: "Please follow up on your job application from company: "+ job.company + " applied on: " + job.appliedDate
        };
     transporter.sendMail(mailOptions, function(error, info){ 
        if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
       
      };
       setTimeout (sendEmail, 259200000);
       clearTimeout(sendEmail);
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

  app.get("/api/randomsearch/", function(req, res) {

    var url = "https://jobs.github.com/positions.json?description=javascript&location=united+states";
    
    axios.get(url).then(function(response) {

        console.log("-------Your Response my good sir: ", response.data[0]);

        res.send(response.data);

    }).catch(function(err){console.log(err)});
    //End Axios GET

  });//End Exptess GET
};
