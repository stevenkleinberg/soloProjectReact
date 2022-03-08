'use strict';
//imports
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });

//==============================
//=====User Model Methods=======
//==============================

//----------TO-SAFE-OBJECT-Method-----------------
// This method will return an object with only the User instance information that is safe to save to a JWT.
  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

//----------VALIDATE-PASSWORD-Method---------------
// This method accept a password string and return true if there is a match with the User instance's
// hashedPassword. If there is no match, it should return false

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };


//----------GET-USER-BY-ID-Method------------------
//This method accepts an id and uses the currentUser scope to return a User with that id.
   User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };


//------------LOG-IN-Method-----------------------
//This method accepts an object with credential and password keys and searches for one User with the
//specified credential (either a username or an email). If found it validates password by passing the
//password to ValidatePassword(). when verified it returns the user in the'current  user' scope
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

//-----------SIGN-UP-Method----------------------
// accepts an object with a username, email, and password key. Hash the password using the
// bcryptjs package's hashSync method. Create a User with the username, email, and hashedPassword.
// Return the created user using the currentUser scope.
  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };


//==============================
//=====User Model Asociations===
//==============================
  User.associate = function(models) {
    User.hasMany(models.Chair, {
      foreignKey: 'userId'
    });
  };

  return User;
};
