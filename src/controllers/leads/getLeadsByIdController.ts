import { NextFunction, Request, Response } from 'express';
import { graphql } from 'graphql';
import { retrievedResponse } from '../../libraries/ApiResponses';
import createSchema from '../../createSchema';
import GraphQLError from '../../libraries/exceptions/GraphQLError';

const getLeadsByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const { uuid } = req.params;

  const schema = await createSchema();
  try {
    const query = `
    query($uuid: UUID!) {
      lead(uuid: $uuid) {
        uuid
        name
        email
        mobile
        postcode
        services
      }
    }
  `;

    // Execute the query with variables
    const variables = { uuid: uuid as string };
    const result = await graphql({
      schema,
      source: query,
      variableValues: variables,
    });

    if (result?.errors) throw new GraphQLError(`Failed to retrieve lead by uuid.`, result.errors);

    retrievedResponse(res, result.data);
  } catch (error) {
    next(error);
  }
};

export default getLeadsByIdController;
