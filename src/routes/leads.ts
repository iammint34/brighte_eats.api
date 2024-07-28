import express from 'express';
import addLeadController from '../controllers/leads/addLeadController';
import getAllLeadsController from '../controllers/leads/getAllLeadsController';
import getLeadsByIdController from '../controllers/leads/getLeadsByIdController';
import addLeadMiddleware from '../middlewares/addLeadMiddleware';

const leads = express.Router();

leads.post('/', addLeadMiddleware, addLeadController);
leads.get('/', getAllLeadsController);
leads.get('/:uuid', getLeadsByIdController);

export default leads;
