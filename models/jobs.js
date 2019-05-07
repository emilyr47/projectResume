module.exports = function(sequelize, DataTypes) {
  var Jobs = sequelize.define("Jobs", {
    company: DataTypes.STRING,
    position: DataTypes.STRING,
    appliedDate: DataTypes.DATE,
    contactInfo: DataTypes.TEXT,
    resumeLink: DataTypes.STRING,
    interviewDate: DataTypes.DATE,
    interviweeName: DataTypes.STRING,
    jobOffered: DataTypes.BOOLEAN,
    comments: DataTypes.TEXT
  });
  return Jobs;
};