// Get references to page elements
var $submitBtn = $("#add-btn");
var $jobText = $("#job-text");
var $jobDescription = $("#job-description");
var $jobList = $("#job-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveJob: function(job) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/jobposts",
      data: JSON.stringify(job)
    });
  },
  getJobs: function() {
    return $.ajax({
      url: "/api/jobposts",
      type: "GET"
    });
  },
  deleteJob: function(id) {
    return $.ajax({
      url: "/api/jobposts/" + id,
      type: "DELETE"
    });
  },
  updateJob: function(id) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/jobposts/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshJobs = function() {
  API.getJobs().then(function(data) {
    var $jobs = data.map(function(job) {
      var $a = $("<a>")
        .text(job.company)
        .attr("href", "/job/" + job.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": job.id
        })
        .append($a);

      var $deleteButton = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($deleteButton);

      $deleteButton.on("click", handleDeleteBtnClick);

      return $li;
    });

    $jobList.empty();
    $jobList.append($jobs);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var job = {
    company: $("#company-name")
      .val()
      .trim(),
    appliedDate: $("#date-applied")
      .val()
      .trim(),
    position: $("#role")
      .val()
      .trim(),
    contactInfo: $("#contact-info")
      .val()
      .trim(),
    resumeLink: $("#resume")
      .val()
      .trim(),
    interviewDate: $("#date")
      .val()
      .trim(),
    interviweeName: $("#interviewee-name")
      .val()
      .trim(),
    jobOffered: $("#status")
      .val()
      .trim(),
    comments: $("#comments")
      .val()
      .trim()
  };

  API.saveJob(job).then(function() {
    window.location.href = "view.html";
  });
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteJob(idToDelete).then(function() {
    refreshJobs();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
