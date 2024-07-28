import { NextFunction, Request, Response } from 'express';
import { graphql } from 'graphql';
import { retrievedResponse } from '../../libraries/ApiResponses';
import createSchema from '../../createSchema';
import GraphQLError from '../../libraries/exceptions/GraphQLError';

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

    if (result?.errors) throw new GraphQLError(`Failed to retrieve leads.`, result.errors);
    
    retrievedResponse(res, result.data);
  } catch (error) {
    next(error);
  }
};

export default getAllLeadsController;
