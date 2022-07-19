const schedule = require('node-schedule');
const User = require('../models/User');

module.exports = {
  async createNewSchedule(expirationSchedule) {
    expirationSchedule.forEach((date) => {
      job = schedule.scheduleJob(date.planExpirationDate, () => {
        (async () => {
          await User.update(
            {
              plan: null,
              plan_expiration_date: null,
            },
            { where: { id: date.id } }
          );
          const dt = new Date();
          const time = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
          console.log(` Funcao executada às ${time} - ${date.name}`);
        })();
      });
    });
    return;
  },
};
