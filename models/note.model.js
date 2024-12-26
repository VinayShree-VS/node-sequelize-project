module.exports = (sequelize, Sequelize, DataTypes) => {
    const Note = sequelize.define(
      "note", // Model name
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: { msg: "Title is required" },
            notEmpty: { msg: "Title is required" },
          }
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: { msg: "Description is required" },
            notEmpty: { msg: "Description is required" },
          }
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users", // Reference the User table
            key: "id"
          },
          validate: {
            notNull: { msg: "UserId is required" },
            isInt: { msg: "UserId must be a valid integer" }
          }
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE
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
  
    return Note;
  };
  