import { Response } from 'express';

const apiResponse = <T>(response: Response, statusCode: number, data: T, message: string) =>
  response.status(statusCode).send({
    success: true,
    message,
    data,
  });

const retrievedResponse = <T>(response: Response, data: T, message = 'Record(s) retrieved successfully!') =>
  apiResponse(response, 200, data, message);

const createdResponse = <T>(response: Response, data: T, message = 'Record(s) created successfully!') =>
  apiResponse(response, 201, data, message);

const updatedResponse = <T>(response: Response, data: T, message = 'Record(s) updated successfully!') =>
  apiResponse(response, 200, data, message);

const deletedResponse = <T>(response: Response, data: T, message = 'Record(s) deleted successfully!') =>
  apiResponse(response, 200, data, message);

const rawResponse = <T>(response: Response, data: T, message = '') => apiResponse(response, 204, data, message);

export { retrievedResponse, createdResponse, updatedResponse, deletedResponse, rawResponse };
