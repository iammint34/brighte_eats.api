import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import LeadQueries from './resolvers/leadResolver/LeadQueries';
import LeadMutations from './resolvers/leadResolver/LeadMutations';

const createSchema = async () =>
  buildSchema({
    resolvers: [LeadQueries, LeadMutations]
  });

export default createSchema;
