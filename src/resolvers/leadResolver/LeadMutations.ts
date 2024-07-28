import { Resolver, Mutation, Arg } from 'type-graphql';
import { v4 as uuidv4 } from 'uuid';
import { ResultSetHeader } from 'mysql2';
import Lead from '../../types/Lead';
import insertLead from '../../models/insertLead';
import LeadSqlType from '../../types/LeadSqlType';
import DatabaseError from '../../libraries/exceptions/DatabaseError';
import ServiceType from '../../types/ServiceType';

@Resolver()
export default class LeadMutations {
  @Mutation(() => Lead)
  async register(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('mobile') mobile: string,
    @Arg('postcode') postcode: string,
    @Arg('services', () => [ServiceType]) services: ServiceType[]
  ): Promise<Lead> {
    try {
      const uuid = uuidv4();

      // Insert the lead into the database
      const result = (await insertLead({
        uuid,
        name,
        email,
        mobile,
        postcode,
        services: services.join(','),
      } as LeadSqlType)) as ResultSetHeader;

      if (!result.insertId) throw new Error('Failed to insert lead');

      return {
        uuid,
        name,
        email,
        mobile,
        postcode,
        services,
      };
    } catch (error) {
      throw new DatabaseError((error as { message: string }).message);
    }
  }
}
