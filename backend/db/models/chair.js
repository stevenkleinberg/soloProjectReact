'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chair = sequelize.define('Chair', {
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: "Users"}
    },
    address: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    city: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    state: {
      allowNull: false,
      type: Sequelize.STRING(50)
    },
    country: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING(250)
    },
    description: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    price: {
      allowNull: false,
      type: Sequelize.INTEGER
    }
  }, {});
  Chair.associate = function(models) {
    Chair.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Chair;
};
