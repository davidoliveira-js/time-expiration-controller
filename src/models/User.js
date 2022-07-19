const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        plan: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        plan_expiration_date: {
          type: DataTypes.DATE(),
          allowNull: true,
        },
      },

      {
        sequelize,
        tableName: 'users',
        timestamps: false,
      }
    );
  }
}

module.exports = User;
