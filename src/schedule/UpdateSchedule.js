const schedule = require('node-schedule');
const { Op } = require('sequelize');
const User = require('../models/User');
const { createNewSchedule } = require('./CreateNewSchedule');
const { clearExpiredUserPlans } = require('./ClearExpiredUserPlans');

module.exports = async ({ app, userNewPlan = false }) => {
  await clearExpiredUserPlans();
  let expirationSchedule = [];
  const date = new Date();

  if (!userNewPlan) {
    const users = await User.findAll({
      where: {
        plan: { [Op.not]: null },
        plan_expiration_date: { [Op.gt]: date },
      },
    });
    users.forEach((user) => {
      const item = {
        id: user.id,
        name: user.name,
        planExpirationDate: user.plan_expiration_date,
      };
      expirationSchedule.push(item);
    });
  } else {
    expirationSchedule.push(userNewPlan);
  }

  if (expirationSchedule.length > 0) {
    await createNewSchedule(expirationSchedule);
  }
};
