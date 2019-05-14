module.exports = function(sequelize, DataTypes) {
  var Jobs = sequelize.define("Jobs", {
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 140] }
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 140] }
    },
    appliedDate: {
      type: DataTypes.DATE,
      isDate: true
    },
    contactInfo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    resumeLink: {
      type: DataTypes.STRING
    },
    interviewDate: {
      type: DataTypes.DATE,
      isDate: true,
      allowNull: true
    },
    interviweeName: {
      type: DataTypes.STRING
    },
    jobOffered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    comments: {
      type: DataTypes.TEXT
    }
  });
  return Jobs;
};
