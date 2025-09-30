import { GraphQLError } from "graphql";

/**
 * Authentication Error
 * Used when user is not authenticated or token is invalid
 */
export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
}

/**
 * Forbidden Error
 * Used when user is authenticated but doesn't have permission
 */
export class ForbiddenError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "FORBIDDEN",
        http: { status: 403 },
      },
    });
  }
}

/**
 * Validation Error
 * Used when input validation fails
 */
export class ValidationError extends GraphQLError {
  constructor(message: string, fieldErrors?: Record<string, string>) {
    super(message, {
      extensions: {
        code: "BAD_USER_INPUT",
        http: { status: 400 },
        fieldErrors,
      },
    });
  }
}

/**
 * Not Found Error
 * Used when requested resource doesn't exist
 */
export class NotFoundError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "NOT_FOUND",
        http: { status: 404 },
      },
    });
  }
}