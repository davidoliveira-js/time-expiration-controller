const express = require('express');
const consign = require('consign');

const app = express();

consign()
  .include('/src/models/index.js')
  .then('/src/config/middlewares.js')
  .then('/src/routes')
  .then('/src/controllers')
  .then('/src/config/boot.js')
  .then('/src/schedule/UpdateSchedule.js')
  .into(app);
