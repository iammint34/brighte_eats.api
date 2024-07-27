import { GraphQLScalarType, Kind } from 'graphql';

const UUIDScalar = new GraphQLScalarType({
  name: 'UUID',
  description: 'UUID custom scalar type',
  parseValue(value: any) {
    return value;
  },
  serialize(value: any) {
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  },
});

export default UUIDScalar;
