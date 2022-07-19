'use strict';

Date.prototype.addMinutes = function (minutes) {
  const date = new Date(this.valueOf());
  date.setMinutes(date.getMinutes() + minutes);
  return date;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date();
    return queryInterface.bulkInsert('users', [
      {
        name: 'João',
        plan: 'Bronze',
        plan_expiration_date: date(1),
      },
      {
        name: 'Pedro',
        plan: 'Prata',
        plan_expiration_date: date.addMinutes(2),
      },
      {
        name: 'Maria',
        plan: null,
        plan_expiration_date: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
