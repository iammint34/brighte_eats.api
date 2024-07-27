import { registerEnumType } from 'type-graphql';

enum ServiceType {
  DELIVERY = 'delivery',
  PICKUP = 'pick-up',
  PAYMENT = 'payment',
}

// Register the enum with type-graphql
registerEnumType(ServiceType, {
  name: 'ServiceType',
  description: 'The types of services available',
});

export default ServiceType;
