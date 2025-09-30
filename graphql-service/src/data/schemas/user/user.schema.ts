export const types = `#graphql
    type User {
      id: String
      firstName: String
      lastName: String
      email: String
      createdAt: Date
      updatedAt: Date
    }

    type RegisterResponse implements IResponse {
        success: Boolean
        message: String
        token: String
    }

    type LoginResponse implements IResponse {
        success: Boolean
        message: String
        token: String
    }

    type UserListResponse implements IResponse {
        success: Boolean
        message: String
        rows: [User]
        count: Int
    }
`;

export const queries = `#graphql
    get_users(id: String, firstName: String, lastName: String, email: String, page: Int, limit: Int, sortBy: String, sortOrder: String): UserListResponse
`;

export const mutations = `#graphql
    user_register(firstName: String!, lastName: String!, email: String!, password: String!): RegisterResponse
    user_login(email: String!, password: String!): LoginResponse
`;
