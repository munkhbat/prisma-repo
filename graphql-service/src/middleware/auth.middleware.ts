import { Request } from "express";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import i18n from "i18n";
import TokenController from "../controllers/token.controller";
import UserController from "../controllers/user.controller";
import { IContextUser } from "../utils/interfaces/common";

export class AuthMiddleware {
  /**
   * Main authentication method
   * Extracts token, verifies it, and validates user
   */
  static async authenticateUser(req: Request): Promise<IContextUser | null> {
    try {
      const token = this.extractToken(req);
      if (!token) return null;

      const decoded = await this.verifyToken(token);
      const user = await this.validateUserToken(decoded.userId, token);

      return user;
    } catch (error) {
      // If error is already a GraphQLError, rethrow it
      if (error instanceof GraphQLError) {
        throw error;
      }
      // Otherwise return null (no user authenticated)
      return null;
    }
  }

  /**
   * Extract token from Authorization header
   */
  private static extractToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    return authHeader.trim();
  }

  /**
   * Verify JWT token
   */
  private static async verifyToken(token: string): Promise<{ userId: string }> {
    try {
      const JWT_SALT = process.env.JWT_SALT;
      if (!JWT_SALT) {
        throw new Error("JWT_SALT not configured");
      }

      const decoded = jwt.verify(token, JWT_SALT) as any;
      return { userId: decoded.userId };
    } catch (error: any) {
      throw new GraphQLError(i18n.__("error.invalid_token"), {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }
  }

  /**
   * Validate user token against database
   */
  private static async validateUserToken(
    userId: string,
    token: string
  ): Promise<IContextUser> {
    const tokenRecord = await TokenController.userTokenCheck(userId);

    if (!tokenRecord) {
      throw new GraphQLError(i18n.__("error.token.not_found"), {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }

    if (tokenRecord.token !== token) {
      throw new GraphQLError(i18n.__("error.another_login"), {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }

    const user = await UserController.userIdCheck(userId);

    if (!user) {
      throw new GraphQLError(i18n.__("error.user.not_found"), {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }

    return user;
  }
}