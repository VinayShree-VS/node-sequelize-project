module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "user", // Model name
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "First name is required" },
          notEmpty: { msg: "First name is required" },
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Last name is required" },
          notEmpty: { msg: "Last name is required" },
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email is required" },
          notEmpty: { msg: "Email is required" },
          isEmail: { msg: "Email must be valid" },
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Password is required" },
        }
      },
      confPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Confirm password is required" },
          notEmpty: { msg: "Confirm password is required" },
          // isEqualToPassword(value) {
          //   if (value !== this.password) {
          //     throw new Error('Password and confirm password must match');
          //   }
          // }
        }
      },
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Job Title is required" },
          notEmpty: { msg: "Job Title is required" },
        }
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Gender is required" },
          notEmpty: { msg: "Gender is required" },
        }
      },
      // Use JSON to store an array of roles
      roles: {
        type: DataTypes.JSON, // Store roles as an array of strings in JSON format
        defaultValue: ["Admin"]
      },
      _tokens: {
        type: DataTypes.JSON, // Use JSON for tokens as well
        defaultValue: []
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      }
    },
    {
      // Options
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );

  return User;
};
