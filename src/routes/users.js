const UserControl = require('../controllers/UserControl');

module.exports = (app) => {
  app.get('/users', UserControl.index);
  app.get('/users/:user_id', UserControl.findById);
  app.post('/users/create', UserControl.store);
  app.put('/users/:user_id/update', UserControl.update);
};
