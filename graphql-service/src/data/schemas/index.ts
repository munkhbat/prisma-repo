import { types as GlobalEnum } from "./enum";
import { interfaces as GlobalInterfaces } from "./interface";
import {
  mutations as OrganizationUserMutations,
  queries as OrganizationUserQueries,
  types as OrganizationUserTypes,
} from "./organization-user/organization-user.schema";
import {
  mutations as OrganizationMutations,
  queries as OrganizationQueries,
  types as OrganizationTypes,
} from "./organization/organization.schema";
import {
  mutations as UserMutations,
  queries as UserQueries,
  types as UserTypes,
} from "./user/user.schema";
export const types = `#graphql
    scalar Date
    scalar JSON

    ${GlobalEnum}
    ${GlobalInterfaces}

 type Response implements IResponse{
    success: Boolean!
    message: String!
 }
    ${UserTypes}
    ${OrganizationTypes}
    ${OrganizationUserTypes}
`;

export const queries = `#graphql
  type Query {
    ${UserQueries}
    ${OrganizationQueries}
    ${OrganizationUserQueries}
  }
`;

export const mutations = `#graphql
type Mutation {
    ${UserMutations}
    ${OrganizationMutations}
    ${OrganizationUserMutations}
  }
`;

const typeDefs = `#graphql

  ${types}
  ${queries}
  ${mutations}`;

export default typeDefs;
