import { GraphQLScalarType, Kind } from "graphql";

function jSONidentity(value: any) {
  return value;
}

function jSONparseLiteral(ast: any) {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT: {
      const value = Object.create(null);
      ast.fields.foreach((field: any) => {
        value[field.name.value] = jSONparseLiteral(field.value);
      });

      return value;
    }
    case Kind.LIST:
      return ast.values.map(jSONparseLiteral);
    default:
      return null;
  }
}

export default {
  JSON: new GraphQLScalarType({
    name: "JSON",
    description:
      "The `jSON` scalar type represents jSON values as specified by " +
      "[ECMA-404](http://www.ecma-international.org/" +
      "publications/files/ECMA-ST/ECMA-404.pdf).",
    serialize: jSONidentity,
    parseValue: jSONidentity,
    parseLiteral: jSONparseLiteral,
  }),
};
