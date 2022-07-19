const User = require('../models/User');
const UpdateSchedule = require('../schedule/UpdateSchedule');
const { Op } = require('sequelize');

Date.prototype.addMinutes = function (minutes) {
  const date = new Date(this.valueOf());
  date.setMinutes(date.getMinutes() + minutes);
  return date;
};

module.exports = {
  async store(req, res) {
    const { name } = req.body;
    try {
      const user = await User.create({ name });
      return res.json({
        success: true,
        return: {
          message: 'usuario criado',
          user: user,
        },
      });
    } catch (error) {
      return res.json({
        success: false,
        return: 'ocorreu um erro',
      });
    }
  },

  async index(req, res) {
    try {
      const date = new Date();
      console.log(date);
      const users = await User.findAll({
        where: {
          plan: { [Op.not]: null },
        },
      });
      return res.json({
        success: true,
        return: {
          message: 'usuarios encontrados',
          users: users,
        },
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: true,
        return: {
          message: 'ocorreu um erro',
        },
      });
    }
  },

  async findById(req, res) {
    try {
      const { user_id } = req.params;
      const users = await User.findByPk(user_id, {
        attributes: ['name'],
        include: [
          { association: 'addresses', attributes: ['street'] },
        ],
      });
      return res.json({
        success: true,
        return: {
          message: 'usuario encontrados',
          users: users,
        },
      });
    } catch (error) {
      return res.json({
        success: true,
        return: {
          message: 'ocorreu um erro',
        },
      });
    }
  },
  async update(req, res) {
    try {
      const { user_id } = req.params;
      const { name, plan, plan_expiration_date } = req.body;

      let date = new Date();
      date = date.addMinutes(plan_expiration_date);

      const user = await User.update(
        {
          name: name,
          plan: plan,
          plan_expiration_date: date,
        },
        {
          where: {
            id: user_id,
          },
        }
      );

      await UpdateSchedule({
        userNewPlan: {
          id: user_id,
          name: name,
          planExpirationDate: date,
        },
      });

      return res.json({
        success: true,
        return: {
          message: 'usuario editado',
        },
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        return: 'ocorreu um erro',
      });
    }
  },
};
