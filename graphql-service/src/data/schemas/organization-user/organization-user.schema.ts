export const types = `#graphql
    type OrganizationUser {
      id: String
      organizationId: String
      userId: String
      role: String
      user: User
      organization: Organization
      createdAt: Date
      updatedAt: Date
    }

    type OrganizationUserListResponse implements IResponse {
        success: Boolean
        message: String
        rows: [OrganizationUser]
        count: Int
    }
`;

export const queries = `#graphql
    get_organization_users(organizationId: String, userId: String, role: String, page: Int, limit: Int, sortBy: String, sortOrder: String): OrganizationUserListResponse
`;

export const mutations = `#graphql
    organization_user_create(organizationId: String!, userId: String!, role: String!): Response
    organization_user_remove(organizationId: String!, userId: String!): Response
`;
