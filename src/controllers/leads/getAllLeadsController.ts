import { NextFunction, Request, Response } from 'express';
import { graphql } from 'graphql';
import { retrievedResponse } from '../../libraries/ApiResponses';
import createSchema from '../../createSchema';

const getAllLeadsController = async (req: Request, res: Response, next: NextFunction) => {
  const schema = await createSchema();
  try {
    const query = `
        query {
          leads {
            uuid
            name
            email
            mobile
            postcode
            services
          }
        }
      `;
    const result = await graphql({
      schema,
      source: query,
    });

    retrievedResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export default getAllLeadsController;
