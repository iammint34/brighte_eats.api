import 'reflect-metadata';
import LeadQueries from '../../../src/resolvers/leadResolver/LeadQueries';
import getLeads from '../../../src/models/getLeads';
import Lead from '../../../src/types/Lead';

jest.mock('../../../src/models/getLeads');

describe('LeadQueries', () => {
  let leadQueries: LeadQueries;

  beforeAll(() => {
    leadQueries = new LeadQueries();
  });

  it('should return a list of leads', async () => {
    const mockLeads = [
      {
        uuid: '123',
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        postcode: '12345',
        services: 'service1,service2',
      },
    ];

    (getLeads as jest.Mock).mockResolvedValue(mockLeads);

    const result = await leadQueries.leads();
    expect(result).toEqual([
      {
        uuid: '123',
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        postcode: '12345',
        services: ['service1', 'service2'],
      },
    ]);
  });

  it('should return a single lead by uuid', async () => {
    const mockLead = {
      uuid: '123',
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '1234567890',
      postcode: '12345',
      services: 'service1,service2',
    };

    (getLeads as jest.Mock).mockResolvedValue([mockLead]);

    const result = await leadQueries.lead('123');
    expect(result).toEqual({
      uuid: '123',
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '1234567890',
      postcode: '12345',
      services: ['service1', 'service2'],
    });
  });
});
