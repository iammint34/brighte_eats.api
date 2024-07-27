import { ObjectType, Field } from 'type-graphql';
import ServiceType from './ServiceType';
import UUIDScalar from '../scalars/UUIDScalar';

@ObjectType()
export default class Lead {
  @Field(() => UUIDScalar)
  uuid!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  mobile!: string;

  @Field()
  postcode!: string;

  @Field(() => [ServiceType])
  services!: ServiceType[];
}
