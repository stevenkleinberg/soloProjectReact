'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chair = sequelize.define('Chair', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: "Users"}
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(250)
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Chair.associate = function(models) {
    Chair.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Chair;
};
