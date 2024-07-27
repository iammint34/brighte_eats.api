import { Application } from 'express';
import leads from './leads';

module.exports = (app: Application) => {
  app.use('/leads', leads);
};
