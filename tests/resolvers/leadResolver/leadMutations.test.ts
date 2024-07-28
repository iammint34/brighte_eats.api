import 'reflect-metadata';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { v4 as uuidv4 } from 'uuid';
import { ResultSetHeader } from 'mysql2';
import insertLead from '../../../src/models/insertLead';
import DatabaseError from '../../../src/libraries/exceptions/DatabaseError';
import ServiceType from '../../../src/types/ServiceType';
import LeadMutations from '../../../src/resolvers/leadResolver/LeadMutations';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

jest.mock('../../../src/models/insertLead');

describe('LeadMutations', () => {
  let leadMutations: LeadMutations;

  beforeEach(() => {
    leadMutations = new LeadMutations();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a lead successfully', async () => {
    const mockUuid = 'f8bfa774-99e5-414e-8f64-b911f5ebe70b';
    (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

    const mockResult: ResultSetHeader = { insertId: 1 } as ResultSetHeader;
    (insertLead as jest.Mock).mockResolvedValue(mockResult);

    const lead = await leadMutations.register('John Doe', 'john.doe@example.com', '1234567890', '12345', [
      ServiceType.DELIVERY,
      ServiceType.PAYMENT,
    ]);

    expect(lead).toEqual({
      uuid: mockUuid,
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '1234567890',
      postcode: '12345',
      services: [ServiceType.DELIVERY, ServiceType.PAYMENT],
    });
  });

  it('should throw a DatabaseError if insertLead fails', async () => {
    const mockUuid = 'f8bfa774-99e5-414e-8f64-b911f5ebe70b';
    (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

    const mockError = new Error('Failed to insert lead');
    (insertLead as jest.Mock).mockRejectedValue(mockError);

    await expect(
      leadMutations.register('John Doe', 'john.doe@example.com', '1234567890', '12345', [
        ServiceType.DELIVERY,
        ServiceType.PAYMENT,
      ])
    ).rejects.toThrow(DatabaseError);
  });
});
