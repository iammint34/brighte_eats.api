import { NextFunction, Request, Response } from 'express';
import addLeadMiddleware from '../../src/middlewares/addLeadMiddleware';
import ValidatorError from '../../src/libraries/exceptions/ValidatorError';
import ServiceType from '../../src/types/ServiceType';

describe('addLeadMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {};
    next = jest.fn();
  });

  it('should call next with no errors if all required fields are valid', async () => {
    req.body = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '1234567890',
      postcode: '12345',
      services: [Object.keys(ServiceType)[0]]
    };

    await addLeadMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('should return an error if the name is missing', async () => {
    req.body = {
      email: 'john.doe@example.com',
      mobile: '1234567890',
      postcode: '12345',
      services: [Object.keys(ServiceType)[0]]
    };

    await addLeadMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(ValidatorError));
  });

  it('should return an error if the email is missing', async () => {
    req.body = {
      name: 'John Doe',
      mobile: '1234567890',
      postcode: '12345',
      services: [Object.keys(ServiceType)[0]]
    };

    await addLeadMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(ValidatorError));
  });

  it('should return an error if the mobile is missing', async () => {
    req.body = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      postcode: '12345',
      services: [Object.keys(ServiceType)[0]]
    };

    await addLeadMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(ValidatorError));
  });

  it('should return an error if the mobile is invalid', async () => {
    req.body = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '12345',
      postcode: '12345',
      services: [Object.keys(ServiceType)[0]]
    };

    await addLeadMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(ValidatorError));
  });

  it('should return an error if the postcode is missing', async () => {
    req.body = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '1234567890',
      services: [Object.keys(ServiceType)[0]]
    };

    await addLeadMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(ValidatorError));
  });

  it('should return an error if the services are missing', async () => {
    req.body = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '1234567890',
      postcode: '12345'
    };

    await addLeadMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(ValidatorError));
  });

  it('should return an error if the services are invalid', async () => {
    req.body = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '1234567890',
      postcode: '12345',
      services: ['invalidService']
    };

    await addLeadMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(ValidatorError));
  });
});