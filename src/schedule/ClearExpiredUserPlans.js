const User = require('../models/User');
const { Op } = require('sequelize');

module.exports = {
  async clearExpiredUserPlans() {
    try {
      const date = new Date();
      const expiredUserPlans = await User.findAll({
        where: {
          plan: { [Op.not]: null },
          plan_expiration_date: { [Op.lte]: date },
        },
      });
      console.log('exp ', expiredUserPlans);
      if (expiredUserPlans.length > 0) {
        expiredUserPlans.forEach((userPlan) => {
          (async () => {
            await User.update(
              {
                plan: null,
                plan_expiration_date: null,
              },
              { where: { id: userPlan.id } }
            );
          })();
        });
      }
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  },
};
