'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
        notEmpty: true,
      },
      plan: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      plan_expiration_date: {
        type: Sequelize.DATE(),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
