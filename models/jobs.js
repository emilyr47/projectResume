module.exports = function(sequelize, DataTypes) {
  var Jobs = sequelize.define("Job", {
    company: DataTypes.STRING,
    position: DataTypes.STRING,
    appliedDate: DataTypes.DATE,
    contactInfo: DataTypes.TEXT,
    resumeLink: DataTypes.STRING,
    interviewDate: DataTypes.DATE,
    InterviweeName: DataTypes.STRING,
    JobOffered: DataTypes.BOOLEAN,
    comments: DataTypes.TEXT
  });
  return Jobs;
};