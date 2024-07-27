import { Resolver, Query, Arg } from 'type-graphql';
import { RowDataPacket } from 'mysql2';
import Lead from '../../types/Lead';
import getLeads from '../../models/getLeads';
import LeadSqlType from '../../types/LeadSqlType';
import UUIDScalar from '../../scalars/UUIDScalar';

@Resolver()
export default class LeadQueries {
  @Query(() => [Lead])
  async leads(): Promise<Lead[]> {
    const leads = (await getLeads()) as RowDataPacket[];
    return leads.map((rec) => ({
      uuid: rec.uuid,
      name: rec.name,
      email: rec.email,
      mobile: rec.mobile,
      postcode: rec.postcode,
      services: rec.services.split(','),
    }));
  }

  @Query(() => Lead, { nullable: true })
  async lead(@Arg('uuid', () => UUIDScalar) uuid: string): Promise<Lead | undefined> {
    const [lead] = (await getLeads({ uuid } as LeadSqlType)) as RowDataPacket[];
    return {
      uuid: lead.uuid,
      name: lead.name,
      email: lead.email,
      mobile: lead.mobile,
      postcode: lead.postcode,
      services: lead.services.split(','),
    };
  }
}
