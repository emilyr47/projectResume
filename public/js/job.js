// Get references to page elements
var $submitBtn = $("#add-btn");

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
  updateJob: function(job) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/jobposts/" + job.id,
      type: "PUT",
      data: JSON.stringify(job)
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshJobs = function() {
  API.getJobs().then(function(jobs) {
    displayTable(jobs);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var job = {
    id: $("#job-id").val(),
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
  if (job.id) {
    API.updateJob(job).then(function() {
      window.location.href = "/view.html";
    });
  } else {
    API.saveJob(job).then(function() {
      window.location.href = "/view.html";
    });
  }
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function(idToDelete) {
  API.deleteJob(idToDelete).then(function() {
    location.reload();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);

function populateJob() {
  const url = window.location.pathname;
  const jobId = url.split("/")[2];

  if (jobId) {
    API.getJob(jobId).then(function(job) {
      $("#job-id").val(job.id);
      $("#company-name").val(job.company);
      $("#date-applied").val(moment(job.appliedDate).format("YYYY-MM-DD")),
        $("#role").val(job.position),
        $("#contact-info").val(job.contactInfo),
        $("#resume").val(job.resumeLink),
        $("#date").val(moment(job.interviewDate).format("YYYY-MM-DD")),
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

  jobs.forEach(function(job, i) {
    const jobTr = $("<tr>");
    table.append(jobTr);
    const counterTd = $("<th>");
    counterTd.attr("scope", "row").text(i + 1);
    const companyTd = $("<td>");
    companyTd.text(job.company);
    const postionTd = $("<td>");
    postionTd.text(job.position);
    const dateTd = $("<td>");
    const appliedDate = moment(job.appliedDate).format("MM/DD/YYYY");

    dateTd.text(appliedDate);
    const daysTd = $("<td>");

    console.log(appliedDate);
    const b = moment().diff(moment(appliedDate), "days");
    console.log(b);
    daysTd.text(b);

    const interviweTd = $("<td>");
    const interviewDate = moment(job.interviewDate).format("MM/DD/YYYY");
    interviweTd.text(job.interviewDate);
    const interviweeTd = $("<td>");
    interviweeTd.text(job.interviweeName);
    const commentTd = $("<td>");
    commentTd.text(job.comments);

    const editTd = $("<td>");
    const editBtn = $("<button>");
    editBtn.addClass("edit");
    const editLink = $("<a>");
    editLink.attr("href", "/job/" + job.id);
    editLink.attr("class", "editBtn").text("Edit");

    editBtn.append(editLink);
    editTd.append(editBtn);
    const deleteTd = $("<td>");
    const deleteBtn = $("<button>");
    deleteTd.append(deleteBtn);
    deleteBtn.addClass("delete").text("Delete");
    deleteBtn.click(function() {
      handleDeleteBtnClick(job.id);
    });

    jobTr.append(
      counterTd,
      companyTd,
      postionTd,
      dateTd,
      daysTd,
      interviweTd,
      interviweeTd,
      commentTd,
      editTd,
      deleteTd
    );
  });
}
