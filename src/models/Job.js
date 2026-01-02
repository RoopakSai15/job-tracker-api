const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../config/database");

const Job = sequelize.define("Job", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: DataTypes.ENUM("applied", "interview", "offer", "rejected"),
    defaultValue: "applied"
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  }

  }, {

  defaultScope: {
    order: [["createdAt", "DESC"]]
  },
  scopes: {
    active: {
      where: {
        status: ["applied", "interview"]
      }
    },
    closed: {
      where: {
        status: ["offer", "rejected"]
      }
    }
  }
});

module.exports = Job;
