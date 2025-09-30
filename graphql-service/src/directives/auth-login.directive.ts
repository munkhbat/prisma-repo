import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLSchema } from "graphql";
import i18n from "i18n";

/**
 * Auth Login Directive
 * Checks if user is authenticated (logged in)
 *
 * Usage in schema:
 * type Query {
 *   myProfile @authLogin
 * }
 */
export function authLoginDirective(directiveName: string) {
  const typeDirectiveArgumentMaps: Record<string, any> = {};

  return {
    authLoginDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        // handle directive on TYPE
        [MapperKind.TYPE]: (type) => {
          const authDirective = getDirective(schema, type, directiveName)?.[0];
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          return undefined;
        },

        // handle directive on FIELD
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ??
            typeDirectiveArgumentMaps[typeName];

          if (authDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig;

            // wrap original resolver with login check
            fieldConfig.resolve = function (root, args, context, info) {
              try {
                if (!context.user) {
                  throw new Error(i18n.__("error.do_not_register"));
                }

                return resolve(root, args, context, info);
              } catch (err: any) {
                return { success: false, message: err.message };
              }
            };

            return fieldConfig;
          }
        },
      }),
  };
}
