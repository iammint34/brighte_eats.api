import { NextFunction, Request, Response } from 'express';
import { graphql } from 'graphql';
import { createdResponse } from '../../libraries/ApiResponses';
import createSchema from '../../createSchema';

const addLeadController = async (req: Request, res: Response, next: NextFunction) => {
  const schema = await createSchema();
  try {
    const { name, email, mobile, postcode, services } = req.body;
    const query = `
      mutation Register($name: String!, $email: String!, $mobile: String!, $postcode: String!, $services: [ServiceType!]!) {
        register(name: $name, email: $email, mobile: $mobile, postcode: $postcode, services: $services) {
          uuid
          name
          email
          mobile
          postcode
          services
        }
      }
    `;
    const variables = { name, email, mobile, postcode, services };
    const result = await graphql({
      schema,
      source: query,
      variableValues: variables,
    });

    createdResponse(res, result);   
  } catch (error) {
    next(error);
  }
};

export default addLeadController;