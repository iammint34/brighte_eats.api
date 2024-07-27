import express from 'express';
import addLeadController from '../controllers/leads/addLeadController';
import getAllLeadsController from '../controllers/leads/getAllLeadsController';
import getLeadsByIdController from '../controllers/leads/getLeadsByIdController';

const leads = express.Router();

leads.post('/', addLeadController);
leads.get('/', getAllLeadsController);
leads.get('/:uuid', getLeadsByIdController);

export default leads;
