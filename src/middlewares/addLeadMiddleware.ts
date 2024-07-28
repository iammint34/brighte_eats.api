import { NextFunction, Request, Response } from 'express';
import ValidatorError from '../libraries/exceptions/ValidatorError';
import ServiceType from '../types/ServiceType';

const addLeadMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors: string[] = [];

    if (!req?.body?.name) errors.push('Name is required.');
    if (!req?.body?.email) errors.push('Email is required.');

    if (!req?.body?.mobile) errors.push('Mobile is required.');
    if (req?.body?.mobile && !req?.body?.mobile.match(/^[0-9]{10}$/)) errors.push('Mobile is invalid.');

    if (!req?.body?.postcode) errors.push('Postcode is required.');

    if (!req?.body?.services) errors.push('Services is required.');
    if (req?.body?.services && !req?.body?.services.every((service: string) => Object.keys(ServiceType).includes(service as ServiceType))) {
      errors.push('Services is invalid.');
    }

    if (errors.length > 0) throw new ValidatorError('Invalid request body', errors);
    next();
  } catch (error) {
    next(error);
  }
};

export default addLeadMiddleware;
