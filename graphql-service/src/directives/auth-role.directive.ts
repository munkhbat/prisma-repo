import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLSchema } from "graphql";
import i18n from "i18n";

/**
 * Auth Role Directive
 * Checks if user has required role(s) to access field/type
 *
 * Usage in schema:
 * type Mutation {
 *   deleteUser @auth(roles: ["admin"])
 * }
 */
export function authRoleDirective(
  directiveName: string,
  getUserFn: (userRole: string) => {
    hasRole: (role: string[]) => boolean;
  }
) {
  const typeDirectiveArgumentMaps: Record<string, any> = {};

  return {
    authRoleDirectiveTransformer: (schema: GraphQLSchema) =>
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
            const { roles } = authDirective;

            if (roles) {
              const { resolve = defaultFieldResolver } = fieldConfig;

              // wrap original resolver with auth check
              fieldConfig.resolve = function (root, args, context, info) {
                try {
                  const userRole = context.user ? context.user.role : "GUEST";
                  const user = getUserFn(userRole);

                  if (!user.hasRole(roles)) {
                    throw new Error(i18n.__("error.permission_denied"));
                  }

                  return resolve(root, args, context, info);
                } catch (err: any) {
                  return { success: false, message: err.message };
                }
              };

              return fieldConfig;
            }
          }
        },
      }),
  };
}

/**
 * Helper function to check if user has role
 */
export function getUser(userRole: string) {
  return {
    hasRole: (roles: string[]) => {
      return roles.includes(userRole);
    },
  };
}
