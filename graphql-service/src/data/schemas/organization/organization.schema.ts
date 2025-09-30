export const types = `#graphql
    type OrganizationWithUsers {
      id: String
      name: String
      register: String
      email: String
      createdAt: Date
      updatedAt: Date
      users: [OrganizationUserMember]
    }

    type OrganizationUserMember {
      id: String
      firstName: String
      lastName: String
      email: String
      role: String
      joinedAt: Date
    }

    type Organization {
      id: String
      name: String
      register: String
      email: String
      createdAt: Date
      updatedAt: Date
    }

    type OrganizationListResponse implements IResponse {
        success: Boolean
        message: String
        rows: [Organization]
        count: Int
    }
`;

export const queries = `#graphql
    get_organizations(id: String, name: String, email: String, page: Int, limit: Int, sortBy: String, sortOrder: String): OrganizationListResponse
`;

export const mutations = `#graphql
    organization_create(name: String!, register: String!, email: String!): Response
`;
