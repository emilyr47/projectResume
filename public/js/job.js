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

  getJob: function(id) {
    return $.ajax({
      url: "/api/jobposts/" + id,
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
      type: "PUT"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshJobs = function() {
  API.getJobs().then(function(jobs) {
    displayTable(jobs);
  });

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

function populateJob() {

  const url = window.location.pathname;
  const jobId = url.split("/")[2];

  if (jobId){

    API.getJob(jobId).then(function(job) {
      console.log("getJobx");
      console.log(moment(job.interviewDate).format("MM/DD/YYYY"));
      $("#company-name").val(job.company);
      $("#date-applied").val(job.appliedDate),
        $("#role").val(job.position),
        $("#contact-info").val(job.contactInfo),
        $("#resume").val(job.resumeLink),
        $("#date").val(moment(job.interviewDate).format("MM/DD/YYYY")),
        $("#interviewee-name").val(job.interviweeName),
        $("#status").val(job.jobOffered),
        $("#comments").val(job.comments);
        $("#id").val(jobId);
        $("#add-btn").text("Update Application");
        console.log("getJoby");
    });
  }
}

function displayTable(jobs) {
  const table = $("#display-info");
  const headerTr = $("<tr>");
  table.append(headerTr);

  const columns = [
    "company",
    "Position",
    "Date Applied",
    "Days Applied",
    "Edit",
    "Delete"
  ];
  columns.forEach(column => {
    const th = $("<th>");
    th.text(column);
    headerTr.append(th);
  });

  jobs.forEach(function(job) {
    const jobTr = $("<tr>");
    table.append(jobTr);

    const companyTd = $("<td>");
    companyTd.text(job.company);
    const postionTd = $("<td>");
    postionTd.text(job.position);
    const dateTd = $("<td>");
    dateTd.text(job.appliedDate);
    const daysTd = $("<td>");
    const appliedDate = moment(job.appliedDate).format("MM/DD/YYYY");

    console.log(appliedDate);
    const b = moment(appliedDate).diff(moment(), "days");
    console.log(b);

    daysTd.text(b);
    const editTd = $("<td>");
    const editBtn = $("<button>");

    editTd.append(editBtn)
    editBtn.addClass("edit-btn").text("~");
    const deleteTd = $("<td>");
    const deleteBtn = $("<button>");
    deleteTd.append(deleteBtn)
    deleteBtn.addClass("delete-btn").text("x");

    jobTr.append(companyTd, postionTd, dateTd, daysTd, editTd, deleteTd);
  });
}
